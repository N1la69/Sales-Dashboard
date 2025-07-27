/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addInClause,
  getAllBranches,
  getHighestRetailingBranch,
  getHighestRetailingBrand,
  getMonthlyRetailingTrend,
  getRetailingByBroadChannel,
  getRetailingByCategory,
  getStoreDetails,
  getStoreRetailingTrend,
  getStoreStats,
  getTopBrandforms,
  getTopStoresQuery,
  mergeCustomerCodes,
  mergeCustomerTypes,
  resolveTables,
  suggestStores,
} from "@/lib/helpers";
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
    highestRetailingBranch: async (_: any, { filters, source }: any) => {
      return await getHighestRetailingBranch(filters, source);
    },
    highestRetailingBrand: async (_: any, { filters, source }: any) => {
      return await getHighestRetailingBrand(filters, source);
    },
    retailingByCategory: async (_: any, { filters, source }: any) => {
      return await getRetailingByCategory(filters, source);
    },
    retailingByBroadChannel: async (_: any, { filters, source }: any) => {
      return await getRetailingByBroadChannel(filters, source);
    },
    monthlyRetailingTrend: async (_: any, { filters, source }: any) => {
      return await getMonthlyRetailingTrend(filters, source);
    },
    topBrandforms: async (_: any, { filters, source }: any) => {
      return await getTopBrandforms(filters, source);
    },

    // STORE
    allBranches: async () => {
      return await getAllBranches();
    },
    suggestStores: async (
      _: any,
      { branch, query }: { branch?: string; query: string }
    ) => {
      return await suggestStores(branch || null, query);
    },
    storeRetailingTrend: async (
      _: any,
      {
        storeCode,
        source,
        year,
        month,
      }: {
        storeCode: string;
        source: string;
        year?: number[];
        month?: number[];
      }
    ) => {
      return await getStoreRetailingTrend(storeCode, source, year, month);
    },
    getStoreStats: async (
      _: any,
      {
        storeCode,
        source,
        year,
        month,
      }: {
        storeCode: string;
        source: string;
        year?: number[];
        month?: number[];
      }
    ) => {
      return await getStoreStats(storeCode, source, year, month);
    },
    getStoreDetails: async (
      _: any,
      { storeCode, source }: { storeCode: string; source: string }
    ) => {
      return await getStoreDetails(storeCode, source);
    },
    topStores: async (
      _: any,
      {
        source,
        months,
        zm,
        sm,
        be,
        category,
        branch,
        broadChannel,
        startDate,
        endDate,
        page,
        pageSize,
      }: {
        source: string;
        months: number;
        zm?: string;
        sm?: string;
        be?: string;
        category?: string;
        branch?: string;
        broadChannel?: string;
        startDate?: string;
        endDate?: string;
        page: number;
        pageSize: number;
      }
    ) => {
      try {
        const { query, values } = await getTopStoresQuery({
          source,
          months,
          zm,
          sm,
          be,
          category,
          branch,
          broadChannel,
          startDate,
          endDate,
          page,
          pageSize,
        });

        const stores = await prisma.$queryRawUnsafe(query, ...values);

        const { query: countQuery, values: countValues } =
          await getTopStoresQuery({
            source,
            months,
            zm,
            sm,
            be,
            category,
            branch,
            broadChannel,
            startDate,
            endDate,
            page: 0,
            pageSize: 0,
            countOnly: true,
          });

        const countResult: any = await prisma.$queryRawUnsafe(
          countQuery,
          ...countValues
        );
        const totalCount = parseInt(countResult[0]?.count ?? "0", 10);

        return {
          totalCount,
          stores,
        };
      } catch (error) {
        console.error("Error fetching top stores:", error);
        throw new Error("Failed to fetch top stores");
      }
    },
    downloadTopStores: async (
      _: any,
      {
        source,
        months = 3,
        zm,
        sm,
        be,
        category,
      }: {
        source: string;
        months: number;
        zm?: string;
        sm?: string;
        be?: string;
        category?: string;
      }
    ) => {
      try {
        const { query, values } = await getTopStoresQuery({
          source,
          months,
          zm,
          sm,
          be,
          category,
          page: 0,
          pageSize: 100, // Always fetch all top 100
        });

        const stores = await prisma.$queryRawUnsafe(query, ...values);
        return stores;
      } catch (error) {
        console.error("Error downloading top stores:", error);
        throw new Error("Failed to download top stores");
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
