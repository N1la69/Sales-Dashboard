/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "./utils";

// ========= Utility & Helper Functions =========
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

export async function getStoreRetailingTrend(storeCode: string) {
  const results = await prisma.$queryRawUnsafe<
    { year: number; month: number; total: number }[]
  >(
    `
    SELECT 
      YEAR(document_date) as year, 
      MONTH(document_date) as month, 
      SUM(retailing) as total
    FROM psr_data
    WHERE customer_code = ?
    GROUP BY year, month
    ORDER BY year, month
    `,
    storeCode
  );

  return results.map((r) => ({
    year: parseInt(String(r.year), 10),
    month: parseInt(String(r.month), 10),
    retailing: Number(r.total),
  }));
}
