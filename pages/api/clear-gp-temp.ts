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
    await prisma.$executeRaw`TRUNCATE TABLE gp_data_temp`;
    return res
      .status(200)
      .json({ message: "GP temp data cleared successfully.", success: true, timeStamp: new Date().toISOString() });
  } catch (err) {
    console.error("Error clearing gp_data_temp:", err);
    return res.status(500).json({ message: err?.message || err || "Failed to clear gp_data_temp.", success: false, timeStamp: new Date().toISOString() });
  }
}
