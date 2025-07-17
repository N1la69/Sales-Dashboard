/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from "@/lib/utils";

export const resolvers = {
  Query: {
    totalRetailing: async (_: any, { filters }: any) => {
      const whereClause: any = {};

      if (filters.Year) {
        whereClause.document_date = {
          gte: new Date(`${filters.Year}-01-01`),
          lte: new Date(`${filters.Year}-12-31`),
        };
      }

      if (filters.Month) {
        const month = parseInt(filters.Month, 10);
        if (!whereClause.document_date) whereClause.document_date = {};

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

      // Combine customer_code filters
      let customerCodes: string[] = [];

      if (filters.Branch) {
        const codes = await getStoreCodesByFilter("New_Branch", filters.Branch);
        customerCodes = customerCodes.length
          ? customerCodes.filter((code) => codes.includes(code))
          : codes;
      }
      if (filters.ZM) {
        const codes = await getStoreCodesByFilter("ZM", filters.ZM);
        customerCodes = customerCodes.length
          ? customerCodes.filter((code) => codes.includes(code))
          : codes;
      }
      if (filters.SM) {
        const codes = await getStoreCodesByFilter("SM", filters.SM);
        customerCodes = customerCodes.length
          ? customerCodes.filter((code) => codes.includes(code))
          : codes;
      }
      if (filters.BE) {
        const codes = await getStoreCodesByFilter("BE", filters.BE);
        customerCodes = customerCodes.length
          ? customerCodes.filter((code) => codes.includes(code))
          : codes;
      }
      if (customerCodes.length > 0) {
        whereClause.customer_code = { in: customerCodes };
      }

      // Combine customer_type filters
      let customerTypes: string[] = [];

      if (filters.Channel) {
        const types = await getCustomerTypesByChannelFilter(
          "channel",
          filters.Channel
        );
        customerTypes = customerTypes.length
          ? customerTypes.filter((t) => types.includes(t))
          : types;
      }
      if (filters.BroadChannel) {
        const types = await getCustomerTypesByChannelFilter(
          "broad_channel",
          filters.BroadChannel
        );
        customerTypes = customerTypes.length
          ? customerTypes.filter((t) => types.includes(t))
          : types;
      }
      if (filters.ShortChannel) {
        const types = await getCustomerTypesByChannelFilter(
          "short_channel",
          filters.ShortChannel
        );
        customerTypes = customerTypes.length
          ? customerTypes.filter((t) => types.includes(t))
          : types;
      }
      if (customerTypes.length > 0) {
        whereClause.customer_type = { in: customerTypes };
      }

      const result = await prisma.psr_data.aggregate({
        _sum: {
          retailing: true,
        },
        where: whereClause,
      });

      return result._sum.retailing || 0;
    },
  },
};

// Helper to fetch store codes from store_mapping
async function getStoreCodesByFilter(column: string, value: string) {
  const stores = await prisma.store_mapping.findMany({
    where: {
      [column]: value,
    },
    select: {
      Old_Store_Code: true,
    },
  });

  return stores.map((store) => store.Old_Store_Code);
}

// Helper to fetch customer types from channel_mapping
async function getCustomerTypesByChannelFilter(column: string, value: string) {
  const mappings = await prisma.channel_mapping.findMany({
    where: {
      [column]: value,
    },
    select: {
      customer_type: true,
    },
  });

  return mappings.map((map) => map.customer_type);
}
