import prisma from "../lib/utils";
import { writeFileSync } from "fs";
import path from "path";

async function generateFilterValues() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  // Determine starting fiscal year based on July start
  const startFiscalYear = currentMonth >= 7 ? currentYear : currentYear - 1;

  // Last 4 fiscal years
  const years = Array.from({ length: 4 }, (_, i) => {
    const fyStart = startFiscalYear - i;
    const fyEnd = fyStart + 1;
    return `${fyStart}-${fyEnd.toString().slice(-2)}`;
  });

  // Fiscal months: Jul (7) → Jun (6)
  const months = [7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6];

  const categories = await prisma.product_mapping.findMany({
    distinct: ["category"],
    select: { category: true },
  });

  const brands = await prisma.product_mapping.findMany({
    distinct: ["brand"],
    select: { brand: true },
  });

  const brandforms = await prisma.product_mapping.findMany({
    distinct: ["brandform"],
    select: { brandform: true },
  });

  const subbrandforms = await prisma.product_mapping.findMany({
    distinct: ["subbrandform"],
    select: { subbrandform: true },
  });

  const branches = await prisma.store_mapping.findMany({
    distinct: ["Branch"],
    select: { Branch: true },
  });

  const zms = await prisma.store_mapping.findMany({
    distinct: ["ZM"],
    select: { ZM: true },
  });

  const rsms = await prisma.store_mapping.findMany({
    distinct: ["RSM"],
    select: { RSM: true },
  });

  const asms = await prisma.store_mapping.findMany({
    distinct: ["ASM"],
    select: { ASM: true },
  });

  const tsis = await prisma.store_mapping.findMany({
    distinct: ["TSI"],
    select: { TSI: true },
  });

  const channelDescs = await prisma.channel_mapping.findMany({
    distinct: ["channel_desc"],
    select: { channel_desc: true },
  });

  const baseChannels = await prisma.channel_mapping.findMany({
    distinct: ["base_channel"],
    select: { base_channel: true },
  });

  const shortChannels = await prisma.channel_mapping.findMany({
    distinct: ["short_channel"],
    select: { short_channel: true },
  });

  const clean = (values: { [key: string]: string }[], key: string) =>
    values
      .map((v) => v[key])
      .filter((val) => val && val.trim().toUpperCase() !== "NA");

  const filterValues = {
    years,
    months,
    categories: clean(categories, "category"),
    brands: clean(brands, "brand"),
    brandforms: clean(brandforms, "brandform"),
    subbrandforms: clean(subbrandforms, "subbrandform"),
    branches: clean(branches, "Branch"),
    zms: clean(zms, "ZM"),
    rsms: clean(rsms, "RSM"), // "NA" removed here
    asms: clean(asms, "ASM"), // "NA" removed here
    tsis: clean(tsis, "TSI"),
    channelDescs: clean(channelDescs, "channel_desc"),
    baseChannels: clean(baseChannels, "base_channel"),
    shortChannels: clean(shortChannels, "short_channel"),
  };

  const outputPath = path.join(process.cwd(), "constants", "filterValues.ts");
  const fileContent = `// AUTO-GENERATED FILE - DO NOT EDIT MANUALLY

const filterValues = ${JSON.stringify(filterValues, null, 2)} as const;

export default filterValues;
`;

  writeFileSync(outputPath, fileContent, "utf-8");
  console.log("✅ Filter values generated at constants/filterValues.ts");
}

generateFilterValues()
  .catch((e) => {
    console.error("❌ Error generating filter values:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
