import { PrismaClient } from "../app/generated/prisma";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// Create adapter using DB URL
const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);

const prisma = new PrismaClient({
  adapter,
  log: ["error", "warn"],
});

export default prisma;
