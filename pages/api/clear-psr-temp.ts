import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/utils";

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
    });
  } catch (err) {
    console.error("Error clearing temp tables:", err);
    return res.status(500).json({ error: "Failed to clear PSR temp tables." });
  }
}
