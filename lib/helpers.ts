/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "./utils";

// ========= Utility & Helper Functions =========
interface TopStoresQueryParams {
  source: string;
  months: number;
  zm?: string;
  sm?: string;
  be?: string;
  category?: string;
  page: number;
  pageSize: number;
  countOnly?: boolean;
}

export function resolveTables(
  source: string
): Array<"psr_data" | "psr_data_temp"> {
  if (source === "main") return ["psr_data"];
  if (source === "temp") return ["psr_data_temp"];
  return ["psr_data", "psr_data_temp"]; // combined
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

export async function mergeCustomerCodes(
  existing: string[],
  column: string,
  values: string[]
) {
  const codes = await getStoreCodesByFilter(column, values);
  return mergeFilterResults(existing, codes);
}

export async function mergeCustomerTypes(
  existing: string[],
  column: string,
  values: string[]
) {
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

export async function buildWhereClauseForRawSQL(filters: any) {
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
  addInClause(filters.Branch, "s.New_Branch");
  addInClause(filters.SM, "s.SM");
  addInClause(filters.BE, "s.BE");

  // Date filters
  addInClause(filters.Year, "YEAR(p.document_date)");
  addInClause(filters.Month, "MONTH(p.document_date)");

  // PSR filters
  addInClause(filters.Category, "p.category");
  addInClause(filters.Brand, "p.brand");
  addInClause(filters.Brandform, "p.brandform");

  // Channel filters
  addInClause(filters.Channel, "c.channel");
  addInClause(filters.BroadChannel, "c.broad_channel");
  addInClause(filters.ShortChannel, "c.short_channel");

  return { whereClause, params };
}

export async function getHighestRetailingBranch(filters: any, source: string) {
  const tables = resolveTables(source);
  const branchTotals: Record<string, number> = {};

  for (const table of tables) {
    let query = `
      SELECT s.New_Branch AS branch, SUM(p.retailing) AS total
      FROM ${table} p
      LEFT JOIN store_mapping s ON p.customer_code = s.Old_Store_Code
      LEFT JOIN channel_mapping c ON p.customer_type = c.customer_type
      WHERE 1=1
    `;

    const { whereClause, params } = await buildWhereClauseForRawSQL(filters);
    query += whereClause;
    query += ` GROUP BY s.New_Branch`;

    const results: any[] = await prisma.$queryRawUnsafe(query, ...params);

    for (const row of results) {
      const branch = row.branch || "Unknown";
      const retailing = Number(row.total);
      branchTotals[branch] = (branchTotals[branch] || 0) + retailing;
    }
  }

  let maxBranch = "";
  let maxRetailing = 0;

  for (const [branch, total] of Object.entries(branchTotals)) {
    if (total > maxRetailing) {
      maxRetailing = total;
      maxBranch = branch;
    }
  }

  return {
    branch: maxBranch,
    retailing: maxRetailing,
  };
}

export async function getHighestRetailingBrand(filters: any, source: string) {
  const tables = resolveTables(source);
  const brandTotals: Record<string, number> = {};

  for (const table of tables) {
    let query = `
      SELECT p.brand AS brand, SUM(p.retailing) AS total
      FROM ${table} p
      LEFT JOIN store_mapping s ON p.customer_code = s.Old_Store_Code
      LEFT JOIN channel_mapping c ON p.customer_type = c.customer_type
      WHERE 1=1
    `;

    const { whereClause, params } = await buildWhereClauseForRawSQL(filters);
    query += whereClause;
    query += ` GROUP BY p.brand`;

    const results: any[] = await prisma.$queryRawUnsafe(query, ...params);

    for (const row of results) {
      const brand = row.brand || "Unknown";
      const retailing = Number(row.total);
      brandTotals[brand] = (brandTotals[brand] || 0) + retailing;
    }
  }

  let maxBrand = "";
  let maxRetailing = 0;

  for (const [brand, total] of Object.entries(brandTotals)) {
    if (total > maxRetailing) {
      maxRetailing = total;
      maxBrand = brand;
    }
  }

  return {
    brand: maxBrand,
    retailing: maxRetailing,
  };
}

export async function getRetailingByCategory(filters: any, source: string) {
  const tables = resolveTables(source);
  const categoryTotals: Record<string, number> = {};

  for (const table of tables) {
    let query = `
      SELECT p.category, SUM(p.retailing) AS total
      FROM ${table} p
      LEFT JOIN store_mapping s ON p.customer_code = s.Old_Store_Code
      LEFT JOIN channel_mapping c ON p.customer_type = c.customer_type
      WHERE 1=1
    `;

    const { whereClause, params } = await buildWhereClauseForRawSQL(filters);
    query += whereClause;
    query += ` GROUP BY p.category`;

    const results: any[] = await prisma.$queryRawUnsafe(query, ...params);

    for (const row of results) {
      categoryTotals[row.category] =
        (categoryTotals[row.category] || 0) + Number(row.total);
    }
  }

  return Object.entries(categoryTotals).map(([category, retailing]) => ({
    category,
    retailing,
  }));
}

export async function getRetailingByBroadChannel(filters: any, source: string) {
  const tables = resolveTables(source);
  const broadChannelTotals: Record<string, number> = {};

  for (const table of tables) {
    let query = `
      SELECT c.broad_channel, SUM(p.retailing) AS total
      FROM ${table} p
      LEFT JOIN store_mapping s ON p.customer_code = s.Old_Store_Code
      LEFT JOIN channel_mapping c ON p.customer_type = c.customer_type
      WHERE 1=1
    `;

    const { whereClause, params } = await buildWhereClauseForRawSQL(filters);
    query += whereClause;
    query += ` GROUP BY c.broad_channel`;

    const results: any[] = await prisma.$queryRawUnsafe(query, ...params);

    for (const row of results) {
      const broad_channel = row.broad_channel || "Unknown";
      broadChannelTotals[broad_channel] =
        (broadChannelTotals[broad_channel] || 0) + Number(row.total);
    }
  }

  return Object.entries(broadChannelTotals).map(
    ([broad_channel, retailing]) => ({
      broad_channel,
      retailing,
    })
  );
}

export async function getMonthlyRetailingTrend(filters: any, source: string) {
  const tables = resolveTables(source);
  const monthlyTotals: Record<string, Record<number, number>> = {};

  for (const table of tables) {
    let query = `
      SELECT YEAR(p.document_date) AS year, MONTH(p.document_date) AS month, SUM(p.retailing) AS total
      FROM ${table} p
      LEFT JOIN store_mapping s ON p.customer_code = s.Old_Store_Code
      LEFT JOIN channel_mapping c ON p.customer_type = c.customer_type
      WHERE 1=1
    `;

    const { whereClause, params } = await buildWhereClauseForRawSQL(filters);
    query += whereClause;
    query += ` GROUP BY YEAR(p.document_date), MONTH(p.document_date) ORDER BY year, month`;

    const results: any[] = await prisma.$queryRawUnsafe(query, ...params);

    for (const row of results) {
      const year = String(row.year);
      const month = Number(row.month);
      const retailing = Number(row.total);

      if (!monthlyTotals[year]) {
        monthlyTotals[year] = {};
      }

      monthlyTotals[year][month] =
        (monthlyTotals[year][month] || 0) + retailing;
    }
  }

  // Format as array of { year, month, retailing }
  const trendData = [];
  for (const year of Object.keys(monthlyTotals)) {
    for (const month of Object.keys(monthlyTotals[year])) {
      trendData.push({
        year,
        month: Number(month),
        retailing: monthlyTotals[year][Number(month)],
      });
    }
  }

  return trendData;
}

export async function getTopBrandforms(filters: any, source: string) {
  const tables = resolveTables(source);
  const brandformTotals: Record<string, number> = {};

  for (const table of tables) {
    let query = `
      SELECT p.brandform, SUM(p.retailing) AS total
      FROM ${table} p
      LEFT JOIN store_mapping s ON p.customer_code = s.Old_Store_Code
      LEFT JOIN channel_mapping c ON p.customer_type = c.customer_type
      WHERE 1=1
    `;

    const { whereClause, params } = await buildWhereClauseForRawSQL(filters);
    query += whereClause;
    query += ` GROUP BY p.brandform`;

    const results: any[] = await prisma.$queryRawUnsafe(query, ...params);

    for (const row of results) {
      const brandform = row.brandform || "Unknown";
      brandformTotals[brandform] =
        (brandformTotals[brandform] || 0) + Number(row.total);
    }
  }

  // Sort descending by retailing and pick top 10
  const topBrandforms = Object.entries(brandformTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([brandform, retailing]) => ({
      brandform,
      retailing,
    }));

  return topBrandforms;
}

// STORE page
export async function getAllBranches(): Promise<string[]> {
  const branches = await prisma.store_mapping.findMany({
    distinct: ["New_Branch"],
    select: { New_Branch: true },
  });

  return branches.map((b) => b.New_Branch).filter(Boolean);
}

export async function suggestStores(branch: string | null, query: string) {
  const whereClause: any = {
    Old_Store_Code: {
      endsWith: query,
    },
  };

  if (branch) {
    whereClause.New_Branch = branch;
  }

  const stores = await prisma.store_mapping.findMany({
    where: whereClause,
    take: 10,
  });

  return stores;
}

export async function getStoreRetailingTrend(
  storeCode: string,
  source: string,
  year?: number[],
  month?: number[]
) {
  const tables = resolveTables(source);

  const conditions = [`customer_code = ?`];
  const params: any[] = [storeCode];

  if (year && year.length > 0) {
    conditions.push(
      `YEAR(document_date) IN (${year.map(() => "?").join(",")})`
    );
    params.push(...year);
  }

  if (month && month.length > 0) {
    conditions.push(
      `MONTH(document_date) IN (${month.map(() => "?").join(",")})`
    );
    params.push(...month);
  }

  const conditionString =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const unionQuery = tables
    .map((t) => `SELECT * FROM ${t}`)
    .join(" UNION ALL ");

  const query = `
    SELECT 
      YEAR(document_date) as year, 
      MONTH(document_date) as month, 
      SUM(retailing) as total
    FROM (${unionQuery}) AS combined
    ${conditionString}
    GROUP BY year, month
    ORDER BY year, month
  `;

  const results = await prisma.$queryRawUnsafe<
    { year: number; month: number; total: number | bigint }[]
  >(query, ...params);

  return results.map((r) => ({
    year: Number(r.year),
    month: Number(r.month),
    retailing:
      typeof r.total === "bigint"
        ? Number(r.total.toString())
        : Number(r.total),
  }));
}

export async function getStoreDetails(storeCode: string, source: string) {
  const tables = resolveTables(source);

  for (const table of tables) {
    const result = await prisma.$queryRawUnsafe<any[]>(
      `
      SELECT customer_name 
      FROM ${table}
      WHERE customer_code = ?
      LIMIT 1
    `,
      storeCode
    );

    if (result.length > 0) {
      return {
        storeCode,
        storeName: result[0].customer_name || "Unknown",
      };
    }
  }

  // If not found in any table
  return {
    storeCode,
    storeName: "Unknown",
  };
}

export async function getStoreStats(
  storeCode: string,
  source: string,
  year?: number[],
  month?: number[]
) {
  const tables = resolveTables(source);

  const yearFilter = year?.length
    ? `AND YEAR(document_date) IN (${year.join(",")})`
    : "";
  const monthFilter = month?.length
    ? `AND MONTH(document_date) IN (${month.join(",")})`
    : "";

  const monthQueries = tables.map(
    (table) => `
      SELECT YEAR(document_date) AS year, MONTH(document_date) AS month, SUM(retailing) AS total
      FROM ${table}
      WHERE customer_code = ? ${yearFilter} ${monthFilter}
      GROUP BY year, month
    `
  );

  const brandQueries = tables.map(
    (table) => `
      SELECT brand, SUM(retailing) AS total
      FROM ${table}
      WHERE customer_code = ? ${yearFilter} ${monthFilter}
      GROUP BY brand
    `
  );

  // Fetch months
  const monthResults = (
    await Promise.all(
      monthQueries.map((query) =>
        prisma.$queryRawUnsafe<any[]>(query, storeCode)
      )
    )
  ).flat();

  // Highest & Lowest Month
  const highestMonth = monthResults.reduce(
    (prev, curr) => ((prev?.total ?? 0) < curr.total ? curr : prev),
    null as any
  );

  const lowestMonth = monthResults.reduce(
    (prev, curr) => ((prev?.total ?? Infinity) > curr.total ? curr : prev),
    null as any
  );

  // Fetch brands
  const brandResults = (
    await Promise.all(
      brandQueries.map((query) =>
        prisma.$queryRawUnsafe<any[]>(query, storeCode)
      )
    )
  ).flat();

  // Highest & Lowest Brand
  const highestBrand = brandResults.reduce(
    (prev, curr) => ((prev?.total ?? 0) < curr.total ? curr : prev),
    null as any
  );

  const lowestBrand = brandResults.reduce(
    (prev, curr) => ((prev?.total ?? Infinity) > curr.total ? curr : prev),
    null as any
  );

  return {
    highestRetailingMonth: highestMonth
      ? {
          year: Number(highestMonth.year),
          month: Number(highestMonth.month),
          monthName: monthNumberToName(Number(highestMonth.month)),
          retailing: Number(highestMonth.total),
        }
      : null,
    lowestRetailingMonth: lowestMonth
      ? {
          year: Number(lowestMonth.year),
          month: Number(lowestMonth.month),
          monthName: monthNumberToName(Number(lowestMonth.month)),
          retailing: Number(lowestMonth.total),
        }
      : null,
    highestRetailingBrand: highestBrand
      ? {
          brand: highestBrand.brand,
          retailing: Number(highestBrand.total),
        }
      : null,
    lowestRetailingBrand: lowestBrand
      ? {
          brand: lowestBrand.brand,
          retailing: Number(lowestBrand.total),
        }
      : null,
  };
}

export const getTopStoresQuery = async ({
  source,
  months,
  zm,
  sm,
  be,
  category,
  page,
  pageSize,
  countOnly = false,
}: TopStoresQueryParams): Promise<{ query: string; values: any[] }> => {
  const values: any[] = [];
  const filters: string[] = [];

  const tables = resolveTables(source);

  // Get latest N months
  const dateQuery = `
    SELECT DISTINCT DATE_FORMAT(document_date, '%Y-%m') as ym
    FROM psr_data
    ORDER BY ym DESC
    LIMIT ?
  `;
  const dateRows: any[] = await prisma.$queryRawUnsafe(dateQuery, months);
  const latestMonths = dateRows.map((r) => r.ym);
  if (latestMonths.length === 0) throw new Error("No recent months found.");

  // Dynamic Filters
  if (zm) filters.push("sm.ZM = ?");
  if (sm) filters.push("sm.SM = ?");
  if (be) filters.push("sm.BE = ?");
  if (category) filters.push("p.category = ?");

  values.push(...[zm, sm, be, category].filter(Boolean));

  const filterClause = filters.length ? `AND ${filters.join(" AND ")}` : "";
  const monthsCondition = latestMonths
    .map(() => `DATE_FORMAT(p.document_date, '%Y-%m') = ?`)
    .join(" OR ");
  const monthsValues = [...latestMonths];

  // Flatten values per table
  const baseValues = tables.flatMap(() => [...monthsValues, ...values]);

  // Subqueries per source
  const subQueries = tables
    .map(
      (table) => `
      SELECT
        p.customer_code,
        MAX(p.customer_name) AS store_name,
        SUM(p.retailing) AS total_retailing
      FROM ${table} p
      JOIN store_mapping sm ON p.customer_code = sm.Old_Store_Code
      WHERE (${monthsCondition}) ${filterClause}
      GROUP BY p.customer_code
    `
    )
    .join(" UNION ALL ");

  const topStoresCTE = `
    WITH ranked_stores AS (
      SELECT
        customer_code,
        store_name,
        SUM(total_retailing) AS total_retailing,
        ROUND(SUM(total_retailing) / ?, 2) AS avg_retailing
      FROM (${subQueries}) as combined
      GROUP BY customer_code, store_name
      ORDER BY avg_retailing DESC
      LIMIT 100
    )
  `;

  if (countOnly) {
    const countQuery = `
      ${topStoresCTE}
      SELECT COUNT(*) as count FROM ranked_stores
    `;
    return { query: countQuery, values: [months, ...baseValues] };
  }

  const paginatedQuery = `
    ${topStoresCTE}
    SELECT
      customer_code AS store_code,
      store_name,
      avg_retailing AS average_retailing
    FROM ranked_stores
    ORDER BY avg_retailing DESC
    LIMIT ?
    OFFSET ?
  `;

  return {
    query: paginatedQuery,
    values: [months, ...baseValues, pageSize, page * pageSize],
  };
};
