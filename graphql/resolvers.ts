/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAllBranches,
  getCategoryRetailing,
  getHighestRetailingBranch,
  getHighestRetailingBrand,
  getMonthlyRetailingTrend,
  getRetailingBreakdown,
  getRetailingByBroadChannel,
  getRetailingByCategory,
  getRetailingWithRawSQL,
  getStoreDetails,
  getStoreRetailingTrend,
  getStoreStats,
  getTopBrandforms,
  getTopStoresQuery,
  suggestStores,
} from "@/lib/helpers";
import prisma from "@/lib/utils";

export const resolvers = {
  Query: {
    // Drill-down logic
    retailingBreakdown: async (
      _: any,
      { level, parent, filters, source }: any
    ) => {
      return await getRetailingBreakdown(level, parent, filters, source);
    },

    //DASHBOARD
    retailingStats: async (_: any, { filters, source }: any) => {
      const breakdown: { year: number; value: number }[] = [];

      if (filters?.StartDate && filters?.EndDate) {
        const startYear = new Date(filters.StartDate).getFullYear();
        const endYear = new Date(filters.EndDate).getFullYear();
        const years = Array.from(
          { length: endYear - startYear + 1 },
          (_, i) => startYear + i
        );

        for (const year of years) {
          const value = await getRetailingWithRawSQL(
            { ...filters, Year: [year], Month: undefined },
            source
          );
          breakdown.push({ year, value });
        }
      } else {
        const years = filters?.Year?.length ? filters.Year : [2023, 2024];
        for (const year of years) {
          const value = await getRetailingWithRawSQL(
            { ...filters, Year: [year] },
            source
          );
          breakdown.push({ year, value });
        }
      }

      let growth = null;
      if (breakdown.length === 2 && breakdown[0].value && breakdown[1].value) {
        const [prev, curr] = breakdown.sort((a, b) => a.year - b.year);
        growth = (curr.value / prev.value) * 100;
      }

      return { breakdown, growth };
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
    getStoreDetails: async (_: any, { storeCode }: { storeCode: string }) => {
      return await getStoreDetails(storeCode);
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
