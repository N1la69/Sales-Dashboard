/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  buildWhereClauseForRawSQL,
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
  resolveTables,
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
      // Aggregate totals per fiscal end-year
      const yearTotals: Record<number, number> = {};
      const tables = resolveTables(source);

      for (const table of tables) {
        let query = `
      SELECT p.document_date, SUM(p.retailing) AS total
      FROM ${table} p
      LEFT JOIN store_mapping s ON p.customer_code = s.Old_Store_Code
      LEFT JOIN channel_mapping c ON s.customer_type = c.customer_type
      LEFT JOIN product_mapping pm ON p.p_code = pm.p_code
      WHERE 1=1
    `;

        // Keep your existing SQL filter builder (it may include Year/FiscalYear if UI sent one)
        const { whereClause, params } = await buildWhereClauseForRawSQL(
          filters
        );
        query += whereClause + ` GROUP BY p.document_date`;

        const results: any[] = await prisma.$queryRawUnsafe(query, ...params);

        for (const row of results) {
          const dt = row.document_date ? new Date(row.document_date) : null;
          if (!dt) continue;
          const fy = getFiscalYear(dt); // end-year convention
          const subtotal = Number(row.total || 0);
          yearTotals[fy] = (yearTotals[fy] || 0) + subtotal;
        }
      }

      // Decide which years to return, preserving previous behavior:
      // - if user explicitly requested years (or StartDate/EndDate) -> include those years (include zeros)
      // - otherwise -> return the latest two YEARS that have data (skip zeros)
      const explicitFYs =
        (filters?.FiscalYear?.length ? filters.FiscalYear : null) ??
        (filters?.Year?.length ? filters.Year : null) ??
        null;
      const isExplicit = Boolean(
        explicitFYs || (filters?.StartDate && filters?.EndDate)
      );

      // Helper: compute years from date range (inclusive)
      const yearsFromRange = (startISO: string, endISO: string) => {
        const startFY = getFiscalYear(new Date(startISO));
        const endFY = getFiscalYear(new Date(endISO));
        const out: number[] = [];
        for (let y = startFY; y <= endFY; y++) out.push(y);
        return out;
      };

      let yearsToReturn: number[] = [];

      if (isExplicit) {
        if (filters?.StartDate && filters?.EndDate) {
          yearsToReturn = yearsFromRange(filters.StartDate, filters.EndDate);
        } else if (explicitFYs) {
          yearsToReturn = explicitFYs.slice();
        }
      } else {
        // pick latest two fiscal years that actually have data (desc)
        const presentYears = Object.keys(yearTotals)
          .map((y) => Number(y))
          .sort((a, b) => b - a);
        if (presentYears.length >= 2) {
          yearsToReturn = presentYears.slice(0, 2);
        } else if (presentYears.length === 1) {
          yearsToReturn = presentYears.slice(0, 1);
        } else {
          // no data at all -> return empty breakdown (consistent with previous "skip zeros" behavior)
          yearsToReturn = [];
        }
      }

      const formatFY = (endYear: number) =>
        `${endYear - 1}-${String(endYear).slice(-2)}`;

      // Build breakdown items (include zeros only when explicit)
      const breakdown = yearsToReturn
        .map((y) => ({
          year: y,
          label: formatFY(y),
          value: yearTotals[y] || 0,
        }))
        .filter((item) => (isExplicit ? true : item.value > 0))
        .sort((a, b) => b.year - a.year);

      // Growth: index semantics (100 = flat)
      let growth: number | null = null;
      if (breakdown.length >= 2) {
        const [curr, prev] = breakdown;
        growth = prev.value > 0 ? (curr.value / prev.value) * 100 : null;
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
