import prisma from "@/lib/utils";
import ExcelJS from "exceljs";
import { NextApiRequest, NextApiResponse } from "next";
import { PassThrough } from "stream";

export const config = {
  api: { bodyParser: true },
};

// Utility: parse Excel date
function parseExcelDate(excelValue: unknown): Date {
  if (excelValue instanceof Date) return excelValue;
  if (typeof excelValue === "number") {
    return new Date(Math.round((excelValue - 25569) * 86400 * 1000));
  }
  if (typeof excelValue === "string") {
    const parsed = new Date(excelValue);
    if (!isNaN(parsed.getTime())) return parsed;
  }
  return new Date(0);
}

// Types for parsed rows
interface ChannelRow {
  customer_type: string;
  base_channel: string;
  short_channel: string;
  channel_desc: string;
}

interface StoreRow {
  Old_Store_Code: string;
  New_Store_Code: string;
  customer_name: string;
  customer_type: string;
  Branch: string;
  DSE_Code: string;
  ZM: string;
  RSM: string;
  ASM: string;
  TSI: string;
}

interface ProductRow {
  p_code: number;
  desc_short: string;
  category: string;
  brand: string;
  brandform: string;
  subbrandform: string;
}

interface PsrRow {
  document_no: string;
  document_date: Date;
  subbrandform: string;
  customer_name: string;
  customer_code: string;
  p_code: number;
  customer_type: string;
  category: string;
  brand: string;
  brandform: string;
  retailing: number;
}

interface GpRow {
  document_date: Date;
  retailer_code: string;
  retailer_name: string;
  p3m_gp: number;
  p1m_gp: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      type,
      fileUrl,
      action = "overwrite",
    } = req.body as {
      type: string;
      fileUrl: string;
      action?: "append" | "overwrite";
    };

    if (!fileUrl || !type) {
      return res.status(400).json({ error: "Missing fileUrl or type" });
    }

    console.log(`📥 Fetching file from Blob: ${fileUrl}`);
    const resp = await fetch(fileUrl);
    if (!resp.ok) throw new Error("Failed to fetch uploaded file");

    // ✅ Fix Buffer type issue
    const arrayBuffer = await resp.arrayBuffer();
    const buffer = Buffer.from(new Uint8Array(arrayBuffer));
    console.log("📦 File size:", buffer.length);

    const chunkSize = 50000;

    // ====== CHANNEL / STORE / PRODUCT MAPPING ======
    if (["channel", "store", "product"].includes(type)) {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buffer as any);
      const worksheet = workbook.worksheets[0];

      const rows: (string | number | null)[][] = [];
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber !== 1) {
          rows.push(row.values as (string | number | null)[]);
        }
      });

      if (type === "channel") {
        console.log("🗂 Mapping channel data...");
        const mapped: ChannelRow[] = rows.map((r) => ({
          customer_type: r[1]?.toString() ?? "",
          base_channel: r[2]?.toString() ?? "",
          short_channel: r[3]?.toString() ?? "",
          channel_desc: r[4]?.toString() ?? "",
        }));

        console.log("🧹 Deleting existing channel data...");
        await prisma.channel_mapping.deleteMany();

        for (let i = 0; i < mapped.length; i += chunkSize) {
          await prisma.channel_mapping.createMany({
            data: mapped.slice(i, i + chunkSize),
          });
        }
        console.log("✅ Channel data inserted.");
      } else if (type === "store") {
        console.log("🗂 Mapping store data...");
        const mapped: StoreRow[] = rows.map((row) => ({
          Old_Store_Code: row[1]?.toString() || "",
          New_Store_Code: row[2]?.toString() || "",
          customer_name: row[3]?.toString() || "",
          customer_type: row[4]?.toString() || "",
          Branch: row[5]?.toString() || "",
          DSE_Code: row[6]?.toString() || "",
          ZM: row[7]?.toString() || "",
          RSM: row[8]?.toString() || "",
          ASM: row[9]?.toString() || "",
          TSI: row[10]?.toString() || "",
        }));

        console.log("🧹 Deleting existing store data...");
        await prisma.store_mapping.deleteMany();

        for (let i = 0; i < mapped.length; i += chunkSize) {
          await prisma.store_mapping.createMany({
            data: mapped.slice(i, i + chunkSize),
          });
        }
        console.log("✅ Store data inserted.");
      } else if (type === "product") {
        console.log("🗂 Mapping product data...");
        const mapped: ProductRow[] = rows.map((row) => ({
          p_code: Number(row[1]) || 0,
          desc_short: row[2]?.toString() || "",
          category: row[3]?.toString() || "",
          brand: row[4]?.toString() || "",
          brandform: row[5]?.toString() || "",
          subbrandform: row[6]?.toString() || "",
        }));

        console.log("🧹 Deleting existing product data...");
        await prisma.product_mapping.deleteMany();

        for (let i = 0; i < mapped.length; i += chunkSize) {
          await prisma.product_mapping.createMany({
            data: mapped.slice(i, i + chunkSize),
          });
        }
        console.log("✅ Product data inserted.");
      }

      await prisma.mapping_change_flag.create({ data: { processed: false } });
      console.log("🚩 Mapping change flag created");
      return res.status(200).json({ message: `✅ ${type} mapping uploaded.` });
    }

    // ====== PSR FILE ======
    if (type === "psr") {
      if (action === "overwrite") {
        await prisma.$executeRaw`TRUNCATE TABLE psr_data_temp`;
      }

      const stream = new PassThrough();
      stream.end(buffer);

      const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader(stream, {
        entries: "emit",
        sharedStrings: "cache",
        worksheets: "emit",
      });

      let batch: PsrRow[] = [];
      let total = 0;

      for await (const worksheet of workbookReader) {
        let firstRow = true;
        for await (const row of worksheet) {
          if (firstRow) {
            firstRow = false;
            continue;
          }

          const v = row.values as (string | number | Date | null)[];
          batch.push({
            document_no: v[1]?.toString() ?? "",
            document_date: parseExcelDate(v[2]),
            subbrandform: v[3]?.toString() ?? "",
            customer_name: v[4]?.toString() ?? "",
            customer_code: v[5]?.toString() ?? "",
            p_code: Number(v[6]) || 0,
            customer_type: v[7]?.toString() ?? "",
            category: v[8]?.toString() ?? "",
            brand: v[9]?.toString() ?? "",
            brandform: v[10]?.toString() ?? "",
            retailing: Number(v[11]) || 0,
          });

          if (batch.length === chunkSize) {
            console.log(`⏳ Inserting batch of ${batch.length} rows...`);
            await prisma.psr_data_temp.createMany({ data: batch });
            total += batch.length;
            batch = [];
          }
        }
      }

      if (batch.length) {
        console.log(`⏳ Inserting final batch of ${batch.length} rows...`);
        await prisma.psr_data_temp.createMany({ data: batch });
        total += batch.length;
      }

      console.log(`✅ PSR upload complete: ${total} rows`);
      return res
        .status(200)
        .json({ message: `✅ PSR upload complete: ${total} rows` });
    }

    // ====== GP FILE ======
    if (type === "gp") {
      if (action === "overwrite") {
        console.log("🧹 Clearing gp_data_temp before upload...");
        await prisma.$executeRaw`TRUNCATE TABLE gp_data_temp`;
        console.log("✅ gp_data_temp cleared.");
      }

      const stream = new PassThrough();
      stream.end(buffer);

      const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader(stream, {
        entries: "emit",
        sharedStrings: "cache",
        worksheets: "emit",
      });

      let batch: GpRow[] = [];
      let total = 0;

      for await (const worksheet of workbookReader) {
        let firstRow = true;
        for await (const row of worksheet) {
          if (firstRow) {
            firstRow = false;
            continue;
          }

          const v = row.values as (string | number | Date | null)[];
          batch.push({
            document_date: parseExcelDate(v[1]),
            retailer_code: v[2]?.toString() ?? "",
            retailer_name: v[3]?.toString() ?? "",
            p3m_gp: Number(v[4]) || 0,
            p1m_gp: Number(v[5]) || 0,
          });

          if (batch.length === chunkSize) {
            console.log(`⏳ Inserting batch of ${batch.length} rows...`);
            await prisma.gp_data_temp.createMany({ data: batch });
            total += batch.length;
            batch = [];
          }
        }
      }

      if (batch.length) {
        console.log(`⏳ Inserting final batch of ${batch.length} rows...`);
        await prisma.gp_data_temp.createMany({ data: batch });
        total += batch.length;
      }

      console.log(`✅ GP upload complete: ${total} rows`);
      return res
        .status(200)
        .json({
          timeStamp: new Date().toISOString(),
          message: `✅ GP upload complete: ${total} rows`,
          success: true,
        });
    }

    return res.status(400).json({
      timeStamp: new Date().toISOString(),
      success: false,
      message: "Invalid upload type"
    });
  } catch (err: any) {
    console.error("❌ Upload failed:", err);
    return res.status(500).json({
      message: err?.message || err || "Failed to Upload File !"
      , success: false, timeStamp: new Date().toISOString()
    });
  }
}
