import prisma from "@/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") throw { message: "Method Not Allowed", status: 405 };

  // -------------------------------
  // Step 1. Clear gp_data_temp table
  // -------------------------------

  try {
    await prisma.$executeRaw`TRUNCATE TABLE gp_data_temp`;
    return res
      .status(200)
      .json({
        message: "GP temp data cleared successfully.",
        success: true,
        timeStamp: new Date().toISOString(),
      });
  } catch (err: any) {
    console.error("Error clearing gp_data_temp:", err);
    return res.status(err?.status || 500).json({
      message: err?.message || err || "Failed to clear gp_data_temp.",
      success: false,
      timeStamp: new Date().toISOString()
    });
  }
}
