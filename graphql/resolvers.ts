/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addInClause,
  getAllBranches,
  getCategoryRetailing,
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
  resolveTables,
  suggestStores,
} from "@/lib/helpers";
import prisma from "@/lib/utils";

export const resolvers = {
  Query: {
    //DASHBOARD
    retailingStats: async (_: any, { filters, source }: any) => {
      const years = filters?.Year?.length ? filters.Year : [2023, 2024]; // Default to 2 years
      const breakdown: { year: number; value: number }[] = [];

      for (const year of years) {
        const value = filters.ZM?.length
          ? await getRetailingZM({ ...filters, Year: [year] }, source)
          : await getRetailingPrisma({ ...filters, Year: [year] }, source);
        breakdown.push({ year, value });
      }

      const total = breakdown.reduce((sum, y) => sum + y.value, 0);

      let growth = null;
      if (breakdown.length === 2 && breakdown[1].value && breakdown[0].value) {
        const [prev, curr] = breakdown.sort((a, b) => a.year - b.year);
        growth = (curr.value / prev.value) * 100;
      }

      return { total, breakdown, growth };
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
    getCategoryRetailing: async (
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
      return await getCategoryRetailing(storeCode, source, year, month);
    },
    getStoreDetails: async (
      _: any,
      { storeCode, source }: { storeCode: string; source: string }
    ) => {
      return await getStoreDetails(storeCode, source);
    },

    // RANKING
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
        brand,
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
        brand?: string;
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
          brand,
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
            brand,
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
        branch,
        broadChannel,
        brand,
        startDate,
        endDate,
      }: {
        source: string;
        months: number;
        zm?: string;
        sm?: string;
        be?: string;
        category?: string;
        branch?: string;
        broadChannel?: string;
        brand?: string;
        startDate?: string;
        endDate?: string;
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
          brand,
          startDate,
          endDate,
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
    LEFT JOIN channel_mapping c ON s.customer_type = c.customer_type
    LEFT JOIN product_mapping pm ON p.p_code = pm.p_code
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

  // PSR filters from product_mapping
  query = addInClause(query, params, filters.Category, "pm.category");
  query = addInClause(query, params, filters.Brand, "pm.brand");
  query = addInClause(query, params, filters.Brandform, "pm.brandform");

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

  // Date filtering
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

  // Join: p -> product_mapping
  if (filters.Category?.length) {
    whereClause.product_mapping = {
      category: { in: filters.Category },
    };
  }

  if (filters.Brand?.length) {
    whereClause.product_mapping = {
      ...(whereClause.product_mapping || {}),
      brand: { in: filters.Brand },
    };
  }

  if (filters.Brandform?.length) {
    whereClause.product_mapping = {
      ...(whereClause.product_mapping || {}),
      brandform: { in: filters.Brandform },
    };
  }

  // Join: p -> store_mapping
  if (
    filters.Branch?.length ||
    filters.SM?.length ||
    filters.BE?.length ||
    filters.ZM?.length
  ) {
    whereClause.store_mapping = {};

    if (filters.Branch?.length) {
      whereClause.store_mapping.New_Branch = { in: filters.Branch };
    }
    if (filters.SM?.length) {
      whereClause.store_mapping.SM = { in: filters.SM };
    }
    if (filters.BE?.length) {
      whereClause.store_mapping.BE = { in: filters.BE };
    }
    if (filters.ZM?.length) {
      whereClause.store_mapping.ZM = { in: filters.ZM };
    }
  }

  // Channel Mapping (via store_mapping.customer_type -> channel_mapping)
  if (
    filters.Channel?.length ||
    filters.BroadChannel?.length ||
    filters.ShortChannel?.length
  ) {
    whereClause.store_mapping = {
      ...(whereClause.store_mapping || {}),
      channel_mapping: {},
    };

    if (filters.Channel?.length) {
      whereClause.store_mapping.channel_mapping.channel = {
        in: filters.Channel,
      };
    }
    if (filters.BroadChannel?.length) {
      whereClause.store_mapping.channel_mapping.broad_channel = {
        in: filters.BroadChannel,
      };
    }
    if (filters.ShortChannel?.length) {
      whereClause.store_mapping.channel_mapping.short_channel = {
        in: filters.ShortChannel,
      };
    }
  }

  const result = await (prisma as any)[table].aggregate({
    _sum: { retailing: true },
    where: whereClause,
  });

  return result._sum.retailing ? Number(result._sum.retailing) : 0;
}
