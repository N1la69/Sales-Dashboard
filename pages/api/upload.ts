/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import ExcelJS from "exceljs";
import prisma from "@/lib/utils";
import { runGenerateFilters } from "@/lib/runGenerateFilters";

export const config = {
  api: {
    bodyParser: false,
  },
};

function parseExcelDate(excelValue: any): Date {
  if (excelValue instanceof Date) return excelValue;

  if (typeof excelValue === "number") {
    return new Date(Math.round((excelValue - 25569) * 86400 * 1000));
  }

  if (typeof excelValue === "string") {
    const parsed = new Date(excelValue);
    if (!isNaN(parsed.getTime())) return parsed;
  }

  return new Date(0); // fallback
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    console.warn("⚠️ Invalid request method:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = formidable({
    multiples: false,
    uploadDir: "./",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("❌ Form parse error:", err);
      return res.status(500).json({ error: "Error parsing file upload." });
    }

    const type = fields.type?.[0];
    const action = fields.action?.[0] || "overwrite";
    const file = files.file?.[0];

    if (!file || !type) {
      console.warn("⚠️ Missing required fields: file or type");
      return res
        .status(400)
        .json({ error: "File or type missing from request." });
    }

    try {
      console.log(`📥 Upload started for type: ${type}`);
      console.log(`📄 File path: ${file.filepath}`);
      console.log(`⚙️  Action: ${action}`);

      const filepath = file.filepath;

      if (["channel", "store", "product"].includes(type)) {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filepath);
        console.log("📖 Excel file read successfully");
        const worksheet = workbook.worksheets[0];
        const data: any[] = [];

        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber === 1) return;
          data.push(row.values as any[]);
        });

        console.log(`🔍 Rows parsed: ${data.length}`);
        const chunkSize = 2000;

        if (type === "channel") {
          console.log("🗂 Mapping channel data...");
          const mappedData = data.map((row) => ({
            customer_type: row[1]?.toString() || "",
            channel: row[2]?.toString() || "",
            broad_channel: row[3]?.toString() || "",
            short_channel: row[4]?.toString() || "",
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
          runGenerateFilters();
        } else if (type === "store") {
          console.log("🗂 Mapping store data...");
          const mappedData = data.map((row) => ({
            Old_Store_Code: row[1]?.toString() || "",
            New_Store_Code: row[2]?.toString() || "",
            customer_name: row[3]?.toString() || "",
            customer_type: row[4]?.toString() || "",
            New_Branch: row[5]?.toString() || "",
            DSE_Code: row[6]?.toString() || "",
            ZM: row[7]?.toString() || "",
            SM: row[8]?.toString() || "",
            BE: row[9]?.toString() || "",
            STL: row[10]?.toString() || "",
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
          runGenerateFilters();
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
          runGenerateFilters();
        }
      }

      // PSR Upload: use stream reader
      else if (type === "psr") {
        if (action === "overwrite") {
          console.log("🧹 Clearing psr_data_temp before upload...");
          await prisma.$executeRaw`DELETE FROM psr_data_temp`;
          console.log("✅ psr_data_temp cleared.");
        }

        const streamWorkbook = new ExcelJS.stream.xlsx.WorkbookReader(
          filepath,
          {
            entries: "emit",
            sharedStrings: "cache",
            worksheets: "emit",
          }
        );

        const chunkSize = 5000;
        let buffer: any[] = [];
        let totalInserted = 0;

        console.log("📖 Streaming PSR data...");
        for await (const worksheet of streamWorkbook) {
          let isFirstRow = true;
          for await (const row of worksheet) {
            if (isFirstRow) {
              isFirstRow = false;
              continue;
            }

            const values = row.values as any[];

            buffer.push({
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

            if (buffer.length === chunkSize) {
              console.log(
                `📦 Inserting PSR chunk. Total so far: ${
                  totalInserted + chunkSize
                }`
              );
              await prisma.psr_data_temp.createMany({ data: buffer });
              totalInserted += buffer.length;
              buffer = [];

              global.gc?.(); // optional
            }
          }
        }

        if (buffer.length) {
          console.log(
            `📦 Inserting final PSR chunk. Remaining rows: ${buffer.length}`
          );
          await prisma.psr_data_temp.createMany({ data: buffer });
          totalInserted += buffer.length;
        }

        console.log(
          `✅ PSR upload complete. Total rows inserted: ${totalInserted}`
        );
      } else {
        console.warn("⚠️ Invalid upload type:", type);
        return res.status(400).json({ error: "Invalid upload type" });
      }

      // Cleanup
      fs.unlinkSync(filepath);
      console.log("🧼 Temporary file deleted:", filepath);

      return res
        .status(200)
        .json({ message: `✅ Successfully uploaded ${type} data.` });
    } catch (error: any) {
      console.error("❌ Upload failed:", error);
      if (file?.filepath && fs.existsSync(file.filepath)) {
        fs.unlinkSync(file.filepath);
        console.log("🧼 Cleaned up file after error:", file.filepath);
      }
      return res.status(500).json({ error: error.message || "Unknown error" });
    }
  });
}
