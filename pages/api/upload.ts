import { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import { PassThrough } from "stream";
import ExcelJS from "exceljs";
import prisma from "@/lib/utils";
import fs from "fs/promises";
import { runGenerateFilters } from "@/lib/runGenerateFilters";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Utility: parse Excel date
function parseExcelDate(excelValue: any): Date {
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

// Helper: parse form with file buffer
async function parseForm(req: NextApiRequest): Promise<{
  fields: formidable.Fields;
  file: (File & { buffer?: Buffer }) | undefined;
}> {
  return new Promise((resolve, reject) => {
    const form = formidable({
      multiples: false,
      maxFileSize: 100 * 1024 * 1024, // allow up to 100 MB
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) return reject(err);

      console.log("=== FORM PARSE DEBUG START ===");
      console.log("FIELDS:", fields);
      console.log("FILES RAW:", files);
      console.log("FILES KEYS:", Object.keys(files));
      console.log("=== FORM PARSE DEBUG END ===");

      let file: (File & { buffer?: Buffer }) | undefined;
      const f = Array.isArray(files.file) ? files.file[0] : files.file;

      if (f) {
        try {
          // read the temp file into memory
          const buffer = await fs.readFile(f.filepath);
          (f as any).buffer = buffer;
          file = f as File & { buffer?: Buffer };
          console.log("📦 File buffer size:", buffer.length);

          // cleanup: remove temp file immediately
          await fs.unlink(f.filepath);
          console.log("🧹 Temp file cleaned up:", f.filepath);
        } catch (readErr) {
          return reject(readErr);
        }
      }

      resolve({ fields, file });
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    console.warn("⚠️ Invalid request method:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { fields, file } = await parseForm(req);
    const type = fields.type?.[0];
    const action = fields.action?.[0] || "overwrite";

    if (!file?.buffer || !type) {
      console.warn("⚠️ Missing required fields: file or type");
      return res
        .status(400)
        .json({ error: "File or type missing from request." });
    }

    console.log(`📥 Upload started for type: ${type}`);
    console.log(`⚙️  Action: ${action}`);
    console.log(`📄 File size: ${(file.size / (1024 * 1024)).toFixed(2)} MB`);

    const chunkSize = 50000;

    // ===== MAPPING FILES =====
    if (["channel", "store", "product"].includes(type)) {
      console.log("📖 Loading Excel workbook (mapping)...");
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(file.buffer as any);
      console.log("✅ Workbook loaded successfully");

      const worksheet = workbook.worksheets[0];
      const data: any[] = [];
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return;
        data.push(row.values as any[]);
      });
      console.log(`🔍 Rows parsed: ${data.length}`);

      if (type === "channel") {
        console.log("🗂 Mapping channel data...");
        const mappedData = data.map((row) => ({
          customer_type: row[1]?.toString() || "",
          base_channel: row[2]?.toString() || "",
          short_channel: row[3]?.toString() || "",
          channel_desc: row[4]?.toString() || "",
        }));

        console.log("🧹 Deleting existing channel data...");
        await prisma.channel_mapping.deleteMany();

        for (let i = 0; i < mappedData.length; i += chunkSize) {
          console.log(`📦 Inserting channel chunk: ${i}–${i + chunkSize}`);
          await prisma.channel_mapping.createMany({
            data: mappedData.slice(i, i + chunkSize),
          });
        }
        console.log("✅ Channel data inserted.");
      } else if (type === "store") {
        console.log("🗂 Mapping store data...");
        const mappedData = data.map((row) => ({
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

        for (let i = 0; i < mappedData.length; i += chunkSize) {
          console.log(`📦 Inserting store chunk: ${i}–${i + chunkSize}`);
          await prisma.store_mapping.createMany({
            data: mappedData.slice(i, i + chunkSize),
          });
        }
        console.log("✅ Store data inserted.");
      } else if (type === "product") {
        console.log("🗂 Mapping product data...");
        const mappedData = data.map((row) => ({
          p_code: Number(row[1]) || 0,
          desc_short: row[2]?.toString() || "",
          category: row[3]?.toString() || "",
          brand: row[4]?.toString() || "",
          brandform: row[5]?.toString() || "",
          subbrandform: row[6]?.toString() || "",
        }));

        console.log("🧹 Deleting existing product data...");
        await prisma.product_mapping.deleteMany();

        for (let i = 0; i < mappedData.length; i += chunkSize) {
          console.log(`📦 Inserting product chunk: ${i}–${i + chunkSize}`);
          await prisma.product_mapping.createMany({
            data: mappedData.slice(i, i + chunkSize),
          });
        }
        console.log("✅ Product data inserted.");
      }

      await prisma.mapping_change_flag.create({ data: { processed: false } });
      console.log("🚩 Mapping change flag created");

      runGenerateFilters();
      console.log("🔄 Filters regeneration triggered");

      return res
        .status(200)
        .json({ message: `✅ Successfully uploaded ${type} data.` });
    }

    // ===== PSR FILES =====
    if (type === "psr") {
      if (action === "overwrite") {
        console.log("🧹 Clearing psr_data_temp before upload...");
        await prisma.$executeRaw`DELETE FROM psr_data_temp`;
        console.log("✅ psr_data_temp cleared.");
      }

      console.log("📖 Streaming PSR data...");
      const stream = new PassThrough();
      stream.end(file.buffer);

      const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader(stream, {
        entries: "emit",
        sharedStrings: "cache",
        worksheets: "emit",
      });

      let bufferArr: any[] = [];
      let totalInserted = 0;

      for await (const worksheet of workbookReader) {
        let isFirstRow = true;
        for await (const row of worksheet) {
          if (isFirstRow) {
            isFirstRow = false;
            continue;
          }

          const values = row.values as any[];
          bufferArr.push({
            document_no: values[1]?.toString() || "",
            document_date: parseExcelDate(values[2]),
            subbrandform: values[3]?.toString() || "",
            customer_name: values[4]?.toString() || "",
            customer_code: values[5]?.toString() || "",
            p_code: Number(values[6]) || 0,
            customer_type: values[7]?.toString() || "",
            category: values[8]?.toString() || "",
            brand: values[9]?.toString() || "",
            brandform: values[10]?.toString() || "",
            retailing: Number(values[11]) || 0,
          });

          if (bufferArr.length === chunkSize) {
            console.log(
              `📦 Inserting PSR chunk. Total so far: ${
                totalInserted + chunkSize
              }`
            );
            await prisma.psr_data_temp.createMany({ data: bufferArr });
            totalInserted += bufferArr.length;
            bufferArr = [];
            global.gc?.(); // optional memory cleanup
          }
        }
      }

      if (bufferArr.length) {
        console.log(
          `📦 Inserting final PSR chunk. Remaining rows: ${bufferArr.length}`
        );
        await prisma.psr_data_temp.createMany({ data: bufferArr });
        totalInserted += bufferArr.length;
      }

      console.log(
        `✅ PSR upload complete. Total rows inserted: ${totalInserted}`
      );
      return res
        .status(200)
        .json({ message: `✅ PSR upload complete. Rows: ${totalInserted}` });
    }

    // ===== GP FILES =====
    if (type === "gp") {
      if (action === "overwrite") {
        console.log("🧹 Clearing gp_data_temp before upload...");
        await prisma.$executeRaw`TRUNCATE TABLE gp_data_temp`;
        console.log("✅ gp_data_temp cleared.");
      }

      console.log("📖 Streaming GP data...");
      const stream = new PassThrough();
      stream.end(file.buffer);

      const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader(stream, {
        entries: "emit",
        sharedStrings: "cache",
        worksheets: "emit",
      });

      let bufferArr: any[] = [];
      let totalInserted = 0;

      for await (const worksheet of workbookReader) {
        let isFirstRow = true;
        for await (const row of worksheet) {
          if (isFirstRow) {
            isFirstRow = false;
            continue;
          }

          const values = row.values as any[];
          bufferArr.push({
            document_date: parseExcelDate(values[1]),
            retailer_code: values[2]?.toString() || "",
            retailer_name: values[3]?.toString() || "",
            p3m_gp: Number(values[4]) || 0,
            p1m_gp: Number(values[5]) || 0,
          });

          if (bufferArr.length === chunkSize) {
            console.log(
              `📦 Inserting GP chunk. Total so far: ${
                totalInserted + chunkSize
              }`
            );
            await prisma.gp_data_temp.createMany({ data: bufferArr });
            totalInserted += bufferArr.length;
            bufferArr = [];
            global.gc?.(); // optional
          }
        }
      }

      if (bufferArr.length) {
        console.log(
          `📦 Inserting final GP chunk. Remaining rows: ${bufferArr.length}`
        );
        await prisma.gp_data_temp.createMany({ data: bufferArr });
        totalInserted += bufferArr.length;
      }

      console.log(
        `✅ GP upload complete. Total rows inserted: ${totalInserted}`
      );
      return res
        .status(200)
        .json({ message: `✅ GP upload complete. Rows: ${totalInserted}` });
    }

    console.warn("⚠️ Invalid upload type:", type);
    return res.status(400).json({ error: "Invalid upload type" });
  } catch (error: any) {
    console.error("❌ Upload failed:", error);
    return res.status(500).json({ error: error.message || "Unknown error" });
  }
}
