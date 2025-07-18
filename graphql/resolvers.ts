/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/utils";

export const resolvers = {
  Query: {
    totalRetailing: async (_: any, { filters, source }: any) => {
      if (filters.ZM?.length) {
        return await getRetailingZM(filters, source);
      } else {
        return await getRetailingPrisma(filters, source);
      }
    },
  },
};

// ========= RAW SQL for ZM =========
async function getRetailingZM(filters: any, source: string): Promise<number> {
  const tables = resolveTables(source);

  let total = 0;
  for (const table of tables) {
    const subtotal = await getRetailingWithZM(table, filters);
    total += subtotal;
  }
  return total;
}

async function getRetailingWithZM(
  table: string,
  filters: any
): Promise<number> {
  let query = `
    SELECT SUM(p.retailing) AS total
    FROM ${table} p
    LEFT JOIN store_mapping s ON p.customer_code = s.Old_Store_Code
    LEFT JOIN channel_mapping c ON p.customer_type = c.customer_type
    WHERE 1=1
  `;
  const params: any[] = [];

  // Store filters
  query = addInClause(query, params, filters.ZM, "s.ZM");
  query = addInClause(query, params, filters.Branch, "s.New_Branch");
  query = addInClause(query, params, filters.SM, "s.SM");
  query = addInClause(query, params, filters.BE, "s.BE");

  // Date filters
  query = addInClause(query, params, filters.Year, "YEAR(p.document_date)");
  query = addInClause(query, params, filters.Month, "MONTH(p.document_date)");

  // PSR filters
  query = addInClause(query, params, filters.Category, "p.category");
  query = addInClause(query, params, filters.Brand, "p.brand");
  query = addInClause(query, params, filters.Brandform, "p.brandform");

  // Channel mapping
  query = addInClause(query, params, filters.Channel, "c.channel");
  query = addInClause(query, params, filters.BroadChannel, "c.broad_channel");
  query = addInClause(query, params, filters.ShortChannel, "c.short_channel");

  const result: any[] = await prisma.$queryRawUnsafe(query, ...params);
  const total = result[0]?.total;
  return total ? Number(total) : 0;
}

// ========= Prisma Query =========
async function getRetailingPrisma(
  filters: any,
  source: string
): Promise<number> {
  const tables = resolveTables(source);

  let total = 0;
  for (const table of tables) {
    const subtotal = await getRetailingWithPrisma(table, filters);
    total += subtotal;
  }
  return total;
}

async function getRetailingWithPrisma(
  table: "psr_data" | "psr_data_temp",
  filters: any
): Promise<number> {
  const whereClause: any = {};

  if (filters.Year && filters.Month?.length) {
    whereClause.OR = filters.Month.map((month: number) => ({
      document_date: {
        gte: new Date(
          `${filters.Year}-${month.toString().padStart(2, "0")}-01`
        ),
        lte: new Date(
          `${filters.Year}-${month.toString().padStart(2, "0")}-31`
        ),
      },
    }));
  } else if (filters.Year) {
    whereClause.document_date = {
      gte: new Date(`${filters.Year}-01-01`),
      lte: new Date(`${filters.Year}-12-31`),
    };
  } else if (filters.Month?.length) {
    const year = new Date().getFullYear();
    whereClause.OR = filters.Month.map((month: number) => ({
      document_date: {
        gte: new Date(`${year}-${month.toString().padStart(2, "0")}-01`),
        lte: new Date(`${year}-${month.toString().padStart(2, "0")}-31`),
      },
    }));
  }

  if (filters.Category?.length) whereClause.category = { in: filters.Category };
  if (filters.Brand?.length) whereClause.brand = { in: filters.Brand };
  if (filters.Brandform?.length)
    whereClause.brandform = { in: filters.Brandform };

  let customerCodes: string[] = [];
  if (filters.Branch?.length) {
    customerCodes = await mergeCustomerCodes(
      customerCodes,
      "New_Branch",
      filters.Branch
    );
  }
  if (filters.SM?.length) {
    customerCodes = await mergeCustomerCodes(customerCodes, "SM", filters.SM);
  }
  if (filters.BE?.length) {
    customerCodes = await mergeCustomerCodes(customerCodes, "BE", filters.BE);
  }
  if (customerCodes.length) {
    whereClause.customer_code = { in: customerCodes };
  }

  let customerTypes: string[] = [];
  if (filters.Channel?.length) {
    customerTypes = await mergeCustomerTypes(
      customerTypes,
      "channel",
      filters.Channel
    );
  }
  if (filters.BroadChannel?.length) {
    customerTypes = await mergeCustomerTypes(
      customerTypes,
      "broad_channel",
      filters.BroadChannel
    );
  }
  if (filters.ShortChannel?.length) {
    customerTypes = await mergeCustomerTypes(
      customerTypes,
      "short_channel",
      filters.ShortChannel
    );
  }
  if (customerTypes.length) {
    whereClause.customer_type = { in: customerTypes };
  }

  const result = await (prisma as any)[table].aggregate({
    _sum: { retailing: true },
    where: whereClause,
  });

  return result._sum.retailing ? Number(result._sum.retailing.toString()) : 0;
}

// ========= Utility & Helper Functions =========
function resolveTables(source: string): Array<"psr_data" | "psr_data_temp"> {
  if (source === "main") return ["psr_data"];
  if (source === "temp") return ["psr_data_temp"];
  return ["psr_data", "psr_data_temp"]; // combined
}

function addInClause(
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

async function mergeCustomerCodes(
  existing: string[],
  column: string,
  values: string[]
) {
  const codes = await getStoreCodesByFilter(column, values);
  return mergeFilterResults(existing, codes);
}

async function mergeCustomerTypes(
  existing: string[],
  column: string,
  values: string[]
) {
  const types = await getCustomerTypesByChannelFilter(column, values);
  return mergeFilterResults(existing, types);
}

async function getStoreCodesByFilter(
  column: string,
  values: string[]
): Promise<string[]> {
  const stores = await prisma.store_mapping.findMany({
    where: { [column]: { in: values } },
    select: { Old_Store_Code: true },
  });
  return stores.map((store) => store.Old_Store_Code);
}

async function getCustomerTypesByChannelFilter(
  column: string,
  values: string[]
): Promise<string[]> {
  const mappings = await prisma.channel_mapping.findMany({
    where: { [column]: { in: values } },
    select: { customer_type: true },
  });
  return mappings.map((map) => map.customer_type);
}

function mergeFilterResults(existing: string[], incoming: string[]): string[] {
  if (existing.length === 0) return incoming;
  return existing.filter((item) => incoming.includes(item));
}
