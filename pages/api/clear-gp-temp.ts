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
  } catch (error: any) {
    console.error("Error clearing gp_data_temp:", error);
    return res.status(error?.status || 500).json({
      message: error?.message || error || "Failed to clear gp_data_temp.",
      success: false,
      timeStamp: new Date().toISOString()
    });
  }
}
