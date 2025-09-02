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

        // CHANNEL
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

          // Flag mapping change
          await prisma.mapping_change_flag.create({
            data: { processed: false },
          });

          runGenerateFilters();
        }
        // STORE
        else if (type === "store") {
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

          // Flag mapping change
          await prisma.mapping_change_flag.create({
            data: { processed: false },
          });

          runGenerateFilters();
        }
        // PRODUCT
        else if (type === "product") {
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

          // Flag mapping change
          await prisma.mapping_change_flag.create({
            data: { processed: false },
          });

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
              try {
                await prisma.psr_data_temp.createMany({ data: buffer });
                totalInserted += buffer.length;
                buffer = [];
              } catch (error: any) {
                console.error(
                  "Insert failed:",
                  error.meta?.column_name,
                  error.meta?.value
                );
                throw error;
              }

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
      }

      // GP Upload: use stream reader
      else if (type === "gp") {
        if (action === "overwrite") {
          console.log("🧹 Clearing gp_data_temp before upload...");
          await prisma.$executeRaw`TRUNCATE TABLE gp_data_temp`;
          console.log("✅ gp_data_temp cleared.");
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

        console.log("📖 Streaming GP data...");
        for await (const worksheet of streamWorkbook) {
          let isFirstRow = true;
          for await (const row of worksheet) {
            if (isFirstRow) {
              isFirstRow = false;
              continue;
            }

            const values = row.values as any[];
            buffer.push({
              document_date: parseExcelDate(values[1]),
              retailer_code: values[2]?.toString() || "",
              retailer_name: values[3]?.toString() || "",
              p3m_gp: Number(values[4]) || 0,
              p1m_gp: Number(values[5]) || 0,
            });

            if (buffer.length === chunkSize) {
              console.log(
                `📦 Inserting GP chunk. Total so far: ${
                  totalInserted + chunkSize
                }`
              );
              try {
                await prisma.gp_data_temp.createMany({ data: buffer });
                totalInserted += buffer.length;
                buffer = [];
              } catch (error: any) {
                console.error(
                  "Insert failed:",
                  error.meta?.column_name,
                  error.meta?.value
                );
                throw error;
              }

              global.gc?.(); // optional
            }
          }
        }

        if (buffer.length) {
          console.log(
            `📦 Inserting final GP chunk. Remaining rows: ${buffer.length}`
          );
          await prisma.gp_data_temp.createMany({ data: buffer });
          totalInserted += buffer.length;
        }

        console.log(
          `✅ GP upload complete. Total rows inserted: ${totalInserted}`
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
