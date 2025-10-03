// /pages/api/transform-psr.ts
import prisma from "@/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") throw { message: "Method not allowed", status: 405 };

  try {
    // 1. Clear psr_finalized_temp table before inserting
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE psr_finalized_temp`);

    // 2. Insert transformed data with SQL joins
    await prisma.$executeRawUnsafe(`
      INSERT INTO psr_finalized_temp
        (document_date, customer_code, branch, ZM, RSM, ASM, TSI,
         category, brand, brandform, subbrandform,
         base_channel, short_channel, channel_desc,
         retailing)
      SELECT 
        p.document_date,
        p.customer_code,
        sm.Branch,
        sm.ZM,
        sm.RSM,
        sm.ASM,
        sm.TSI,
        pm.category,
        pm.brand,
        pm.brandform,
        pm.subbrandform,
        cm.base_channel,
        cm.short_channel,
        cm.channel_desc,
        p.retailing
      FROM psr_data_temp p
      LEFT JOIN store_mapping sm 
        ON p.customer_code = sm.Old_Store_Code
      LEFT JOIN product_mapping pm 
        ON p.p_code = pm.p_code
      LEFT JOIN channel_mapping cm 
        ON sm.customer_type = cm.customer_type
    `);

    return res.status(200).json({
      message: "Transformation completed successfully",
      success: true,
      timeStamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error("Error transforming PSR data:", error);
    return res.status(error?.status || 500).json({
      message: error?.message || error || "Failed to transform PSR data",
      success: false,
      timeStamp: new Date().toISOString()
    });
  }
}
