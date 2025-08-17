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
): Array<"psr_data" | "psr_data_temp"> {
  if (source === "main") return ["psr_data"];
  if (source === "temp") return ["psr_data_temp"];
  return ["psr_data", "psr_data_temp"];
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

  // Store filters
  addInClause(filters.ZM, "s.ZM");
  addInClause(filters.Branch, "s.Branch");
  addInClause(filters.RSM, "s.RSM");
  addInClause(filters.ASM, "s.ASM");
  addInClause(filters.TSI, "s.TSI");

  // Accept FiscalYear or Year from the UI; prefer FiscalYear if present
  const fyList =
    (filters?.FiscalYear && filters.FiscalYear.length
      ? filters.FiscalYear
      : null) ?? (filters?.Year && filters.Year.length ? filters.Year : null);

  // Fiscal Year filter (END-YEAR convention: Jul..Dec => YEAR+1, Jan..Jun => YEAR)
  if (fyList?.length) {
    whereClause += ` AND (
      CASE
        WHEN MONTH(p.document_date) >= 7 THEN YEAR(p.document_date) + 1
        ELSE YEAR(p.document_date)
      END
    ) IN (${fyList.map(() => "?").join(",")})`;
    params.push(...fyList);
  }

  // Fiscal Month filter (1 = July, 12 = June) — keep as-is
  if (filters.FiscalMonth?.length) {
    whereClause += ` AND (
      CASE
        WHEN MONTH(p.document_date) >= 7 THEN MONTH(p.document_date) - 6
        ELSE MONTH(p.document_date) + 6
      END
    ) IN (${filters.FiscalMonth.map(() => "?").join(",")})`;
    params.push(...filters.FiscalMonth);
  }

  // Product filters
  addInClause(filters.Category, "pm.category");
  addInClause(filters.Brand, "pm.brand");
  addInClause(filters.Brandform, "pm.brandform");
  addInClause(filters.Subbrandform, "pm.subbrandform");

  // Channel filters
  addInClause(filters.ChannelDesc, "c.channel_desc");
  addInClause(filters.BaseChannel, "c.base_channel");
  addInClause(filters.ShortChannel, "c.short_channel");

  // Date range (if provided, keep it — resolvers may use it)
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

export async function getRetailingWithRawSQL(
  filters: any,
  source: string
): Promise<number> {
  const tables = resolveTables(source);

  let total = 0;
  for (const table of tables) {
    const subtotal = await getTotalRetailing(table, filters);
    total += subtotal;
  }
  return total;
}

// Drill-down Logic
export async function getRetailingBreakdown(
  level: string,
  parent: string | undefined,
  filters: any,
  source: string
) {
  const levelMap: Record<string, string> = {
    category: "pm.category",
    brand: "pm.brand",
    brandform: "pm.brandform",
    subbrandform: "pm.subbrandform",
    base_channel: "c.base_channel",
    short_channel: "c.short_channel",
    channel_desc: "c.channel_desc",
  };

  const groupField = levelMap[level?.toLowerCase()];
  if (!groupField) {
    throw new Error(`Invalid level: ${level}`);
  }

  // Map parent for drill-down filtering
  let parentFilter: { field: string; value: string } | undefined;
  if (parent) {
    const parentFieldMap: Record<string, string> = {
      brand: "pm.category",
      brandform: "pm.brand",
      subbrandform: "pm.brandform",
      short_channel: "c.base_channel",
      channel_desc: "c.short_channel",
    };
    const parentField = parentFieldMap[level?.toLowerCase()];
    if (parentField) {
      parentFilter = { field: parentField, value: parent };
    }
  }

  const tables = resolveTables(source);
  const breakdownMap: Record<string, { [year: number]: number }> = {};

  for (const table of tables) {
    let query = `
      SELECT ${groupField} AS group_key, p.document_date, SUM(p.retailing) AS total
      FROM ${table} p
      LEFT JOIN product_mapping pm ON p.p_code = pm.p_code
      LEFT JOIN store_mapping s ON p.customer_code = s.Old_Store_Code
      LEFT JOIN channel_mapping c ON s.customer_type = c.customer_type
      WHERE 1=1
    `;

    const { whereClause, params } = await buildWhereClauseForRawSQL(
      filters,
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

// DASHBOARD page
export async function getTotalRetailing(
  table: string,
  filters: any
): Promise<number> {
  let query = `
    SELECT SUM(p.retailing) AS total
    FROM ${table} p
    LEFT JOIN store_mapping s ON p.customer_code = s.Old_Store_Code
    LEFT JOIN channel_mapping c ON s.customer_type = c.customer_type
    LEFT JOIN product_mapping pm ON p.p_code = pm.p_code
    WHERE 1=1
  `;
  const params: any[] = [];

  // Store filters
  query = addInClause(query, params, filters.ZM, "s.ZM");
  query = addInClause(query, params, filters.Branch, "s.Branch");
  query = addInClause(query, params, filters.RSM, "s.RSM");
  query = addInClause(query, params, filters.ASM, "s.ASM");
  query = addInClause(query, params, filters.TSI, "s.TSI");

  // Accept FiscalYear or Year (UI sends Year) — END-YEAR convention
  const fyList =
    (filters?.FiscalYear?.length ? filters.FiscalYear : null) ??
    (filters?.Year?.length ? filters.Year : null);

  if (fyList?.length) {
    query += ` AND (
      CASE
        WHEN MONTH(p.document_date) >= 7 THEN YEAR(p.document_date) + 1
        ELSE YEAR(p.document_date)
      END
    ) IN (${fyList.map(() => "?").join(",")})`;
    params.push(...fyList);
  }

  // Fiscal Month filter (1 = July .. 12 = June)
  if (filters.FiscalMonth?.length) {
    query += ` AND (
      CASE 
        WHEN MONTH(p.document_date) >= 7 THEN MONTH(p.document_date) - 6
        ELSE MONTH(p.document_date) + 6
      END
    ) IN (${filters.FiscalMonth.map(() => "?").join(",")})`;
    params.push(...filters.FiscalMonth);
  }

  // Product filters
  query = addInClause(query, params, filters.Category, "pm.category");
  query = addInClause(query, params, filters.Brand, "pm.brand");
  query = addInClause(query, params, filters.Brandform, "pm.brandform");
  query = addInClause(query, params, filters.Subbrandform, "pm.subbrandform");

  // Channel filters
  query = addInClause(
    query,
    params,
    filters.Channel ?? filters.ChannelDesc,
    "c.channel_desc"
  );
  query = addInClause(
    query,
    params,
    filters.BroadChannel ?? filters.BaseChannel,
    "c.base_channel"
  );
  query = addInClause(query, params, filters.ShortChannel, "c.short_channel");

  const result: any[] = await prisma.$queryRawUnsafe(query, ...params);
  const total = result[0]?.total;
  return total ? Number(total) : 0;
}

export async function getHighestRetailingBranch(filters: any, source: string) {
  const tables = resolveTables(source);
  const branchYearMap: Record<string, Record<number, number>> = {};

  for (const table of tables) {
    let query = `
      SELECT 
        s.Branch AS branch,
        p.document_date,
        SUM(p.retailing) AS total
      FROM ${table} p
      LEFT JOIN store_mapping s ON p.customer_code = s.Old_Store_Code
      LEFT JOIN channel_mapping c ON s.customer_type = c.customer_type
      LEFT JOIN product_mapping pm ON p.p_code = pm.p_code
      WHERE 1=1
    `;

    const { whereClause, params } = await buildWhereClauseForRawSQL(filters);
    query += whereClause + ` GROUP BY s.Branch, p.document_date`;

    const results: any[] = await prisma.$queryRawUnsafe(query, ...params);

    for (const row of results) {
      const branch = row.branch || "Unknown";
      const fy = getFiscalYear(new Date(row.document_date)); // convert in JS
      const retailing = Number(row.total);

      if (!branchYearMap[branch]) branchYearMap[branch] = {};
      branchYearMap[branch][fy] = (branchYearMap[branch][fy] || 0) + retailing;
    }
  }

  // Find max branch across all FYs
  let maxBranch = "";
  let maxTotal = 0;

  for (const [branch, yearly] of Object.entries(branchYearMap)) {
    const total = Object.values(yearly).reduce((a, b) => a + b, 0);
    if (total > maxTotal) {
      maxTotal = total;
      maxBranch = branch;
    }
  }

  // Format breakdown
  const breakdownRaw = branchYearMap[maxBranch] || {};
  const breakdown = Object.entries(breakdownRaw)
    .map(([year, value]) => ({
      year: parseInt(year), // fiscal end-year
      label: `${parseInt(year) - 1}-${String(year).slice(-2)}`, // "2024-25"
      value,
    }))
    .sort((a, b) => b.year - a.year);

  // Growth
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
  const tables = resolveTables(source);
  const brandYearTotals: Record<string, Record<number, number>> = {};

  for (const table of tables) {
    let query = `
      SELECT pm.brand AS brand, p.document_date, SUM(p.retailing) AS total
      FROM ${table} p
      LEFT JOIN product_mapping pm ON p.p_code = pm.p_code
      LEFT JOIN store_mapping s ON p.customer_code = s.Old_Store_Code
      LEFT JOIN channel_mapping c ON s.customer_type = c.customer_type
      WHERE 1=1
    `;

    const { whereClause, params } = await buildWhereClauseForRawSQL(filters);
    query += whereClause;
    query += ` GROUP BY pm.brand, p.document_date`;

    const results: any[] = await prisma.$queryRawUnsafe(query, ...params);

    for (const row of results) {
      const brand = row.brand || "Unknown";
      const date = new Date(row.document_date);
      const fy = getFiscalYear(date); // now end-year convention
      const retailing = Number(row.total);

      if (!brandYearTotals[brand]) brandYearTotals[brand] = {};
      brandYearTotals[brand][fy] =
        (brandYearTotals[brand][fy] || 0) + retailing;
    }
  }

  // Determine latest fiscal year present
  const allYears = new Set<number>();
  for (const yearMap of Object.values(brandYearTotals)) {
    Object.keys(yearMap).forEach((y) => allYears.add(Number(y)));
  }

  // if no data, fallback to current FY
  const latestYear =
    allYears.size > 0
      ? Math.max(...Array.from(allYears))
      : getFiscalYear(new Date());

  // Pick highest brand based on latest year's retailing
  let maxBrand = "";
  let maxBreakdown: { year: number; value: number }[] = [];
  let maxLatestValue = 0;

  for (const [brand, yearMap] of Object.entries(brandYearTotals)) {
    const breakdown = Object.entries(yearMap)
      .map(([year, value]) => ({ year: Number(year), value }))
      .sort((a, b) => b.year - a.year);

    const latestValue = yearMap[latestYear] || 0;
    if (latestValue > maxLatestValue) {
      maxBrand = brand;
      maxLatestValue = latestValue;
      maxBreakdown = breakdown;
    }
  }

  // Calculate growth from previous fiscal year (index semantics)
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

  for (const table of tables) {
    let query = `
      SELECT pm.category, p.document_date, SUM(p.retailing) AS total
      FROM ${table} p
      LEFT JOIN product_mapping pm ON p.p_code = pm.p_code
      LEFT JOIN store_mapping s ON p.customer_code = s.Old_Store_Code
      LEFT JOIN channel_mapping c ON s.customer_type = c.customer_type
      WHERE 1=1
    `;

    const { whereClause, params } = await buildWhereClauseForRawSQL(filters);
    query += whereClause;
    query += ` GROUP BY pm.category, p.document_date`;

    const results: any[] = await prisma.$queryRawUnsafe(query, ...params);

    for (const row of results) {
      const category = row.category || "Unknown";
      const fy = getFiscalYear(new Date(row.document_date));
      const value = Number(row.total);

      if (!breakdownMap[category]) breakdownMap[category] = {};
      breakdownMap[category][fy] = (breakdownMap[category][fy] || 0) + value;
    }
  }

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

  for (const table of tables) {
    let query = `
      SELECT c.base_channel, p.document_date, SUM(p.retailing) AS total
      FROM ${table} p
      LEFT JOIN store_mapping s ON p.customer_code = s.Old_Store_Code
      LEFT JOIN channel_mapping c ON s.customer_type = c.customer_type
      LEFT JOIN product_mapping pm ON p.p_code = pm.p_code
      WHERE 1=1
    `;

    const { whereClause, params } = await buildWhereClauseForRawSQL(filters);
    query += whereClause;
    query += ` GROUP BY c.base_channel, p.document_date`;

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
  const tables = resolveTables(source);
  const monthlyTotals: Record<string, Record<number, number>> = {};

  for (const table of tables) {
    let query = `
      SELECT p.document_date, SUM(p.retailing) AS total
      FROM ${table} p
      LEFT JOIN store_mapping s ON p.customer_code = s.Old_Store_Code
      LEFT JOIN channel_mapping c ON s.customer_type = c.customer_type
      LEFT JOIN product_mapping pm ON p.p_code = pm.p_code
      WHERE 1=1
    `;

    const { whereClause, params } = await buildWhereClauseForRawSQL(filters);
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

  // Format as array { year: fiscalYear, month, retailing }
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

  for (const table of tables) {
    let query = `
      SELECT pm.brandform, p.document_date, SUM(p.retailing) AS total
      FROM ${table} p
      LEFT JOIN store_mapping s ON p.customer_code = s.Old_Store_Code
      LEFT JOIN channel_mapping c ON s.customer_type = c.customer_type
      LEFT JOIN product_mapping pm ON p.p_code = pm.p_code
      WHERE 1=1
    `;

    const { whereClause, params } = await buildWhereClauseForRawSQL(filters);
    query += whereClause;
    query += ` GROUP BY pm.brandform, p.document_date`;

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

  return branches.map((b) => b.Branch).filter(Boolean);
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
    },
  });

  return {
    storeCode,
    storeName: store?.customer_name || "Unknown",
  };
}

export async function getStoreRetailingTrend(
  storeCode: string,
  source: string,
  year?: number[],
  month?: number[]
) {
  const tables = resolveTables(source);

  const hasYear = year?.length;
  const hasMonth = month?.length;

  const filters = [];
  if (hasYear)
    filters.push(`YEAR(document_date) IN (${year.map(() => "?").join(",")})`);
  if (hasMonth)
    filters.push(`MONTH(document_date) IN (${month.map(() => "?").join(",")})`);
  const filterClause = filters.length ? `AND ${filters.join(" AND ")}` : "";

  const unionQueryParts: string[] = [];
  const queryParams: any[] = [];

  for (const table of tables) {
    unionQueryParts.push(`
      SELECT 
        YEAR(document_date) AS year,
        MONTH(document_date) AS month,
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

export async function getStoreStats(
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

  if (!storeMapping) {
    throw new Error(`Store mapping not found for ${storeCode}`);
  }

  const yearFilter = year?.length
    ? `AND YEAR(document_date) IN (${year.map(() => "?").join(",")})`
    : "";
  const monthFilter = month?.length
    ? `AND MONTH(document_date) IN (${month.map(() => "?").join(",")})`
    : "";

  const filterParams = [...(year ?? []), ...(month ?? [])];
  const allParams = [storeCode, ...filterParams];

  // Month query
  const monthQuery = tables
    .map(
      (table) => `
        SELECT 
          YEAR(document_date) AS year, 
          MONTH(document_date) AS month, 
          SUM(retailing) AS total
        FROM ${table}
        WHERE customer_code = ? ${yearFilter} ${monthFilter}
        GROUP BY YEAR(document_date), MONTH(document_date)
      `
    )
    .join(" UNION ALL ");

  const brandQuery = tables
    .map(
      (table) => `
        SELECT 
          brand, 
          SUM(retailing) AS total
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

  const parsedMonthResults = Array.from(monthMap.entries()).map(
    ([key, total]) => {
      const [year, month] = key.split("-").map(Number);
      return { year, month, total };
    }
  );

  // Aggregate brand results
  const brandMap = new Map<string, number>();
  for (const r of brandResults) {
    brandMap.set(
      r.brand ?? "Unknown",
      (brandMap.get(r.brand) ?? 0) + Number(r.total)
    );
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
  };
}

export async function getCategoryRetailing(
  storeCode: string,
  source: string,
  year?: number[],
  month?: number[]
) {
  const tables = resolveTables(source);

  // Escape values for inline use — be cautious and ensure storeCode is safe
  const storeCodeEscaped = `'${storeCode}'`;

  const yearCondition = year?.length
    ? `AND YEAR(p.document_date) IN (${year.join(",")})`
    : "";

  const monthCondition = month?.length
    ? `AND MONTH(p.document_date) IN (${month.join(",")})`
    : "";

  const subqueries = tables.map((table) => {
    return `
      SELECT 
        pm.category AS category,
        YEAR(p.document_date) AS year,
        SUM(p.retailing) AS total
      FROM ${table} p
      INNER JOIN store_mapping sm ON p.customer_code = sm.Old_Store_Code
      INNER JOIN product_mapping pm ON p.p_code = pm.p_code
      WHERE sm.Old_Store_Code = ${storeCodeEscaped}
        ${yearCondition}
        ${monthCondition}
      GROUP BY pm.category, YEAR(p.document_date)
    `;
  });

  const combinedQuery = subqueries.join(" UNION ALL");

  // No params used now, because everything is already interpolated
  const rawResults = await prisma.$queryRawUnsafe<any[]>(combinedQuery);

  const categoryMap = new Map<
    string,
    { total: number; yearWise: Map<number, number> }
  >();

  for (const row of rawResults) {
    const category = row.category ?? "Unknown";
    const year = Number(row.year);
    const total = Number(row.total);

    let entry = categoryMap.get(category);
    if (!entry) {
      entry = { total: 0, yearWise: new Map() };
      categoryMap.set(category, entry);
    }

    entry.total += total;
    entry.yearWise.set(year, (entry.yearWise.get(year) ?? 0) + total);
  }

  return Array.from(categoryMap.entries())
    .map(([category, data]) => ({
      category,
      retailing: data.total,
      yearWise: Array.from(data.yearWise.entries()).map(([year, value]) => ({
        year,
        value,
      })),
    }))
    .sort((a, b) => b.retailing - a.retailing);
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
  page,
  pageSize,
  countOnly = false,
}: TopStoresQueryParams): Promise<{ query: string; values: any[] }> {
  const tables = resolveTables(source);

  // Get list of distinct months
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

  // Build month conditions and values
  const monthCondition = monthsValues
    .map(() => `DATE_FORMAT(p.document_date, '%Y-%m') = ?`)
    .join(" OR ");
  const monthConditionClause = `(${monthCondition})`;

  // Filters
  const filters: string[] = [];
  const dynamicValues: any[] = [];

  if (zm) {
    filters.push("sm.ZM = ?");
    dynamicValues.push(zm);
  }
  if (rsm) {
    filters.push("sm.RSM = ?");
    dynamicValues.push(rsm);
  }
  if (asm) {
    filters.push("sm.ASM = ?");
    dynamicValues.push(asm);
  }
  if (category) {
    filters.push("pm.category = ?");
    dynamicValues.push(category);
  }
  if (branch) {
    filters.push("sm.Branch = ?");
    dynamicValues.push(branch);
  }
  if (baseChannel) {
    filters.push("cm.base_channel = ?");
    dynamicValues.push(baseChannel);
  }
  if (brand) {
    filters.push("pm.brand = ?");
    dynamicValues.push(brand);
  }

  const filterClause = filters.length ? `AND ${filters.join(" AND ")}` : "";

  // JOINs
  const joins = `
    LEFT JOIN store_mapping sm ON p.customer_code = sm.Old_Store_Code
    ${
      baseChannel
        ? "LEFT JOIN channel_mapping cm ON sm.customer_type = cm.customer_type"
        : ""
    }
    LEFT JOIN product_mapping pm ON p.p_code = pm.p_code
  `;

  // Build subqueries
  const subQueries = tables
    .map(
      (table) => `
    SELECT
      p.customer_code,
      MAX(sm.customer_name) AS store_name,
      sm.Branch AS branch_name,
      SUM(p.retailing) AS total_retailing
    FROM ${table} p
    ${joins}
    WHERE ${monthConditionClause} ${filterClause}
    GROUP BY p.customer_code, sm.Branch
  `
    )
    .join(" UNION ALL ");

  // Final CTE
  const topStoresCTE = `
    WITH ranked_stores AS (
      SELECT
        customer_code,
        store_name,
        branch_name,
        SUM(total_retailing) AS total_retailing,
        ROUND(SUM(total_retailing) / ?, 2) AS avg_retailing
      FROM (${subQueries}) combined
      GROUP BY customer_code, store_name, branch_name
      ORDER BY avg_retailing DESC
      LIMIT 100
    )
  `;

  const totalTables = tables.length;
  const repeatedValues = Array(totalTables)
    .fill([...monthsValues, ...dynamicValues])
    .flat();

  const allValues = [
    monthsValues.length, // For avg_retailing divisor
    ...repeatedValues, // For all subqueries
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

  const paginatedQuery = `
    ${topStoresCTE}
    SELECT
      customer_code AS store_code,
      store_name,
      branch_name,
      avg_retailing AS average_retailing
    FROM ranked_stores
    ORDER BY avg_retailing DESC
    LIMIT ?
    OFFSET ?
  `;

  return {
    query: paginatedQuery,
    values: [...allValues, pageSize, page * pageSize],
  };
}
