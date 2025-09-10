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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { type, fileUrl, action = "overwrite" } = req.body as {
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
      await workbook.xlsx.load(buffer);
      const worksheet = workbook.worksheets[0];

      const rows: (string | number | null)[][] = [];
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber !== 1) {
          rows.push(row.values as (string | number | null)[]);
        }
      });

      if (type === "channel") {
        const mapped: ChannelRow[] = rows.map((r) => ({
          customer_type: r[1]?.toString() ?? "",
          base_channel: r[2]?.toString() ?? "",
          short_channel: r[3]?.toString() ?? "",
          channel_desc: r[4]?.toString() ?? "",
        }));

        await prisma.channel_mapping.deleteMany();
        for (let i = 0; i < mapped.length; i += chunkSize) {
          await prisma.channel_mapping.createMany({ data: mapped.slice(i, i + chunkSize) });
        }
      }

      // TODO: Add "store" + "product" mappings

      return res.status(200).json({ message: `✅ ${type} mapping uploaded.` });
    }

    // ====== PSR FILE ======
    if (type === "psr") {
      if (action === "overwrite") {
        await prisma.$executeRaw`DELETE FROM psr_data_temp`;
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
            await prisma.psr_data_temp.createMany({ data: batch });
            total += batch.length;
            batch = [];
          }
        }
      }

      if (batch.length) {
        await prisma.psr_data_temp.createMany({ data: batch });
        total += batch.length;
      }

      return res.status(200).json({ message: `✅ PSR upload complete: ${total} rows` });
    }

    return res.status(400).json({ error: "Invalid upload type" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("❌ Upload failed:", message);
    return res.status(500).json({ message: message, success: false, error: message, timeStamp: new Date().toISOString() });// Added timestamp to error response for better debugging
  }
}
