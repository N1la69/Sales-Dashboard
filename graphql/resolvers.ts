/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAllBranches,
  getCategoryRetailing,
  getHighestRetailingBranch,
  getHighestRetailingBrand,
  getLastStoreBills,
  getMonthlyRetailingTrend,
  getRetailingBreakdown,
  getRetailingByBaseChannel,
  getRetailingByCategory,
  getStoreDetails,
  getStoreGPStats,
  getStoreGPTrend,
  getStoreRetailingBreakdown,
  getStoreRetailingTrend,
  getStoreStats,
  getTopBrandforms,
  getTopStoresQuery,
  getTotalGP,
  getTotalRetailing,
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
    storeRetailingBreakdown: async (
      _: any,
      { level, parent, storeCode, source, year, month }: any
    ) => {
      return await getStoreRetailingBreakdown(
        level,
        parent,
        storeCode,
        source,
        year,
        month
      );
    },

    //DASHBOARD
    retailingStats: async (_: any, { filters, source }: any) => {
      return await getTotalRetailing(filters, source);
    },
    gpStats: async (_: any, { filters, source, gpType }: any) => {
      return await getTotalGP(filters, source, gpType);
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
    storeGPTrend: async (
      _: any,
      {
        storeCode,
        source,
        year,
        month,
        gpType = "p3m",
      }: {
        storeCode: string;
        source: string;
        year?: number[];
        month?: number[];
        gpType?: string;
      }
    ) => {
      return await getStoreGPTrend(storeCode, source, year, month, gpType);
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
    getStoreGPStats: async (
      _: any,
      {
        storeCode,
        source,
        year,
        month,
        gpType = "p3m",
      }: {
        storeCode: string;
        source: string;
        year?: number[];
        month?: number[];
        gpType?: string;
      }
    ) => {
      return await getStoreGPStats(storeCode, source, year, month, gpType);
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
    getLastStoreBills: async (
      _: any,
      {
        storeCode,
        source,
        year,
        month,
      }: {
        storeCode: string;
        source?: string;
        year?: number[];
        month?: number[];
      }
    ) => {
      return await getLastStoreBills(storeCode, source ?? "", year, month);
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
        shortChannel,
        channelDesc,
        brand,
        brandform,
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
        shortChannel?: string;
        channelDesc?: string;
        brand?: string;
        brandform?: string;
        startDate?: string;
        endDate?: string;
      }
    ) => {
      try {
        // 1. Get main data
        const { query, values } = await getTopStoresQuery({
          source,
          months,
          zm,
          rsm,
          asm,
          category,
          branch,
          baseChannel,
          shortChannel,
          channelDesc,
          brand,
          brandform,
          startDate,
          endDate,
        });

        const stores: any[] = await prisma.$queryRawUnsafe(query, ...values);

        // 2. Enrich with store names and channel_desc
        const storeCodes = stores.map((s) => s.store_code);
        let metaMap: Record<string, { name: string; channel_desc: string }> =
          {};

        if (storeCodes.length > 0) {
          const mappings = await prisma.store_mapping.findMany({
            where: { Old_Store_Code: { in: storeCodes } },
            select: {
              Old_Store_Code: true,
              customer_name: true,
              customer_type: true,
            },
          });

          const customerTypes = [
            ...new Set(
              mappings.map((m: { customer_type: any }) => m.customer_type)
            ),
          ];
          const channelMappings = await prisma.channel_mapping.findMany({
            where: { customer_type: { in: customerTypes } },
            select: { customer_type: true, channel_desc: true },
          });
          const channelMap = Object.fromEntries(
            channelMappings.map(
              (c: { customer_type: any; channel_desc: any }) => [
                c.customer_type,
                c.channel_desc,
              ]
            )
          );

          metaMap = Object.fromEntries(
            mappings.map(
              (m: {
                Old_Store_Code: any;
                customer_name: any;
                customer_type: string | number;
              }) => [
                m.Old_Store_Code,
                {
                  name: m.customer_name,
                  channel_desc: channelMap[m.customer_type] ?? null,
                },
              ]
            )
          );
        }

        const enrichedStores = stores.map((s) => ({
          ...s,
          store_name: metaMap[s.store_code]?.name ?? null,
          channel_desc: metaMap[s.store_code]?.channel_desc ?? null,
        }));

        // ✅ No need for count query anymore
        const totalCount = enrichedStores.length;

        return {
          totalCount,
          stores: enrichedStores,
        };
      } catch (error) {
        console.error("Error fetching top stores:", error);
        throw new Error("Failed to fetch top stores");
      }
    },
  },
};
