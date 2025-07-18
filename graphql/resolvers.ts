/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/utils";

export const resolvers = {
  Query: {
    totalRetailing: async (_: any, { filters }: any) => {
      if (filters.ZM?.length) {
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

  // Store mapping filters
  if (filters.ZM?.length) {
    query += ` AND s.ZM IN (${filters.ZM.map(() => "?").join(",")})`;
    params.push(...filters.ZM);
  }
  if (filters.Branch?.length) {
    query += ` AND s.New_Branch IN (${filters.Branch.map(() => "?").join(
      ","
    )})`;
    params.push(...filters.Branch);
  }
  if (filters.SM?.length) {
    query += ` AND s.SM IN (${filters.SM.map(() => "?").join(",")})`;
    params.push(...filters.SM);
  }
  if (filters.BE?.length) {
    query += ` AND s.BE IN (${filters.BE.map(() => "?").join(",")})`;
    params.push(...filters.BE);
  }

  // Date filters
  if (filters.Year?.length) {
    query += ` AND YEAR(p.document_date) IN (${filters.Year.map(() => "?").join(
      ","
    )})`;
    params.push(...filters.Year);
  }
  if (filters.Month?.length) {
    query += ` AND MONTH(p.document_date) IN (${filters.Month.map(
      () => "?"
    ).join(",")})`;
    params.push(...filters.Month);
  }

  // PSR data fields
  if (filters.Category?.length) {
    query += ` AND p.category IN (${filters.Category.map(() => "?").join(
      ","
    )})`;
    params.push(...filters.Category);
  }
  if (filters.Brand?.length) {
    query += ` AND p.brand IN (${filters.Brand.map(() => "?").join(",")})`;
    params.push(...filters.Brand);
  }
  if (filters.Brandform?.length) {
    query += ` AND p.brandform IN (${filters.Brandform.map(() => "?").join(
      ","
    )})`;
    params.push(...filters.Brandform);
  }

  // Channel mapping filters
  if (filters.Channel?.length) {
    query += ` AND c.channel IN (${filters.Channel.map(() => "?").join(",")})`;
    params.push(...filters.Channel);
  }
  if (filters.BroadChannel?.length) {
    query += ` AND c.broad_channel IN (${filters.BroadChannel.map(
      () => "?"
    ).join(",")})`;
    params.push(...filters.BroadChannel);
  }
  if (filters.ShortChannel?.length) {
    query += ` AND c.short_channel IN (${filters.ShortChannel.map(
      () => "?"
    ).join(",")})`;
    params.push(...filters.ShortChannel);
  }

  const result: any[] = await prisma.$queryRawUnsafe(query, ...params);
  return result[0]?.total || 0;
}

// ========= Prisma for other filters =========
async function getRetailingWithPrisma(filters: any): Promise<number> {
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
    const codes = await getStoreCodesByFilter("New_Branch", filters.Branch);
    customerCodes = mergeFilterResults(customerCodes, codes);
  }
  if (filters.SM?.length) {
    const codes = await getStoreCodesByFilter("SM", filters.SM);
    customerCodes = mergeFilterResults(customerCodes, codes);
  }
  if (filters.BE?.length) {
    const codes = await getStoreCodesByFilter("BE", filters.BE);
    customerCodes = mergeFilterResults(customerCodes, codes);
  }
  if (customerCodes.length) {
    whereClause.customer_code = { in: customerCodes };
  }

  let customerTypes: string[] = [];
  if (filters.Channel?.length) {
    const types = await getCustomerTypesByChannelFilter(
      "channel",
      filters.Channel
    );
    customerTypes = mergeFilterResults(customerTypes, types);
  }
  if (filters.BroadChannel?.length) {
    const types = await getCustomerTypesByChannelFilter(
      "broad_channel",
      filters.BroadChannel
    );
    customerTypes = mergeFilterResults(customerTypes, types);
  }
  if (filters.ShortChannel?.length) {
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

// ===== Helper Functions =====
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
