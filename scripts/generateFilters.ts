import prisma from "../lib/utils";
import { writeFileSync } from "fs";
import path from "path";

async function generateFilterValues() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

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
    distinct: ["New_Branch"],
    select: { New_Branch: true },
  });

  const zms = await prisma.store_mapping.findMany({
    distinct: ["ZM"],
    select: { ZM: true },
  });

  const sms = await prisma.store_mapping.findMany({
    distinct: ["SM"],
    select: { SM: true },
  });

  const bes = await prisma.store_mapping.findMany({
    distinct: ["BE"],
    select: { BE: true },
  });

  const channels = await prisma.channel_mapping.findMany({
    distinct: ["channel"],
    select: { channel: true },
  });

  const broadChannels = await prisma.channel_mapping.findMany({
    distinct: ["broad_channel"],
    select: { broad_channel: true },
  });

  const shortChannels = await prisma.channel_mapping.findMany({
    distinct: ["short_channel"],
    select: { short_channel: true },
  });

  const filterValues = {
    years,
    months,
    categories: categories.map((c: { category: string }) => c.category),
    brands: brands.map((b: { brand: string }) => b.brand),
    brandforms: brandforms.map((bf: { brandform: string }) => bf.brandform),
    subbrandforms: subbrandforms.map(
      (sbf: { subbrandform: string }) => sbf.subbrandform
    ),
    branches: branches.map((b: { New_Branch: string }) => b.New_Branch),
    zms: zms.map((z: { ZM: string }) => z.ZM),
    sms: sms.map((s: { SM: string }) => s.SM),
    bes: bes.map((b: { BE: string }) => b.BE),
    channels: channels.map((c: { channel: string }) => c.channel),
    broadChannels: broadChannels.map(
      (bc: { broad_channel: string }) => bc.broad_channel
    ),
    shortChannels: shortChannels.map(
      (sc: { short_channel: string }) => sc.short_channel
    ),
  };

  const outputPath = path.join(process.cwd(), "constants", "filterValues.ts");
  const fileContent = `// AUTO-GENERATED FILE - DO NOT EDIT MANUALLY

                    const filterValues = ${JSON.stringify(
                      filterValues,
                      null,
                      2
                    )} as const;

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
