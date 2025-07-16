/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import ExcelJS from "exceljs";
import prisma from "@/lib/utils";

// Disable default body parsing by Next.js to use formidable
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
      console.error("Formidable parse error:", err);
      return res.status(500).json({ error: "File upload error" });
    }

    const type = fields.type?.[0]; // 'channel', 'psr', 'store'
    const action = fields.action?.[0] || "overwrite"; // default to 'overwrite'
    const file = files.file?.[0];

    if (!file || !type) {
      return res.status(400).json({ error: "File or type missing" });
    }

    // Immediate response
    res.status(202).json({
      message: `File received for ${type}, processing in background`,
    });

    setImmediate(async () => {
      try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(file.filepath);
        const worksheet = workbook.worksheets[0];

        const data: any[] = [];
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber === 1) return; // skip header
          data.push(row.values as any[]);
        });

        console.log(`Parsed ${data.length} rows for type: ${type}`);

        if (type === "channel") {
          await prisma.$executeRaw`DELETE FROM channel_mapping`;

          const mappedData = data.map((row) => ({
            customer_type: row[1]?.toString() || "",
            channel: row[2]?.toString() || "",
            broad_channel: row[3]?.toString() || "",
            short_channel: row[4]?.toString() || "",
          }));

          const chunkSize = 1000;
          for (let i = 0; i < mappedData.length; i += chunkSize) {
            await prisma.channel_mapping.createMany({
              data: mappedData.slice(i, i + chunkSize),
            });
          }

          console.log(`Inserted ${mappedData.length} channel mapping rows`);
        } else if (type === "psr") {
          if (action === "overwrite") {
            console.log("Clearing psr_data_temp for overwrite...");
            await prisma.$executeRaw`DELETE FROM psr_data_temp`;
          }

          const mappedData = data.map((row) => ({
            document_no: row[1]?.toString() || "",
            document_date: new Date(row[2]),
            subbrandform_name: row[3]?.toString() || "",
            customer_name: row[4]?.toString() || "",
            customer_code: row[5]?.toString() || "",
            channel_description: row[6]?.toString() || "",
            customer_type: row[7]?.toString() || "",
            category: row[8]?.toString() || "",
            brand: row[9]?.toString() || "",
            brandform: row[10]?.toString() || "",
            retailing: Number(row[11]) || 0,
          }));

          const chunkSize = 5000;
          for (let i = 0; i < mappedData.length; i += chunkSize) {
            console.log(`Inserting PSR rows: ${i + 1} to ${i + chunkSize}`);
            await prisma.psr_data_temp.createMany({
              data: mappedData.slice(i, i + chunkSize),
            });
          }

          console.log(
            `PSR data ${action} completed with ${mappedData.length} rows`
          );
        } else if (type === "store") {
          await prisma.$executeRaw`DELETE FROM store_mapping`;

          const mappedData = data.map((row) => ({
            Old_Store_Code: row[1]?.toString() || "",
            New_Store_Code: row[2]?.toString() || "",
            New_Branch: row[3]?.toString() || "",
            DSE_Code: row[4]?.toString() || "",
            ZM: row[5]?.toString() || "",
            SM: row[6]?.toString() || "",
            BE: row[7]?.toString() || "",
            STL: row[8]?.toString() || "",
          }));

          const chunkSize = 5000;
          for (let i = 0; i < mappedData.length; i += chunkSize) {
            await prisma.store_mapping.createMany({
              data: mappedData.slice(i, i + chunkSize),
            });
          }

          console.log(`Inserted ${mappedData.length} store mapping rows`);
        } else {
          console.error("Invalid type provided:", type);
        }

        fs.unlinkSync(file.filepath);
        console.log(`Background processing for ${type} (${action}) completed.`);
      } catch (error: any) {
        console.error("Background processing error:", error);
      }
    });
  });
}
