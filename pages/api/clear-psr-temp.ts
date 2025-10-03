import prisma from "@/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // ✅ Truncate both temp tables
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE psr_data_temp`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE psr_finalized_temp`);

    return res.status(200).json({
      message: "PSR temp data and finalized temp data cleared successfully.",
      success: true,
      timeStamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error("Error clearing temp tables:", error);
    return res.status(error?.status || 500).json({
      message: error?.message || error || "Failed to clear PSR temp tables.",
      success: false,
      timeStamp: new Date().toISOString()
    });
  }
}
