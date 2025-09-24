import prisma from "@/lib/utils";
import ExcelJS from "exceljs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { type } = req.query;

    if (!type) throw { message: "Type is required", status: 400 };


    let data: any[] = [];
    let headers: string[] = [];

    switch (type) {
      case "channel":
        data = await prisma.channel_mapping.findMany();
        headers = [
          "channel_id",
          "customer_type",
          "base_channel",
          "short_channel",
          "channel_desc",
          "created_at",
        ];
        break;
      case "store":
        data = await prisma.store_mapping.findMany();
        headers = [
          "Id",
          "Old_Store_Code",
          "New_Store_Code",
          "customer_name",
          "customer_type",
          "Branch",
          "DSE_Code",
          "ZM",
          "RSM",
          "ASM",
          "TSI",
          "created_at",
        ];
        break;
      case "product":
        data = await prisma.product_mapping.findMany();
        headers = [
          "Id",
          "p_code",
          "desc_short",
          "category",
          "brand",
          "brandform",
          "subbrandform",
          "created_at",
        ];
        break;
      default:
        throw { message: "Invalid type", status: 400 };
    }

    // Create Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Mapping");

    // Add headers
    const headerRow = worksheet.addRow(headers);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4472C4" },
      };
      cell.alignment = { horizontal: "center", vertical: "middle" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Add rows
    data.forEach((row) => {
      worksheet.addRow(headers.map((h) => (row as any)[h]));
    });

    // Auto-fit columns
    worksheet.columns.forEach((col, i) => {
      col.width = Math.max(headers[i]?.length ?? 10, 15);
    });

    // Stream as response
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${type}_mapping.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err: any) {
    console.error("Error generating mapping file:", err);
    return res.status(err?.status || 500).json({
      message: err?.message || err || "Failed to generate mapping file",
      success: false,
      timeStamp: new Date().toISOString()
    });
  }
}
