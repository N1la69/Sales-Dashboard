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
    await prisma.$executeRaw`DELETE FROM psr_data_temp`;
    return res
      .status(200)
      .json({ message: "PSR temp data cleared successfully." });
  } catch (err) {
    console.error("Error clearing psr_data_temp:", err);
    return res.status(500).json({ error: "Failed to clear psr_data_temp." });
  }
}
