/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAllBranches,
  getCategoryRetailing,
  getFiscalYear,
  getHighestRetailingBranch,
  getHighestRetailingBrand,
  getMonthlyRetailingTrend,
  getRetailingBreakdown,
  getRetailingByBaseChannel,
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

      // 1) If a date range is provided, use its fiscal-year span (and drop zero totals)
      if (filters?.StartDate && filters?.EndDate) {
        const startFiscalYear = getFiscalYear(new Date(filters.StartDate));
        const endFiscalYear = getFiscalYear(new Date(filters.EndDate));

        for (let fy = startFiscalYear; fy <= endFiscalYear; fy++) {
          const value = await getRetailingWithRawSQL(
            { ...filters, FiscalYear: [fy], FiscalMonth: undefined },
            source
          );
          if (value > 0) breakdown.push({ year: fy, value });
        }
      }
      // 2) If explicit FiscalYear(s) provided, use them (and drop zero totals)
      else if (filters?.FiscalYear?.length) {
        for (const fy of filters.FiscalYear) {
          const value = await getRetailingWithRawSQL(
            { ...filters, FiscalYear: [fy], FiscalMonth: undefined },
            source
          );
          if (value > 0) breakdown.push({ year: fy, value });
        }
      }
      // 3) No years given -> choose the last TWO fiscal years that actually have data
      else {
        const currentFY = getFiscalYear(new Date());
        const collected: { year: number; value: number }[] = [];

        // look back up to 6 FYs (safety) and pick the first two that have > 0
        for (let back = 0; back < 6 && collected.length < 2; back++) {
          const fy = currentFY - back;
          const value = await getRetailingWithRawSQL(
            { ...filters, FiscalYear: [fy], FiscalMonth: undefined },
            source
          );
          if (value > 0) collected.push({ year: fy, value });
        }

        breakdown.push(...collected);
      }

      // sort newest FY first (e.g., 2024 before 2023)
      breakdown.sort((a, b) => b.year - a.year);

      // compute growth between the top two years, if available
      let growth: number | null = null;
      if (breakdown.length >= 2 && breakdown[1].value > 0) {
        const [curr, prev] = breakdown; // curr is latest due to sort
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
    retailingByBaseChannel: async (_: any, { filters, source }: any) => {
      return await getRetailingByBaseChannel(filters, source);
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
      }: {
        source: string;
        months: number;
        zm?: string;
        rsm?: string;
        asm?: string;
        category?: string;
        branch?: string;
        baseChannel?: string;
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
        });

        const stores = await prisma.$queryRawUnsafe(query, ...values);

        const { query: countQuery, values: countValues } =
          await getTopStoresQuery({
            source,
            months,
            zm,
            rsm,
            asm,
            category,
            branch,
            baseChannel,
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
        rsm,
        asm,
        category,
        branch,
        baseChannel,
        brand,
        startDate,
        endDate,
      }: {
        source: string;
        months: number;
        zm?: string;
        rsm?: string;
        asm?: string;
        category?: string;
        branch?: string;
        baseChannel?: string;
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
          rsm,
          asm,
          category,
          branch,
          baseChannel,
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
