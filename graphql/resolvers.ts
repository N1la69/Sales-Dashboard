import prisma from "@/lib/utils";

export const resolvers = {
  Query: {
    totalRetailing: async () => {
      const result = await prisma.psr_data.aggregate({
        _sum: {
          retailing: true,
        },
      });

      return result._sum.retailing || 0;
    },
  },
};
