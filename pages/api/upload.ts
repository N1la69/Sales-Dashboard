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

    try {
      const type = fields.type?.[0]; // 'channel', 'psr', 'store'
      const file = files.file?.[0];

      if (!file || !type) {
        return res.status(400).json({ error: "File or type missing" });
      }

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
          const chunk = mappedData.slice(i, i + chunkSize);
          await prisma.channel_mapping.createMany({ data: chunk });
        }

        console.log(`Inserted ${mappedData.length} channel mapping rows`);
      } else if (type === "psr") {
        console.log("PSR processing to be implemented.");
      } else if (type === "store") {
        console.log("Store processing to be implemented.");
      } else {
        return res.status(400).json({ error: "Invalid type provided" });
      }

      fs.unlinkSync(file.filepath);

      return res.status(200).json({
        message: `${type} data uploaded successfully`,
        rowsParsed: data.length,
      });
    } catch (error: any) {
      console.error("Upload processing error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
}
