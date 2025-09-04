/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "./utils";

// ========= Utility & Helper Functions =========
interface TopStoresQueryParams {
  source: string;
  months?: number;
  zm?: string;
  rsm?: string;
  asm?: string;
  tsi?: string;
  category?: string;
  branch?: string;
  baseChannel?: string;
  brand?: string;
  startDate?: string;
  endDate?: string;
  page: number;
  pageSize: number;
  countOnly?: boolean;
}

export function resolveTables(
  source: string
): Array<"psr_data_finalized" | "psr_finalized_temp"> {
  if (source === "main") return ["psr_data_finalized"];
  if (source === "temp") return ["psr_finalized_temp"];
  return ["psr_data_finalized", "psr_finalized_temp"];
}

export function monthNumberToName(month: number): string {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthNames[month - 1] || "Unknown";
}

export function getFiscalYear(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return month >= 7 ? year + 1 : year;
}

export function addInClause(
  query: string,
  params: any[],
  values: any[],
  field: string
): string {
  if (values?.length) {
    query += ` AND ${field} IN (${values.map(() => "?").join(",")})`;
    params.push(...values);
  }
  return query;
}

export async function mergeCustomerCodes(
  existing: string[],
  column: string,
  values: string[]
): Promise<string[]> {
  const codes = await getStoreCodesByFilter(column, values);
  return mergeFilterResults(existing, codes);
}

export async function mergeCustomerTypes(
  existing: string[],
  column: string,
  values: string[]
): Promise<string[]> {
  const types = await getCustomerTypesByChannelFilter(column, values);
  return mergeFilterResults(existing, types);
}

export async function getStoreCodesByFilter(
  column: string,
  values: string[]
): Promise<string[]> {
  const stores = await prisma.store_mapping.findMany({
    where: { [column]: { in: values } },
    select: { Old_Store_Code: true },
  });
  return stores.map((store) => store.Old_Store_Code);
}

export async function getCustomerTypesByChannelFilter(
  column: string,
  values: string[]
): Promise<string[]> {
  const mappings = await prisma.channel_mapping.findMany({
    where: { [column]: { in: values } },
    select: { customer_type: true },
  });
  return mappings.map((map) => map.customer_type);
}

export function mergeFilterResults(
  existing: string[],
  incoming: string[]
): string[] {
  if (existing.length === 0) return incoming;
  return existing.filter((item) => incoming.includes(item));
}

export async function buildWhereClauseForRawSQL(
  filters: any,
  parentFilter?: { field: string; value: string }
) {
  let whereClause = "";
  const params: any[] = [];

  const addInClause = (values: any[], field: string) => {
    if (values?.length) {
      whereClause += ` AND ${field} IN (${values.map(() => "?").join(",")})`;
      params.push(...values);
    }
  };

  // Store filters (direct fields in finalized tables)
  addInClause(filters.ZM, "p.ZM");
  addInClause(filters.Branch, "p.branch");
  addInClause(filters.RSM, "p.RSM");
  addInClause(filters.ASM, "p.ASM");
  addInClause(filters.TSI, "p.TSI");

  // Accept FiscalYear or Year from the UI; prefer FiscalYear if present
  const fyList =
    (filters?.FiscalYear && filters.FiscalYear.length
      ? filters.FiscalYear
      : null) ?? (filters?.Year && filters.Year.length ? filters.Year : null);

  if (fyList?.length) {
    whereClause += ` AND (
      CASE
        WHEN MONTH(p.document_date) >= 7 THEN YEAR(p.document_date) + 1
        ELSE YEAR(p.document_date)
      END
    ) IN (${fyList.map(() => "?").join(",")})`;
    params.push(...fyList);
  }

  // Fiscal Month filter (1 = July, 12 = June)
  if (filters.FiscalMonth?.length) {
    whereClause += ` AND (
      CASE
        WHEN MONTH(p.document_date) >= 7 THEN MONTH(p.document_date) - 6
        ELSE MONTH(p.document_date) + 6
      END
    ) IN (${filters.FiscalMonth.map(() => "?").join(",")})`;
    const fiscalMonthMap = filters.FiscalMonth.map((m: number) =>
      m >= 7 ? m - 6 : m + 6
    );
    params.push(...fiscalMonthMap);
  }

  // Product filters
  addInClause(filters.Category, "p.category");
  addInClause(filters.Brand, "p.brand");
  addInClause(filters.Brandform, "p.brandform");
  addInClause(filters.Subbrandform, "p.subbrandform");

  // Channel filters
  addInClause(filters.ChannelDesc, "p.channel_desc");
  addInClause(filters.BaseChannel, "p.base_channel");
  addInClause(filters.ShortChannel, "p.short_channel");

  // Date range
  if (filters.StartDate && filters.EndDate) {
    whereClause += ` AND p.document_date BETWEEN ? AND ?`;
    params.push(filters.StartDate, filters.EndDate);
  }

  // Parent (drill-down) filter
  if (parentFilter?.field && parentFilter?.value != null) {
    whereClause += ` AND ${parentFilter.field} = ?`;
    params.push(parentFilter.value);
  }

  return { whereClause, params };
}

export function buildWhereClauseForGP(filters: any = {}) {
  let whereClause = "";
  const params: any[] = [];

  const addIn = (values: any[] | undefined, field: string) => {
    if (values && Array.isArray(values) && values.length) {
      whereClause += ` AND ${field} IN (${values.map(() => "?").join(",")})`;
      params.push(...values);
    }
  };

  // ---- Store mapping filters (come from store_mapping) ----
  addIn(filters.ZM, "sm.ZM");
  addIn(filters.RSM, "sm.RSM");
  addIn(filters.ASM, "sm.ASM");
  addIn(filters.TSI, "sm.TSI");
  addIn(filters.Branch, "sm.Branch");

  // ---- Channel mapping filters (come from channel_mapping) ----
  addIn(filters.ChannelDesc, "cm.channel_desc");
  addIn(filters.BaseChannel, "cm.base_channel");
  addIn(filters.ShortChannel, "cm.short_channel");

  // ---- Fiscal Year (prefer filters.FiscalYear; else filters.Year) ----
  const fyList =
    (filters?.FiscalYear && filters.FiscalYear.length
      ? filters.FiscalYear
      : null) ?? (filters?.Year && filters.Year.length ? filters.Year : null);

  if (fyList?.length) {
    whereClause += ` AND (
      CASE
        WHEN MONTH(p.document_date) >= 7 THEN YEAR(p.document_date) + 1
        ELSE YEAR(p.document_date)
      END
    ) IN (${fyList.map(() => "?").join(",")})`;
    params.push(...fyList);
  }

  // ---- Fiscal Month (1=Jul, ..., 12=Jun). Accept filters.FiscalMonth or filters.Month
  const fiscalMonths =
    (filters?.FiscalMonth && filters.FiscalMonth.length
      ? filters.FiscalMonth
      : null) ??
    (filters?.Month && filters.Month.length ? filters.Month : null);

  if (fiscalMonths?.length) {
    // Compare against fiscal month derived from calendar month
    whereClause += ` AND (
      CASE
        WHEN MONTH(p.document_date) >= 7 THEN MONTH(p.document_date) - 6
        ELSE MONTH(p.document_date) + 6
      END
    ) IN (${fiscalMonths.map(() => "?").join(",")})`;
    params.push(...fiscalMonths);
  }

  // ---- Date range (ISO yyyy-mm-dd)
  if (filters?.StartDate && filters?.EndDate) {
    whereClause += ` AND p.document_date BETWEEN ? AND ?`;
    params.push(filters.StartDate, filters.EndDate);
  }

  // NOTE: Category/Brand/Brandform/Subbrandform intentionally ignored for GP

  return { whereClause, params };
}

// Drill-down Logic
export async function getRetailingBreakdown(
  level: string,
  parent: string | undefined,
  filters: any,
  source: string
) {
  const levelMap: Record<string, string> = {
    category: "p.category",
    brand: "p.brand",
    brandform: "p.brandform",
    subbrandform: "p.subbrandform",
    base_channel: "p.base_channel",
    short_channel: "p.short_channel",
    channel_desc: "p.channel_desc",
  };

  const groupField = levelMap[level?.toLowerCase()];
  if (!groupField) {
    throw new Error(`Invalid level: ${level}`);
  }

  // Correct parent drill-down filter
  let parentFilter: { field: string; value: string } | undefined;
  if (parent) {
    const parentFieldMap: Record<string, string> = {
      brand: "p.category", // drilling into brand → need category filter
      brandform: "p.brand", // drilling into brandform → need brand filter
      subbrandform: "p.brandform", // drilling into subbrandform → need brandform filter
      short_channel: "p.base_channel", // drilling into short_channel → need base_channel filter
      channel_desc: "p.short_channel", // drilling into channel_desc → need short_channel filter
    };

    const parentField = parentFieldMap[level?.toLowerCase()];
    if (parentField) {
      parentFilter = { field: parentField, value: parent };
    }
  }

  const tables = resolveTables(source);
  const breakdownMap: Record<string, { [year: number]: number }> = {};

  const filtersWithFiscalMonth = { ...filters, FiscalMonth: filters.Month };

  for (const table of tables) {
    let query = `
      SELECT ${groupField} AS group_key, p.document_date, SUM(p.retailing) AS total
      FROM ${table} p
      WHERE 1=1
    `;

    const { whereClause, params } = await buildWhereClauseForRawSQL(
      filtersWithFiscalMonth,
      parentFilter
    );

    query += whereClause;
    query += ` GROUP BY ${groupField}, p.document_date`;

    const results: any[] = await prisma.$queryRawUnsafe(query, ...params);

    for (const row of results) {
      const key = row.group_key || "Unknown";
      const fy = getFiscalYear(new Date(row.document_date));
      const value = Number(row.total);

      if (!breakdownMap[key]) breakdownMap[key] = {};
      breakdownMap[key][fy] = (breakdownMap[key][fy] || 0) + value;
    }
  }

  return Object.entries(breakdownMap)
    .map(([key, yearlyData]) => {
      const breakdown = Object.entries(yearlyData)
        .map(([year, retailing]) => ({
          year: Number(year),
          value: retailing,
        }))
        .sort((a, b) => b.year - a.year);

      let growth: number | null = null;
      if (breakdown.length >= 2) {
        const latest = breakdown[0];
        const prev = breakdown[1];
        growth =
          prev.value === 0
            ? null
            : Math.round((latest.value / prev.value) * 100);
      }

      return {
        key,
        name: key,
        breakdown,
        growth,
        childrenCount: null,
      };
    })
    .sort(
      (a, b) => (b.breakdown[0]?.value || 0) - (a.breakdown[0]?.value || 0)
    );
}

export async function getStoreRetailingBreakdown(
  level: string,
  parent: string | undefined,
  storeCode: string,
  source: string,
  year?: number[],
  month?: number[]
) {
  // Define the allowed keys from product_mapping
  type ProductKeys = "category" | "brand" | "brandform" | "subbrandform";

  const levelMap: Record<string, ProductKeys> = {
    category: "category",
    brand: "brand",
    brandform: "brandform",
    subbrandform: "subbrandform",
  };

  const groupField = levelMap[level?.toLowerCase()];
  if (!groupField) {
    throw new Error(`Invalid level: ${level}`);
  }

  // Step 1: Preload product_mapping (small table vs psr_data)
  const products = await prisma.product_mapping.findMany({
    select: {
      p_code: true,
      category: true,
      brand: true,
      brandform: true,
      subbrandform: true,
    },
  });

  // Step 2: Build product map
  const productMap = new Map<
    number,
    { category: string; brand: string; brandform: string; subbrandform: string }
  >();
  for (const p of products) {
    productMap.set(p.p_code, {
      category: p.category ?? "Unknown",
      brand: p.brand ?? "Unknown",
      brandform: p.brandform ?? "Unknown",
      subbrandform: p.subbrandform ?? "Unknown",
    });
  }

  // Step 3: Date range from fiscal year
  let dateCondition: any = {};
  if (year && year.length > 0) {
    const minFY = Math.min(...year);
    const maxFY = Math.max(...year);
    const minDate = new Date(minFY - 1, 6, 1); // Jul prev year
    const maxDate = new Date(maxFY, 5, 30); // Jun maxFY
    dateCondition = { gte: minDate, lte: maxDate };
  }

  let tables: string[] = [];

  if (source === "main") {
    tables = ["psr_data_historical"];
  } else if (source === "temp") {
    tables = ["psr_data_temp"];
  } else {
    tables = ["psr_data_historical", "psr_data_temp"];
  }

  let rawResults: { p_code: number; document_date: Date; retailing: number }[] =
    [];

  // Step 4: Query psr_data only (skip product_mapping join)
  for (const table of tables) {
    const delegate = prisma[
      table as "psr_data_historical" | "psr_data_temp"
    ] as any;

    const data = await delegate.findMany({
      where: {
        customer_code: storeCode,
        ...(year?.length ? { document_date: dateCondition } : {}),
      },
      select: {
        p_code: true,
        document_date: true,
        retailing: true,
      },
    });

    rawResults.push(
      ...data.map((row: any) => ({
        p_code: row.p_code,
        document_date: row.document_date,
        retailing: Number(row.retailing),
      }))
    );
  }

  // Step 5: Apply fiscal month filter in-memory
  if (month && month.length > 0) {
    rawResults = rawResults.filter((row) => {
      const calMonth = row.document_date.getMonth(); // 0=Jan
      const fiscalMonth = calMonth >= 6 ? calMonth - 6 + 1 : calMonth + 6 + 1;
      return month.includes(fiscalMonth);
    });
  }

  // Step 6: Aggregate by group (category/brand/brandform/subbrandform)
  const breakdownMap = new Map<string, Map<number, number>>(); // key -> (FY -> total)

  for (const row of rawResults) {
    const product = productMap.get(row.p_code);
    if (!product) continue;

    // Parent filter (applied in-memory)
    if (parent) {
      const parentFieldMap: Record<string, ProductKeys> = {
        brand: "category",
        brandform: "brand",
        subbrandform: "brandform",
      };
      const field = parentFieldMap[level.toLowerCase()];
      if (field && product[field] !== parent) continue;
    }

    const key = product[groupField] ?? "Unknown";

    const fy =
      row.document_date.getMonth() >= 6
        ? row.document_date.getFullYear() + 1
        : row.document_date.getFullYear();

    if (!breakdownMap.has(key)) breakdownMap.set(key, new Map());
    const yearMap = breakdownMap.get(key)!;
    yearMap.set(fy, (yearMap.get(fy) ?? 0) + row.retailing);
  }

  // Step 7: Transform to final structure
  const result = Array.from(breakdownMap.entries()).map(([key, yearMap]) => {
    const breakdown = Array.from(yearMap.entries())
      .map(([fy, value]) => ({ year: fy, value }))
      .sort((a, b) => b.year - a.year);

    let growth: number | null = null;
    if (breakdown.length >= 2) {
      const latest = breakdown[0];
      const prev = breakdown[1];
      growth =
        prev.value === 0 ? null : Math.round((latest.value / prev.value) * 100);
    }

    return {
      key,
      name: key,
      breakdown,
      growth,
      childrenCount: null,
    };
  });

  // Step 8: Sort by latest value
  return result.sort(
    (a, b) => (b.breakdown[0]?.value || 0) - (a.breakdown[0]?.value || 0)
  );
}

// DASHBOARD page
export async function getTotalRetailing(filters: any, source: string) {
  const yearTotals: Record<number, number> = {};
  const hasFilters =
    filters &&
    (filters.Category ||
      filters.Brand ||
      filters.Branch ||
      filters.BaseChannel ||
      filters.ZM ||
      filters.RSM ||
      filters.ASM ||
      filters.TSI ||
      filters.StartDate ||
      filters.EndDate ||
      filters.Year ||
      filters.FiscalYear ||
      filters.Month);

  if (!hasFilters) {
    // ✅ Case 1: No filters → use pre-aggregated summary table
    const results: any[] = await prisma.$queryRawUnsafe(`
      SELECT year, month, total_retailing
      FROM retailing_summary
    `);

    for (const row of results) {
      const dt = new Date(row.year, row.month - 1, 1); // month is 1-based
      const fy = getFiscalYear(dt);
      const subtotal = Number(row.total_retailing || 0);

      yearTotals[fy] = (yearTotals[fy] || 0) + subtotal;
    }
  } else {
    // ✅ Case 2: Filters applied → use raw query on source tables
    const tables = resolveTables(source);
    const filtersWithFiscalMonth = { ...filters, FiscalMonth: filters.Month };

    for (const table of tables) {
      let query = `
        SELECT p.document_date, SUM(p.retailing) AS total
        FROM ${table} p
        WHERE 1=1
      `;

      const { whereClause, params } = await buildWhereClauseForRawSQL(
        filtersWithFiscalMonth
      );
      query += whereClause + ` GROUP BY p.document_date`;

      const results: any[] = await prisma.$queryRawUnsafe(query, ...params);

      for (const row of results) {
        const dt = row.document_date ? new Date(row.document_date) : null;
        if (!dt) continue;

        const fy = getFiscalYear(dt);
        const subtotal = Number(row.total || 0);

        yearTotals[fy] = (yearTotals[fy] || 0) + subtotal;
      }
    }
  }

  // ✅ Determine fiscal years to return
  const explicitFYs =
    (filters?.FiscalYear?.length ? filters.FiscalYear : null) ??
    (filters?.Year?.length ? filters.Year : null) ??
    null;

  const isExplicit = Boolean(
    explicitFYs || (filters?.StartDate && filters?.EndDate)
  );

  const yearsFromRange = (startISO: string, endISO: string) => {
    const startFY = getFiscalYear(new Date(startISO));
    const endFY = getFiscalYear(new Date(endISO));
    const out: number[] = [];
    for (let y = startFY; y <= endFY; y++) out.push(y);
    return out;
  };

  let yearsToReturn: number[] = [];

  if (isExplicit) {
    if (filters?.StartDate && filters?.EndDate) {
      yearsToReturn = yearsFromRange(filters.StartDate, filters.EndDate);
    } else if (explicitFYs) {
      yearsToReturn = explicitFYs.slice();
    }
  } else {
    const presentYears = Object.keys(yearTotals)
      .map((y) => Number(y))
      .sort((a, b) => b - a);
    if (presentYears.length >= 2) {
      yearsToReturn = presentYears.slice(0, 2);
    } else {
      yearsToReturn = presentYears;
    }
  }

  // ✅ Format breakdown
  const formatFY = (endYear: number) =>
    `${endYear - 1}-${String(endYear).slice(-2)}`;

  const breakdown = yearsToReturn
    .map((y) => ({
      year: y,
      label: formatFY(y),
      value: yearTotals[y] || 0,
    }))
    .filter((item) => (isExplicit ? true : item.value > 0))
    .sort((a, b) => b.year - a.year);

  // ✅ Growth calculation
  let growth: number | null = null;
  if (breakdown.length >= 2) {
    const [curr, prev] = breakdown;
    growth = prev.value > 0 ? (curr.value / prev.value) * 100 : null;
  }

  return { breakdown, growth };
}

export async function getTotalGP(
  filters: any,
  source: string,
  gpType?: string
) {
  const yearTotals: Record<number, number> = {};
  const gpColumn = gpType === "p1m" ? "p1m_gp" : "p3m_gp";

  // Decide which tables to read
  const tables =
    source === "main"
      ? ["gp_data"]
      : source === "temp"
      ? ["gp_data_temp"]
      : ["gp_data", "gp_data_temp"]; // combined

  for (const table of tables) {
    // Core query with joins to expose store/channel fields for WHERE
    let query = `
      SELECT
        p.document_date,
        SUM(p.${gpColumn}) AS total
      FROM ${table} p
      LEFT JOIN store_mapping sm
        ON p.retailer_code = sm.Old_Store_Code
      LEFT JOIN channel_mapping cm
        ON sm.customer_type = cm.customer_type
      WHERE 1=1
    `;

    const { whereClause, params } = buildWhereClauseForGP(filters || {});
    query += whereClause + ` GROUP BY p.document_date`;

    const results: any[] = await prisma.$queryRawUnsafe(query, ...params);

    for (const row of results) {
      const dt = row.document_date ? new Date(row.document_date) : null;
      if (!dt) continue;
      const fy = getFiscalYear(dt); // July–June FY end year
      const subtotal = Number(row.total || 0);
      yearTotals[fy] = (yearTotals[fy] || 0) + subtotal;
    }
  }

  // Figure out which FYs to return (same logic as before)
  const explicitFYs =
    (filters?.FiscalYear?.length ? filters.FiscalYear : null) ??
    (filters?.Year?.length ? filters.Year : null) ??
    null;

  const isExplicit = Boolean(
    explicitFYs || (filters?.StartDate && filters?.EndDate)
  );

  const yearsFromRange = (startISO: string, endISO: string) => {
    const startFY = getFiscalYear(new Date(startISO));
    const endFY = getFiscalYear(new Date(endISO));
    const out: number[] = [];
    for (let y = startFY; y <= endFY; y++) out.push(y);
    return out;
  };

  let yearsToReturn: number[] = [];
  if (isExplicit) {
    if (filters?.StartDate && filters?.EndDate) {
      yearsToReturn = yearsFromRange(filters.StartDate, filters.EndDate);
    } else if (explicitFYs) {
      yearsToReturn = explicitFYs.slice();
    }
  } else {
    const presentYears = Object.keys(yearTotals)
      .map(Number)
      .sort((a, b) => b - a);
    yearsToReturn =
      presentYears.length >= 2 ? presentYears.slice(0, 2) : presentYears;
  }

  const formatFY = (endYear: number) =>
    `${endYear - 1}-${String(endYear).slice(-2)}`;

  const breakdown = yearsToReturn
    .map((y) => ({ year: y, label: formatFY(y), value: yearTotals[y] || 0 }))
    .filter((item) => (isExplicit ? true : item.value > 0))
    .sort((a, b) => b.year - a.year);

  let growth: number | null = null;
  if (breakdown.length >= 2) {
    const [curr, prev] = breakdown;
    growth = prev.value > 0 ? (curr.value / prev.value) * 100 : null;
  }

  return { breakdown, growth };
}

export async function getHighestRetailingBranch(filters: any, source: string) {
  const branchYearMap: Record<string, Record<number, number>> = {};

  const hasFilters =
    filters &&
    (filters.Category ||
      filters.Brand ||
      filters.Branch ||
      filters.BaseChannel ||
      filters.ZM ||
      filters.RSM ||
      filters.ASM ||
      filters.TSI ||
      filters.StartDate ||
      filters.EndDate ||
      filters.Year ||
      filters.FiscalYear ||
      filters.Month);

  if (!hasFilters) {
    // ✅ Case 1: No filters → use summary table
    const results: any[] = await prisma.$queryRawUnsafe(`
      SELECT branch, fiscal_year, total_retailing
      FROM branch_retailing_summary
      ORDER BY branch, fiscal_year
    `);

    for (const row of results) {
      const branch = row.branch || "Unknown";
      const fy = row.fiscal_year;
      const retailing = Number(row.total_retailing);

      if (!branchYearMap[branch]) branchYearMap[branch] = {};
      branchYearMap[branch][fy] = (branchYearMap[branch][fy] || 0) + retailing;
    }
  } else {
    // ✅ Case 2: Filters applied → fallback to full query
    const tables = resolveTables(source);
    const filtersWithFiscalMonth = { ...filters, FiscalMonth: filters.Month };

    for (const table of tables) {
      let query = `
        SELECT 
          p.Branch AS branch,
          p.document_date,
          SUM(p.retailing) AS total
        FROM ${table} p
        WHERE 1=1
      `;

      const { whereClause, params } = await buildWhereClauseForRawSQL(
        filtersWithFiscalMonth
      );
      query += whereClause + ` GROUP BY p.Branch, p.document_date`;

      const results: any[] = await prisma.$queryRawUnsafe(query, ...params);

      for (const row of results) {
        const branch = row.branch || "Unknown";
        const fy = getFiscalYear(new Date(row.document_date)); // fiscal end-year
        const retailing = Number(row.total);

        if (!branchYearMap[branch]) branchYearMap[branch] = {};
        branchYearMap[branch][fy] =
          (branchYearMap[branch][fy] || 0) + retailing;
      }
    }
  }

  // ✅ Find branch with maximum retailing (sum across years)
  let maxBranch = "";
  let maxTotal = 0;

  for (const [branch, yearly] of Object.entries(branchYearMap)) {
    const total = Object.values(yearly).reduce((a, b) => a + b, 0);
    if (total > maxTotal) {
      maxTotal = total;
      maxBranch = branch;
    }
  }

  // ✅ Build breakdown for the winning branch
  const breakdownRaw = branchYearMap[maxBranch] || {};
  const breakdown = Object.entries(breakdownRaw)
    .map(([year, value]) => ({
      year: parseInt(year), // fiscal end-year
      label: `${parseInt(year) - 1}-${String(year).slice(-2)}`, // e.g. "2024-25"
      value,
    }))
    .sort((a, b) => b.year - a.year);

  // ✅ Growth calculation
  let growth: number | null = null;
  if (breakdown.length >= 2) {
    const [curr, prev] = breakdown;
    growth = prev.value > 0 ? (curr.value / prev.value) * 100 : null;
  }

  return {
    branch: maxBranch,
    breakdown,
    growth,
  };
}

export async function getHighestRetailingBrand(filters: any, source: string) {
  const brandYearTotals: Record<string, Record<number, number>> = {};

  const hasFilters =
    filters &&
    (filters.Category ||
      filters.Brand ||
      filters.Branch ||
      filters.BaseChannel ||
      filters.ZM ||
      filters.RSM ||
      filters.ASM ||
      filters.TSI ||
      filters.StartDate ||
      filters.EndDate ||
      filters.Year ||
      filters.FiscalYear ||
      filters.Month);

  if (!hasFilters) {
    // ✅ Case 1: No filters → use summary table
    const results: any[] = await prisma.$queryRawUnsafe(`
      SELECT brand, fiscal_year, total_retailing
      FROM brand_retailing_summary
      ORDER BY brand, fiscal_year
    `);

    for (const row of results) {
      const brand = row.brand || "Unknown";
      const fy = row.fiscal_year;
      const retailing = Number(row.total_retailing);

      if (!brandYearTotals[brand]) brandYearTotals[brand] = {};
      brandYearTotals[brand][fy] =
        (brandYearTotals[brand][fy] || 0) + retailing;
    }
  } else {
    // ✅ Case 2: Filters applied → fallback to full query
    const tables = resolveTables(source);
    const filtersWithFiscalMonth = { ...filters, FiscalMonth: filters.Month };

    for (const table of tables) {
      let query = `
        SELECT p.Brand AS brand, p.document_date, SUM(p.retailing) AS total
        FROM ${table} p
        WHERE 1=1
      `;

      const { whereClause, params } = await buildWhereClauseForRawSQL(
        filtersWithFiscalMonth
      );
      query += whereClause + ` GROUP BY p.Brand, p.document_date`;

      const results: any[] = await prisma.$queryRawUnsafe(query, ...params);

      for (const row of results) {
        const brand = row.brand || "Unknown";
        const fy = getFiscalYear(new Date(row.document_date));
        const retailing = Number(row.total);

        if (!brandYearTotals[brand]) brandYearTotals[brand] = {};
        brandYearTotals[brand][fy] =
          (brandYearTotals[brand][fy] || 0) + retailing;
      }
    }
  }

  // ✅ Collect all fiscal years we have
  const allYears = new Set<number>();
  for (const yearMap of Object.values(brandYearTotals)) {
    Object.keys(yearMap).forEach((y) => allYears.add(Number(y)));
  }

  const latestYear =
    allYears.size > 0
      ? Math.max(...Array.from(allYears))
      : getFiscalYear(new Date());

  // ✅ Find brand with highest retailing in latest FY
  let maxBrand = "";
  let maxBreakdown: { year: number; label: string; value: number }[] = [];
  let maxLatestValue = 0;

  for (const [brand, yearMap] of Object.entries(brandYearTotals)) {
    const breakdown = Object.entries(yearMap)
      .map(([year, value]) => ({
        year: Number(year),
        label: `${Number(year) - 1}-${String(year).slice(-2)}`, // e.g. "2024-25"
        value,
      }))
      .sort((a, b) => b.year - a.year);

    const latestValue = yearMap[latestYear] || 0;
    if (latestValue > maxLatestValue) {
      maxBrand = brand;
      maxLatestValue = latestValue;
      maxBreakdown = breakdown;
    }
  }

  // ✅ Growth calculation
  let growth: number | null = null;
  if (maxBreakdown.length >= 2) {
    const latest = maxBreakdown[0].value;
    const prev = maxBreakdown[1].value;
    growth = prev !== 0 ? (latest / prev) * 100 : null;
  }

  return {
    brand: maxBrand,
    breakdown: maxBreakdown,
    growth,
  };
}

export async function getRetailingByCategory(filters: any, source: string) {
  const tables = resolveTables(source);
  const breakdownMap: Record<string, Record<number, number>> = {};

  const hasFilters =
    filters &&
    (filters.Category ||
      filters.Brand ||
      filters.Branch ||
      filters.BaseChannel ||
      filters.ZM ||
      filters.RSM ||
      filters.ASM ||
      filters.TSI ||
      filters.StartDate ||
      filters.EndDate ||
      filters.Year ||
      filters.FiscalYear ||
      filters.Month);

  if (!hasFilters) {
    // ✅ Use summary table
    const results: any[] = await prisma.$queryRawUnsafe(`
      SELECT category, fiscal_year, SUM(total_retailing) AS total
      FROM category_retailing_summary
      GROUP BY category, fiscal_year
      ORDER BY category, fiscal_year
    `);

    for (const row of results) {
      const category = row.category || "Unknown";
      const fy = row.fiscal_year;
      const value = Number(row.total);

      if (!breakdownMap[category]) breakdownMap[category] = {};
      breakdownMap[category][fy] = (breakdownMap[category][fy] || 0) + value;
    }
  } else {
    // ✅ Old query logic when filters are present
    const filtersWithFiscalMonth = { ...filters, FiscalMonth: filters.Month };

    for (const table of tables) {
      let query = `
        SELECT p.category, p.document_date, SUM(p.retailing) AS total
        FROM ${table} p
        WHERE 1=1
      `;

      const { whereClause, params } = await buildWhereClauseForRawSQL(
        filtersWithFiscalMonth
      );

      query += whereClause;
      query += ` GROUP BY p.category, p.document_date`;

      const results: any[] = await prisma.$queryRawUnsafe(query, ...params);

      for (const row of results) {
        const category = row.category || "Unknown";
        const fy = getFiscalYear(new Date(row.document_date));
        const value = Number(row.total);

        if (!breakdownMap[category]) breakdownMap[category] = {};
        breakdownMap[category][fy] = (breakdownMap[category][fy] || 0) + value;
      }
    }
  }

  // ✅ Return same shape as before
  return Object.entries(breakdownMap).map(([category, yearlyData]) => {
    const breakdown = Object.entries(yearlyData)
      .map(([year, retailing]) => ({
        year: Number(year),
        value: retailing,
      }))
      .sort((a, b) => b.year - a.year);

    return {
      category,
      breakdown,
    };
  });
}

export async function getRetailingByBaseChannel(filters: any, source: string) {
  const tables = resolveTables(source);
  const breakdownMap: Record<string, Record<number, number>> = {};

  const hasFilters =
    filters &&
    (filters.Category ||
      filters.Brand ||
      filters.Branch ||
      filters.BaseChannel ||
      filters.ZM ||
      filters.RSM ||
      filters.ASM ||
      filters.TSI ||
      filters.StartDate ||
      filters.EndDate ||
      filters.Year ||
      filters.FiscalYear ||
      filters.Month);

  if (!hasFilters) {
    // ✅ Use summary table when no filters
    const results: any[] = await prisma.$queryRawUnsafe(`
      SELECT base_channel, fiscal_year, SUM(total_retailing) AS total
      FROM base_channel_retailing_summary
      GROUP BY base_channel, fiscal_year
      ORDER BY base_channel, fiscal_year
    `);

    for (const row of results) {
      const base_channel = row.base_channel || "Unknown";
      const fy = row.fiscal_year;
      const value = Number(row.total);

      if (!breakdownMap[base_channel]) breakdownMap[base_channel] = {};
      breakdownMap[base_channel][fy] =
        (breakdownMap[base_channel][fy] || 0) + value;
    }
  } else {
    // ✅ Old query logic when filters are present
    const filtersWithFiscalMonth = { ...filters, FiscalMonth: filters.Month };

    for (const table of tables) {
      let query = `
        SELECT p.base_channel, p.document_date, SUM(p.retailing) AS total
        FROM ${table} p
        WHERE 1=1
      `;

      const { whereClause, params } = await buildWhereClauseForRawSQL(
        filtersWithFiscalMonth
      );
      query += whereClause;
      query += ` GROUP BY p.base_channel, p.document_date`;

      const results: any[] = await prisma.$queryRawUnsafe(query, ...params);

      for (const row of results) {
        const base_channel = row.base_channel || "Unknown";
        const fy = getFiscalYear(new Date(row.document_date));
        const value = Number(row.total);

        if (!breakdownMap[base_channel]) breakdownMap[base_channel] = {};
        breakdownMap[base_channel][fy] =
          (breakdownMap[base_channel][fy] || 0) + value;
      }
    }
  }

  // ✅ Return same shape as before
  return Object.entries(breakdownMap).map(([base_channel, yearlyData]) => {
    const breakdown = Object.entries(yearlyData)
      .map(([year, value]) => ({
        year: Number(year),
        value,
      }))
      .sort((a, b) => b.year - a.year);

    return {
      base_channel,
      breakdown,
    };
  });
}

export async function getMonthlyRetailingTrend(filters: any, source: string) {
  const monthlyTotals: Record<string, Record<number, number>> = {};

  const hasFilters =
    filters &&
    (filters.Category ||
      filters.Brand ||
      filters.Branch ||
      filters.BaseChannel ||
      filters.ZM ||
      filters.RSM ||
      filters.ASM ||
      filters.TSI ||
      filters.StartDate ||
      filters.EndDate ||
      filters.Year ||
      filters.FiscalYear ||
      filters.Month);

  if (!hasFilters) {
    // ✅ Case 1: No filters → use summary table
    const results: any[] = await prisma.$queryRawUnsafe(`
      SELECT year, month, total_retailing
      FROM retailing_summary
      ORDER BY year, month
    `);

    for (const row of results) {
      const dt = new Date(row.year, row.month - 1, 1); // month is 1-based
      const fy = String(getFiscalYear(dt));
      const retailing = Number(row.total_retailing);

      if (!monthlyTotals[fy]) monthlyTotals[fy] = {};
      monthlyTotals[fy][row.month] =
        (monthlyTotals[fy][row.month] || 0) + retailing;
    }
  } else {
    // ✅ Case 2: Filters applied → fallback to original query
    const tables = resolveTables(source);
    const filtersWithFiscalMonth = { ...filters, FiscalMonth: filters.Month };

    for (const table of tables) {
      let query = `
        SELECT p.document_date, SUM(p.retailing) AS total
        FROM ${table} p
        WHERE 1=1
      `;

      const { whereClause, params } = await buildWhereClauseForRawSQL(
        filtersWithFiscalMonth
      );

      query += whereClause;
      query += ` GROUP BY p.document_date ORDER BY p.document_date`;

      const results: any[] = await prisma.$queryRawUnsafe(query, ...params);

      for (const row of results) {
        const date = new Date(row.document_date);
        const fy = String(getFiscalYear(date));
        const month = date.getMonth() + 1;
        const retailing = Number(row.total);

        if (!monthlyTotals[fy]) monthlyTotals[fy] = {};
        monthlyTotals[fy][month] = (monthlyTotals[fy][month] || 0) + retailing;
      }
    }
  }

  // ✅ Format as array { year: fiscalYear, month, retailing }
  const trendData: { year: string; month: number; retailing: number }[] = [];
  for (const fy of Object.keys(monthlyTotals)) {
    for (const month of Object.keys(monthlyTotals[fy])) {
      trendData.push({
        year: fy,
        month: Number(month),
        retailing: monthlyTotals[fy][Number(month)],
      });
    }
  }

  return trendData;
}

export async function getTopBrandforms(filters: any, source: string) {
  const tables = resolveTables(source);
  const brandformYearlyMap: Record<string, Record<number, number>> = {};

  const hasFilters =
    filters &&
    (filters.Category ||
      filters.Brand ||
      filters.Brandform ||
      filters.Branch ||
      filters.BaseChannel ||
      filters.ZM ||
      filters.RSM ||
      filters.ASM ||
      filters.TSI ||
      filters.StartDate ||
      filters.EndDate ||
      filters.Year ||
      filters.FiscalYear ||
      filters.Month);

  if (!hasFilters) {
    // ✅ Use summary table when no filters
    const results: any[] = await prisma.$queryRawUnsafe(`
      SELECT brandform, fiscal_year, SUM(total_retailing) AS total
      FROM brandform_retailing_summary
      GROUP BY brandform, fiscal_year
      ORDER BY brandform, fiscal_year
    `);

    for (const row of results) {
      const brandform = row.brandform || "Unknown";
      const fy = row.fiscal_year;
      const retailing = Number(row.total);

      if (!brandformYearlyMap[brandform]) brandformYearlyMap[brandform] = {};
      brandformYearlyMap[brandform][fy] =
        (brandformYearlyMap[brandform][fy] || 0) + retailing;
    }
  } else {
    // ✅ Old query logic when filters are present
    const filtersWithFiscalMonth = { ...filters, FiscalMonth: filters.Month };

    for (const table of tables) {
      let query = `
        SELECT p.brandform, p.document_date, SUM(p.retailing) AS total
        FROM ${table} p
        WHERE 1=1
      `;

      const { whereClause, params } = await buildWhereClauseForRawSQL(
        filtersWithFiscalMonth
      );
      query += whereClause;
      query += ` GROUP BY p.brandform, p.document_date`;

      const results: any[] = await prisma.$queryRawUnsafe(query, ...params);

      for (const row of results) {
        const brandform = row.brandform || "Unknown";
        const fy = getFiscalYear(new Date(row.document_date));
        const retailing = Number(row.total);

        if (!brandformYearlyMap[brandform]) brandformYearlyMap[brandform] = {};
        brandformYearlyMap[brandform][fy] =
          (brandformYearlyMap[brandform][fy] || 0) + retailing;
      }
    }
  }

  // ✅ Compute top brandforms
  const topBrandforms = Object.entries(brandformYearlyMap)
    .map(([brandform, yearData]) => {
      const breakdown = Object.entries(yearData)
        .map(([year, value]) => ({
          year: Number(year),
          value,
        }))
        .sort((a, b) => b.year - a.year);

      const total = breakdown.reduce((sum, item) => sum + item.value, 0);

      let growth: number | null = null;
      if (breakdown.length >= 2) {
        const latest = breakdown[0].value;
        const previous = breakdown[1].value;
        if (previous > 0) {
          growth = (latest / previous) * 100;
        }
      }

      return { brandform, breakdown, total, growth };
    })
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)
    .map(({ brandform, breakdown, growth }) => ({
      brandform,
      breakdown,
      growth,
    }));

  return topBrandforms;
}

// STORE page
export async function getAllBranches(): Promise<string[]> {
  const branches = await prisma.store_mapping.findMany({
    distinct: ["Branch"],
    select: { Branch: true },
  });

  return branches
    .map((b) => b.Branch)
    .filter((branch): branch is string => branch !== null);
}

export async function suggestStores(branch: string | null, query: string) {
  const whereClause: any = {
    Old_Store_Code: {
      contains: query,
    },
  };

  if (branch) {
    whereClause.Branch = branch;
  }

  const stores = await prisma.store_mapping.findMany({
    where: whereClause,
    take: 10,
  });

  return stores;
}

export async function getStoreDetails(storeCode: string) {
  const store = await prisma.store_mapping.findFirst({
    where: { Old_Store_Code: storeCode },
    select: {
      Old_Store_Code: true,
      customer_name: true,
      customer_type: true, // needed for join
    },
  });

  let channelDesc = "Unknown";

  if (store?.customer_type) {
    const channel = await prisma.channel_mapping.findFirst({
      where: { customer_type: store.customer_type },
      select: { channel_desc: true },
    });
    channelDesc = channel?.channel_desc || "Unknown";
  }

  return {
    storeCode,
    storeName: store?.customer_name || "Unknown",
    channelDesc,
  };
}

export async function getLastStoreBills(
  storeCode: string,
  source: string,
  year?: number[],
  month?: number[]
) {
  const tables = resolveTables(source);

  const storeMapping = await prisma.store_mapping.findFirst({
    where: { Old_Store_Code: storeCode },
    select: { Old_Store_Code: true },
  });
  if (!storeMapping)
    throw new Error(`Store mapping not found for ${storeCode}`);

  // Map finalized table names -> raw tables that contain document_no
  const finalizedToRaw: Record<string, string> = {
    psr_data_finalized: "psr_data_historical",
    psr_finalized_temp: "psr_data_temp",
  };

  // Use only allowed raw table names (whitelist)
  const rawTables = tables.map((t) => finalizedToRaw[t] ?? t);

  // ---- Fiscal Year filter logic (Jul–Jun) ----
  const yearFilter = year?.length
    ? `AND (CASE WHEN MONTH(document_date) >= 7 THEN YEAR(document_date)+1 ELSE YEAR(document_date) END) IN (${year
        .map(() => "?")
        .join(",")})`
    : "";
  const monthFilter = month?.length
    ? `AND MONTH(document_date) IN (${month.map(() => "?").join(",")})`
    : "";

  const filterParams = [...(year ?? []), ...(month ?? [])];
  const allParams = [storeCode, ...filterParams];

  // ---- Query for last 6 invoices (document_no from raw tables) ----
  const billQuery = rawTables
    .map(
      (table) => `
        SELECT
          document_no AS documentNo,
          SUM(retailing) AS totalRetailing,
          MAX(document_date) AS documentDate
        FROM ${table}
        WHERE customer_code = ?
          AND document_no LIKE '%-I%'
          ${yearFilter} ${monthFilter}
        GROUP BY document_no
      `
    )
    .join(" UNION ALL ");

  // Wrap union to sort + limit
  const finalQuery = `
    SELECT documentNo, SUM(totalRetailing) AS totalRetailing, MAX(documentDate) AS documentDate
    FROM (
      ${billQuery}
    ) t
    GROUP BY documentNo
    ORDER BY MAX(documentDate) DESC
    LIMIT 6
  `;

  // Repeat params for each table in the union (matches placeholders in each SELECT)
  const results = await prisma.$queryRawUnsafe<any[]>(
    finalQuery,
    ...rawTables.flatMap(() => allParams)
  );

  return results.map((row) => ({
    documentNo: row.documentNo,
    totalRetailing: Number(row.totalRetailing),
    documentDate: new Date(row.documentDate).toISOString(),
  }));
}

export async function getStoreRetailingTrend(
  storeCode: string,
  source: string,
  year?: number[],
  month?: number[]
) {
  let tables: string[] = [];

  if (source === "main") {
    tables = ["psr_data_historical"];
  } else if (source === "temp") {
    tables = ["psr_data_temp"];
  } else {
    tables = ["psr_data_historical", "psr_data_temp"];
  }

  const hasYear = year?.length;
  const hasMonth = month?.length;

  const filters: string[] = [];
  if (hasYear)
    filters.push(`(
    CASE WHEN MONTH(document_date) >= 7 THEN YEAR(document_date)+1 ELSE YEAR(document_date) END
  ) IN (${year.map(() => "?").join(",")})`);
  if (hasMonth)
    filters.push(`(
    CASE WHEN MONTH(document_date) >= 7 THEN MONTH(document_date)-6 ELSE MONTH(document_date)+6 END
  ) IN (${month.map(() => "?").join(",")})`);

  const filterClause = filters.length ? `AND ${filters.join(" AND ")}` : "";

  const unionQueryParts: string[] = [];
  const queryParams: any[] = [];

  for (const table of tables) {
    unionQueryParts.push(`
      SELECT 
        CASE WHEN MONTH(document_date) >= 7 THEN YEAR(document_date)+1 ELSE YEAR(document_date) END AS year,
        CASE WHEN MONTH(document_date) >= 7 THEN MONTH(document_date)-6 ELSE MONTH(document_date)+6 END AS month,
        retailing
      FROM ${table}
      WHERE customer_code = ? ${filterClause}
    `);
    queryParams.push(storeCode);
    if (hasYear) queryParams.push(...year);
    if (hasMonth) queryParams.push(...month);
  }

  const fullQuery = `
    SELECT year, month, SUM(retailing) AS total
    FROM (
      ${unionQueryParts.join(" UNION ALL ")}
    ) AS combined
    GROUP BY year, month
    ORDER BY year, month
  `;

  const result = await prisma.$queryRawUnsafe<any[]>(fullQuery, ...queryParams);

  return result.map((r) => ({
    year: Number(r.year),
    month: Number(r.month),
    retailing: Number(r.total),
  }));
}

export async function getStoreGPTrend(
  storeCode: string,
  source: string,
  year?: number[],
  month?: number[],
  gpType: string = "p3m"
) {
  let tables: string[] = [];

  if (source === "main") {
    tables = ["gp_data"];
  } else if (source === "temp") {
    tables = ["gp_data_temp"];
  } else {
    tables = ["gp_data", "gp_data_temp"];
  }

  const hasYear = year?.length;
  const hasMonth = month?.length;

  const filters: string[] = [];
  if (hasYear) {
    filters.push(`(
      CASE WHEN MONTH(document_date) >= 7 THEN YEAR(document_date)+1 ELSE YEAR(document_date) END
    ) IN (${year.map(() => "?").join(",")})`);
  }
  if (hasMonth) {
    filters.push(`(
      CASE WHEN MONTH(document_date) >= 7 THEN MONTH(document_date)-6 ELSE MONTH(document_date)+6 END
    ) IN (${month.map(() => "?").join(",")})`);
  }

  const filterClause = filters.length ? `AND ${filters.join(" AND ")}` : "";

  const unionQueryParts: string[] = [];
  const queryParams: any[] = [];

  const gpColumn = gpType === "p1m" ? "p1m_gp" : "p3m_gp";

  for (const table of tables) {
    unionQueryParts.push(`
      SELECT 
        CASE WHEN MONTH(document_date) >= 7 THEN YEAR(document_date)+1 ELSE YEAR(document_date) END AS year,
        CASE WHEN MONTH(document_date) >= 7 THEN MONTH(document_date)-6 ELSE MONTH(document_date)+6 END AS month,
        ${gpColumn} AS gp
      FROM ${table}
      WHERE retailer_code = ? ${filterClause}
    `);
    queryParams.push(storeCode);
    if (hasYear) queryParams.push(...year);
    if (hasMonth) queryParams.push(...month);
  }

  const fullQuery = `
    SELECT year, month, SUM(gp) AS gp
    FROM (
      ${unionQueryParts.join(" UNION ALL ")}
    ) AS combined
    GROUP BY year, month
    ORDER BY year, month
  `;

  const result = await prisma.$queryRawUnsafe<any[]>(fullQuery, ...queryParams);

  return result.map((r) => ({
    year: Number(r.year),
    month: Number(r.month),
    gp: Number(r.gp), // ✅ alias fixed
  }));
}

export async function getStoreStats(
  storeCode: string,
  source: string,
  year?: number[],
  month?: number[]
) {
  let tables: string[] = [];

  if (source === "main") {
    tables = ["psr_data_historical"];
  } else if (source === "temp") {
    tables = ["psr_data_temp"];
  } else {
    tables = ["psr_data_historical", "psr_data_temp"];
  }

  const storeMapping = await prisma.store_mapping.findFirst({
    where: { Old_Store_Code: storeCode },
    select: { Old_Store_Code: true },
  });
  if (!storeMapping)
    throw new Error(`Store mapping not found for ${storeCode}`);

  const yearFilter = year?.length
    ? `AND (CASE WHEN MONTH(document_date) >= 7 THEN YEAR(document_date)+1 ELSE YEAR(document_date) END) IN (${year
        .map(() => "?")
        .join(",")})`
    : "";
  const monthFilter = month?.length
    ? `AND (CASE WHEN MONTH(document_date) >= 7 THEN MONTH(document_date)-6 ELSE MONTH(document_date)+6 END) IN (${month
        .map(() => "?")
        .join(",")})`
    : "";

  const filterParams = [...(year ?? []), ...(month ?? [])];
  const allParams = [storeCode, ...filterParams];

  // Month query
  const monthQuery = tables
    .map(
      (table) => `
        SELECT
          CASE WHEN MONTH(document_date) >= 7 THEN YEAR(document_date)+1 ELSE YEAR(document_date) END AS year,
          CASE WHEN MONTH(document_date) >= 7 THEN MONTH(document_date)-6 ELSE MONTH(document_date)+6 END AS month,
          SUM(retailing) AS total
        FROM ${table}
        WHERE customer_code = ? ${yearFilter} ${monthFilter}
        GROUP BY year, month
      `
    )
    .join(" UNION ALL ");

  // Brand query
  const brandQuery = tables
    .map(
      (table) => `
        SELECT brand, SUM(retailing) AS total
        FROM ${table}
        WHERE customer_code = ? ${yearFilter} ${monthFilter}
        GROUP BY brand
      `
    )
    .join(" UNION ALL ");

  const monthResults = await prisma.$queryRawUnsafe<any[]>(
    monthQuery,
    ...tables.flatMap(() => allParams)
  );
  const brandResults = await prisma.$queryRawUnsafe<any[]>(
    brandQuery,
    ...tables.flatMap(() => allParams)
  );

  // Aggregate month results
  const monthMap = new Map<string, number>();
  for (const r of monthResults) {
    const key = `${r.year}-${r.month}`;
    monthMap.set(key, (monthMap.get(key) ?? 0) + Number(r.total));
  }

  const parsedMonthResults = Array.from(monthMap.entries())
    .map(([key, total]) => {
      const [year, month] = key.split("-").map(Number);
      return { year, month, total };
    })
    .sort((a, b) => (a.year !== b.year ? a.year - b.year : a.month - b.month)); // FY ordering

  // Aggregate brand results
  const brandMap = new Map<string, number>();
  for (const r of brandResults) {
    const brandName = r.brand ?? "Unknown";
    brandMap.set(brandName, (brandMap.get(brandName) ?? 0) + Number(r.total));
  }

  const parsedBrandResults = Array.from(brandMap.entries()).map(
    ([brand, total]) => ({ brand, total })
  );

  // Calculate stats
  const highestMonth = parsedMonthResults.reduce(
    (max, curr) => (!max || curr.total > max.total ? curr : max),
    null as any
  );
  const lowestMonth = parsedMonthResults.reduce(
    (min, curr) => (!min || curr.total < min.total ? curr : min),
    null as any
  );
  const highestBrand = parsedBrandResults.reduce(
    (max, curr) => (!max || curr.total > max.total ? curr : max),
    null as any
  );
  const lowestBrand = parsedBrandResults.reduce(
    (min, curr) => (!min || curr.total < min.total ? curr : min),
    null as any
  );

  // ✅ Average retailing calculation
  const averageRetailing =
    parsedMonthResults.length > 0
      ? parsedMonthResults.reduce((sum, r) => sum + r.total, 0) /
        parsedMonthResults.length
      : null;

  return {
    highestRetailingMonth: highestMonth
      ? {
          year: highestMonth.year,
          month: highestMonth.month,
          monthName: monthNumberToName(highestMonth.month),
          retailing: highestMonth.total,
        }
      : null,
    lowestRetailingMonth: lowestMonth
      ? {
          year: lowestMonth.year,
          month: lowestMonth.month,
          monthName: monthNumberToName(lowestMonth.month),
          retailing: lowestMonth.total,
        }
      : null,
    highestRetailingBrand: highestBrand
      ? { brand: highestBrand.brand, retailing: highestBrand.total }
      : null,
    lowestRetailingBrand: lowestBrand
      ? { brand: lowestBrand.brand, retailing: lowestBrand.total }
      : null,
    averageRetailing,
  };
}

export async function getStoreGPStats(
  storeCode: string,
  source: string,
  year?: number[],
  month?: number[],
  gpType: string = "p3m"
) {
  let tables: string[] = [];

  if (source === "main") {
    tables = ["gp_data"];
  } else if (source === "temp") {
    tables = ["gp_data_temp"];
  } else {
    tables = ["gp_data", "gp_data_temp"];
  }

  const gpColumn = gpType === "p1m" ? "p1m_gp" : "p3m_gp";

  const hasYear = year?.length;
  const hasMonth = month?.length;

  const filters: string[] = [];
  if (hasYear)
    filters.push(`(
      CASE WHEN MONTH(document_date) >= 7 THEN YEAR(document_date)+1 ELSE YEAR(document_date) END
    ) IN (${year.map(() => "?").join(",")})`);
  if (hasMonth)
    filters.push(`(
      CASE WHEN MONTH(document_date) >= 7 THEN MONTH(document_date)-6 ELSE MONTH(document_date)+6 END
    ) IN (${month.map(() => "?").join(",")})`);

  const filterClause = filters.length ? `AND ${filters.join(" AND ")}` : "";
  const queryParams: any[] = [];

  const unionQueryParts = tables.map((table) => {
    queryParams.push(storeCode);
    if (hasYear) queryParams.push(...year);
    if (hasMonth) queryParams.push(...month);

    return `
      SELECT 
        CASE WHEN MONTH(document_date) >= 7 THEN YEAR(document_date)+1 ELSE YEAR(document_date) END AS year,
        CASE WHEN MONTH(document_date) >= 7 THEN MONTH(document_date)-6 ELSE MONTH(document_date)+6 END AS month,
        ${gpColumn} AS gp
      FROM ${table}
      WHERE retailer_code = ? ${filterClause}
    `;
  });

  const fullQuery = `
    SELECT year, month, SUM(gp) AS total
    FROM (
      ${unionQueryParts.join(" UNION ALL ")}
    ) AS combined
    GROUP BY year, month
    ORDER BY year, month
  `;

  const results = await prisma.$queryRawUnsafe<any[]>(
    fullQuery,
    ...queryParams
  );

  if (!results.length) {
    return {
      highestGPMonth: null,
      lowestGPMonth: null,
      averageGP: 0,
    };
  }

  // Process results
  const parsedResults = results.map((r) => ({
    year: Number(r.year),
    month: Number(r.month),
    gp: Number(r.total),
  }));

  const highest = parsedResults.reduce(
    (max, curr) => (!max || curr.gp > max.gp ? curr : max),
    null as any
  );
  const lowest = parsedResults.reduce(
    (min, curr) => (!min || curr.gp < min.gp ? curr : min),
    null as any
  );
  const average =
    parsedResults.reduce((sum, r) => sum + r.gp, 0) / parsedResults.length;

  return {
    highestGPMonth: highest
      ? { ...highest, monthName: monthNumberToName(highest.month) }
      : null,
    lowestGPMonth: lowest
      ? { ...lowest, monthName: monthNumberToName(lowest.month) }
      : null,
    averageGP: Number(average.toFixed(0)),
  };
}

export async function getCategoryRetailing(
  storeCode: string,
  source: string,
  year?: number[],
  month?: number[]
) {
  let tables: string[] = [];

  if (source === "main") {
    tables = ["psr_data_historical"];
  } else if (source === "temp") {
    tables = ["psr_data_temp"];
  } else {
    tables = ["psr_data_historical", "psr_data_temp"];
  }

  // Step 1: Preload product_mapping (tiny table vs psr_data)
  const products = await prisma.product_mapping.findMany({
    select: { p_code: true, category: true },
  });
  const productMap = new Map(
    products.map((p) => [p.p_code, p.category ?? "Unknown"])
  );

  // Step 2: Build date range from fiscal filters
  let dateCondition: any = {};
  if (year && year.length > 0) {
    const minFY = Math.min(...year);
    const maxFY = Math.max(...year);
    const minDate = new Date(minFY - 1, 6, 1); // Jul of prev year
    const maxDate = new Date(maxFY, 5, 30); // Jun of that year
    dateCondition = { gte: minDate, lte: maxDate };
  }

  // Step 3: Query psr_data (and psr_data_temp if combined)
  let rawResults: { p_code: number; document_date: Date; retailing: number }[] =
    [];

  for (const table of tables) {
    const delegate = prisma[
      table as "psr_data_historical" | "psr_data_temp"
    ] as any;
    const data = await delegate.findMany({
      where: {
        customer_code: storeCode,
        ...(year?.length ? { document_date: dateCondition } : {}),
      },
      select: {
        p_code: true,
        document_date: true,
        retailing: true, // Decimal coming from Prisma
      },
    });

    // ✅ Convert Decimal -> number
    rawResults.push(
      ...data.map((row: any) => ({
        p_code: row.p_code,
        document_date: row.document_date,
        retailing: Number(row.retailing),
      }))
    );
  }

  // Step 4: Apply month filter in memory (because fiscal month ≠ calendar month)
  if (month && month.length > 0) {
    rawResults = rawResults.filter((row) => {
      const calMonth = row.document_date.getMonth(); // 0=Jan..11=Dec
      const fiscalMonth = calMonth >= 6 ? calMonth - 6 + 1 : calMonth + 6 + 1;
      // July=7 => fiscalMonth=1, Aug=8 =>2, ... June=6 =>12
      return month.includes(fiscalMonth);
    });
  }

  // Step 5: Aggregate by category + fiscal year
  const categoryMap = new Map<string, Map<number, number>>();

  for (const row of rawResults) {
    const category = productMap.get(row.p_code) ?? "Unknown";
    const fy =
      row.document_date.getMonth() >= 6
        ? row.document_date.getFullYear() + 1
        : row.document_date.getFullYear();

    if (!categoryMap.has(category)) categoryMap.set(category, new Map());
    const yearMap = categoryMap.get(category)!;
    yearMap.set(fy, (yearMap.get(fy) ?? 0) + row.retailing);
  }

  // Step 6: Transform to final structure
  const result = Array.from(categoryMap.entries()).map(
    ([category, yearMap]) => {
      const breakdown = Array.from(yearMap.entries())
        .map(([fy, value]) => ({ year: fy, value }))
        .sort((a, b) => b.year - a.year);

      return { category, breakdown };
    }
  );

  // Step 7: Sort by latest FY value
  return result.sort((a, b) => {
    const aLatest = a.breakdown[0]?.value ?? 0;
    const bLatest = b.breakdown[0]?.value ?? 0;
    return bLatest - aLatest;
  });
}

// RANKING page
export async function getTopStoresQuery({
  source,
  months = 3,
  zm,
  rsm,
  asm,
  category,
  branch,
  baseChannel,
  brand,
  startDate,
  endDate,
  countOnly = false, // pagination removed
}: TopStoresQueryParams): Promise<{ query: string; values: any[] }> {
  const tables = resolveTables(source);

  // --- Step 1: Get list of distinct months ---
  let monthsValues: string[] = [];
  if (startDate && endDate) {
    const dateQuery = `
      SELECT DISTINCT DATE_FORMAT(document_date, '%Y-%m') as ym
      FROM ${tables[0]}
      WHERE document_date BETWEEN ? AND ?
      ORDER BY ym DESC
    `;
    const rows: any[] = await prisma.$queryRawUnsafe(
      dateQuery,
      startDate,
      endDate
    );
    monthsValues = rows.map((r) => r.ym);
    if (monthsValues.length === 0)
      throw new Error("No data in selected date range.");
  } else {
    const dateQuery = `
      SELECT DISTINCT DATE_FORMAT(document_date, '%Y-%m') as ym
      FROM ${tables[0]}
      ORDER BY ym DESC
      LIMIT ?
    `;
    const rows: any[] = await prisma.$queryRawUnsafe(dateQuery, months);
    monthsValues = rows.map((r) => r.ym);
    if (monthsValues.length === 0) throw new Error("No recent data found.");
  }

  // --- Step 2: Build month conditions and values ---
  const monthCondition = monthsValues
    .map(() => `DATE_FORMAT(p.document_date, '%Y-%m') = ?`)
    .join(" OR ");
  const monthConditionClause = `(${monthCondition})`;

  // --- Step 3: Dynamic filters ---
  const filters: string[] = [];
  const dynamicValues: any[] = [];

  if (zm) {
    filters.push("p.zm = ?");
    dynamicValues.push(zm);
  }
  if (rsm) {
    filters.push("p.rsm = ?");
    dynamicValues.push(rsm);
  }
  if (asm) {
    filters.push("p.asm = ?");
    dynamicValues.push(asm);
  }
  if (category) {
    filters.push("p.category = ?");
    dynamicValues.push(category);
  }
  if (branch) {
    filters.push("p.branch = ?");
    dynamicValues.push(branch);
  }
  if (baseChannel) {
    filters.push("p.base_channel = ?");
    dynamicValues.push(baseChannel);
  }
  if (brand) {
    filters.push("p.brand = ?");
    dynamicValues.push(brand);
  }

  const filterClause = filters.length ? `AND ${filters.join(" AND ")}` : "";

  // --- Step 4: Build subqueries for each table ---
  const subQueries = tables
    .map(
      (table) => `
        SELECT
          p.customer_code,
          p.branch AS branch_name,
          SUM(p.retailing) AS total_retailing
        FROM ${table} p
        WHERE ${monthConditionClause} ${filterClause}
        GROUP BY p.customer_code, p.branch
      `
    )
    .join(" UNION ALL ");

  // --- Step 5: Build final CTE ---
  const topStoresCTE = `
    WITH ranked_stores AS (
      SELECT
        customer_code,
        branch_name,
        SUM(total_retailing) AS total_retailing,
        ROUND(SUM(total_retailing) / ?, 2) AS avg_retailing
      FROM (${subQueries}) combined
      GROUP BY customer_code, branch_name
      ORDER BY avg_retailing DESC
      LIMIT 100
    )
  `;

  // --- Step 6: Collect values ---
  const totalTables = tables.length;
  const repeatedValues = Array(totalTables)
    .fill([...monthsValues, ...dynamicValues])
    .flat();

  const allValues = [
    monthsValues.length, // divisor for avg_retailing
    ...repeatedValues, // repeated for each table subquery
  ];

  if (countOnly) {
    return {
      query: `
        ${topStoresCTE}
        SELECT COUNT(*) as count FROM ranked_stores
      `,
      values: allValues,
    };
  }

  // --- Final: Always return top 100 (no pagination) ---
  return {
    query: `
      ${topStoresCTE}
      SELECT
        customer_code AS store_code,
        branch_name,
        avg_retailing AS average_retailing
      FROM ranked_stores
      ORDER BY avg_retailing DESC
    `,
    values: allValues,
  };
}
