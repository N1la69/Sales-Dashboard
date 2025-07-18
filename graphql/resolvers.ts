/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/utils";

export const resolvers = {
  Query: {
    totalRetailing: async (_: any, { filters }: any) => {
      if (filters.ZM) {
        return await getRetailingWithZM(filters);
      } else {
        return await getRetailingWithPrisma(filters);
      }
    },
  },
};

// ========= Raw SQL for ZM =========
async function getRetailingWithZM(filters: any): Promise<number> {
  let query = `
    SELECT SUM(p.retailing) AS total
    FROM psr_data p
    LEFT JOIN store_mapping s ON p.customer_code = s.Old_Store_Code
    LEFT JOIN channel_mapping c ON p.customer_type = c.customer_type
    WHERE 1=1
  `;
  const params: any[] = [];

  if (filters.ZM) {
    query += ` AND s.ZM = ?`;
    params.push(filters.ZM);
  }

  if (filters.Year) {
    query += ` AND YEAR(p.document_date) = ?`;
    params.push(filters.Year);
  }

  if (filters.Month) {
    query += ` AND MONTH(p.document_date) = ?`;
    params.push(filters.Month);
  }

  if (filters.Category) {
    query += ` AND p.category = ?`;
    params.push(filters.Category);
  }

  if (filters.Brand) {
    query += ` AND p.brand = ?`;
    params.push(filters.Brand);
  }

  if (filters.Brandform) {
    query += ` AND p.brandform = ?`;
    params.push(filters.Brandform);
  }

  if (filters.Branch) {
    query += ` AND s.New_Branch = ?`;
    params.push(filters.Branch);
  }

  if (filters.SM) {
    query += ` AND s.SM = ?`;
    params.push(filters.SM);
  }

  if (filters.BE) {
    query += ` AND s.BE = ?`;
    params.push(filters.BE);
  }

  if (filters.Channel) {
    query += ` AND c.channel = ?`;
    params.push(filters.Channel);
  }

  if (filters.BroadChannel) {
    query += ` AND c.broad_channel = ?`;
    params.push(filters.BroadChannel);
  }

  if (filters.ShortChannel) {
    query += ` AND c.short_channel = ?`;
    params.push(filters.ShortChannel);
  }

  const result: any[] = await prisma.$queryRawUnsafe(query, ...params);
  return result[0]?.total || 0;
}

// ========= Prisma for other filters =========
async function getRetailingWithPrisma(filters: any): Promise<number> {
  const whereClause: any = {};

  if (filters.Year) {
    whereClause.document_date = {
      gte: new Date(`${filters.Year}-01-01`),
      lte: new Date(`${filters.Year}-12-31`),
    };
  }

  if (filters.Month) {
    const month = parseInt(filters.Month, 10);
    whereClause.document_date = whereClause.document_date || {};
    whereClause.document_date.gte = new Date(
      `${filters.Year || new Date().getFullYear()}-${month
        .toString()
        .padStart(2, "0")}-01`
    );
    whereClause.document_date.lte = new Date(
      `${filters.Year || new Date().getFullYear()}-${month
        .toString()
        .padStart(2, "0")}-31`
    );
  }

  if (filters.Category) whereClause.category = filters.Category;
  if (filters.Brand) whereClause.brand = filters.Brand;
  if (filters.Brandform) whereClause.brandform = filters.Brandform;

  let customerCodes: string[] = [];

  if (filters.Branch) {
    const codes = await getStoreCodesByFilter("New_Branch", filters.Branch);
    customerCodes = mergeFilterResults(customerCodes, codes);
  }
  if (filters.SM) {
    const codes = await getStoreCodesByFilter("SM", filters.SM);
    customerCodes = mergeFilterResults(customerCodes, codes);
  }
  if (filters.BE) {
    const codes = await getStoreCodesByFilter("BE", filters.BE);
    customerCodes = mergeFilterResults(customerCodes, codes);
  }

  if (customerCodes.length) {
    whereClause.customer_code = { in: customerCodes };
  }

  let customerTypes: string[] = [];
  if (filters.Channel) {
    const types = await getCustomerTypesByChannelFilter(
      "channel",
      filters.Channel
    );
    customerTypes = mergeFilterResults(customerTypes, types);
  }
  if (filters.BroadChannel) {
    const types = await getCustomerTypesByChannelFilter(
      "broad_channel",
      filters.BroadChannel
    );
    customerTypes = mergeFilterResults(customerTypes, types);
  }
  if (filters.ShortChannel) {
    const types = await getCustomerTypesByChannelFilter(
      "short_channel",
      filters.ShortChannel
    );
    customerTypes = mergeFilterResults(customerTypes, types);
  }

  if (customerTypes.length) {
    whereClause.customer_type = { in: customerTypes };
  }

  console.log("WHERE CLAUSE (Prisma):", JSON.stringify(whereClause, null, 2));

  const result = await prisma.psr_data.aggregate({
    _sum: { retailing: true },
    where: whereClause,
  });

  return result._sum.retailing ? Number(result._sum.retailing.toString()) : 0;
}

// Helper to fetch store codes from store_mapping
async function getStoreCodesByFilter(
  column: string,
  value: string
): Promise<string[]> {
  const stores = await prisma.store_mapping.findMany({
    where: { [column]: value },
    select: { Old_Store_Code: true },
  });

  return stores.map((store) => store.Old_Store_Code);
}

// Helper to fetch customer types from channel_mapping
async function getCustomerTypesByChannelFilter(
  column: string,
  value: string
): Promise<string[]> {
  const mappings = await prisma.channel_mapping.findMany({
    where: { [column]: value },
    select: { customer_type: true },
  });

  return mappings.map((map) => map.customer_type);
}

function mergeFilterResults(existing: string[], incoming: string[]): string[] {
  if (existing.length === 0) return incoming;
  return existing.filter((item) => incoming.includes(item));
}
