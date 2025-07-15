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
    // Start a transaction to ensure atomicity
    await prisma.$transaction([
      prisma.$executeRaw`INSERT INTO psr_data (
        document_no,
        document_date,
        subbrandform_name,
        customer_name,
        customer_code,
        channel_description,
        customer_type,
        category,
        brand,
        brandform,
        retailing
      )
      SELECT 
        document_no,
        document_date,
        subbrandform_name,
        customer_name,
        customer_code,
        channel_description,
        customer_type,
        category,
        brand,
        brandform,
        retailing
      FROM psr_data_temp;`,

      prisma.$executeRaw`DELETE FROM psr_data_temp`,
    ]);

    return res
      .status(200)
      .json({ message: "PSR temp data merged successfully into psr_data." });
  } catch (error) {
    console.error("Merge error:", error);
    return res.status(500).json({ error: "Failed to merge PSR data" });
  }
}
