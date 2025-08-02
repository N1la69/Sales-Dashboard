/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import ExcelJS from "exceljs";
import prisma from "@/lib/utils";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
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

    const type = fields.type?.[0]; // 'psr', 'channel', 'store', 'product'
    const action = fields.action?.[0] || "overwrite";
    const file = files.file?.[0];

    if (!file || !type) {
      return res
        .status(400)
        .json({ error: "File or type missing from the request." });
    }

    try {
      console.log(`📥 Upload started for type: ${type}`);

      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(file.filepath);
      const worksheet = workbook.worksheets[0];

      const data: any[] = [];
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Skip header
        data.push(row.values as any[]);
      });

      const chunkSize = 1000;

      if (type === "channel") {
        const mappedData = data.map((row) => ({
          customer_type: row[1]?.toString() || "",
          channel: row[2]?.toString() || "",
          broad_channel: row[3]?.toString() || "",
          short_channel: row[4]?.toString() || "",
        }));

        console.log("🧹 Clearing existing channel_mapping data");
        await prisma.channel_mapping.deleteMany();

        for (let i = 0; i < mappedData.length; i += chunkSize) {
          const chunk = mappedData.slice(i, i + chunkSize);
          await prisma.channel_mapping.createMany({ data: chunk });
        }

        console.log(`✅ Uploaded ${mappedData.length} rows to channel_mapping`);
      } else if (type === "store") {
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

        console.log("🧹 Clearing existing store_mapping data");
        await prisma.store_mapping.deleteMany();

        for (let i = 0; i < mappedData.length; i += 2000) {
          const chunk = mappedData.slice(i, i + 2000);
          await prisma.store_mapping.createMany({ data: chunk });
        }

        console.log(`✅ Uploaded ${mappedData.length} rows to store_mapping`);
      } else if (type === "psr") {
        if (action === "overwrite") {
          console.log("🧹 Clearing existing psr_data_temp (overwrite mode)");
          await prisma.psr_data_temp.deleteMany();
        }

        const mappedData = data.map((row) => ({
          document_no: row[1]?.toString() || "",
          document_date: new Date(row[2]),
          subbrandform: row[3]?.toString() || "",
          customer_name: row[4]?.toString() || "",
          customer_code: row[5]?.toString() || "",
          p_code: Number(row[6]) || 0,
          customer_type: row[7]?.toString() || "",
          category: row[8]?.toString() || "",
          brand: row[9]?.toString() || "",
          brandform: row[10]?.toString() || "",
          retailing: Number(row[11]) || 0,
        }));

        for (let i = 0; i < mappedData.length; i += 5000) {
          const chunk = mappedData.slice(i, i + 5000);
          await prisma.psr_data_temp.createMany({ data: chunk });
        }

        console.log(`✅ Uploaded ${mappedData.length} rows to psr_data_temp`);
      } else if (type === "product") {
        const mappedData = data.map((row) => ({
          p_code: Number(row[1]) || 0,
          desc_short: row[2]?.toString() || "",
          category: row[3]?.toString() || "",
          brand: row[4]?.toString() || "",
          brandform: row[5]?.toString() || "",
          subbrandform: row[6]?.toString() || "",
        }));

        console.log("🧹 Clearing existing product_mapping data");
        await prisma.product_mapping.deleteMany();

        for (let i = 0; i < mappedData.length; i += chunkSize) {
          const chunk = mappedData.slice(i, i + chunkSize);
          await prisma.product_mapping.createMany({ data: chunk });
        }

        console.log(`✅ Uploaded ${mappedData.length} rows to product_mapping`);
      } else {
        console.error(`❌ Invalid type: ${type}`);
        return res.status(400).json({ error: "Invalid upload type" });
      }

      fs.unlinkSync(file.filepath);
      return res
        .status(200)
        .json({ message: `✅ Successfully uploaded ${type} data.` });
    } catch (error: any) {
      console.error("❌ Error processing file:", error);
      if (file?.filepath && fs.existsSync(file.filepath)) {
        fs.unlinkSync(file.filepath);
      }
      return res
        .status(500)
        .json({ error: `Error processing file: ${error.message}` });
    }
  });
}
