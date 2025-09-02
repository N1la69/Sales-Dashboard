import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PrismaClient } from "../app/generated/prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const prisma = new PrismaClient({
  log: ["error", "warn"],
});

export default prisma;
