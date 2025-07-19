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
