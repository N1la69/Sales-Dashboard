import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/utils";
import { runGenerateFilters } from "@/lib/runGenerateFilters";

const BATCH_SIZE = 100000;

async function moveTableData(
  sourceTable: string,
  targetTable: string,
  columns: string[]
) {
  let rowsMoved = 0;

  while (true) {
    const inserted = await prisma.$executeRawUnsafe(`
      INSERT INTO ${targetTable} (${columns.join(", ")})
      SELECT ${columns.join(", ")}
      FROM ${sourceTable}
      LIMIT ${BATCH_SIZE};
    `);

    if (inserted === 0) break; // no more rows

    rowsMoved += inserted;

    await prisma.$executeRawUnsafe(`
      DELETE FROM ${sourceTable}
      LIMIT ${BATCH_SIZE};
    `);
  }

  return rowsMoved;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Move psr_finalized_temp → psr_data_finalized
    const finalizedColumns = [
      "document_date",
      "customer_code",
      "branch",
      "ZM",
      "RSM",
      "ASM",
      "TSI",
      "category",
      "brand",
      "brandform",
      "subbrandform",
      "base_channel",
      "short_channel",
      "channel_desc",
      "retailing",
    ];

    const finalizedMoved = await moveTableData(
      "psr_finalized_temp",
      "psr_data_finalized",
      finalizedColumns
    );

    // Move psr_data_temp → psr_data_historical
    const historicalColumns = [
      "document_no",
      "document_date",
      "subbrandform",
      "customer_name",
      "customer_code",
      "p_code",
      "customer_type",
      "category",
      "brand",
      "brandform",
      "retailing",
    ];

    const historicalMoved = await moveTableData(
      "psr_data_temp",
      "psr_data_historical",
      historicalColumns
    );

    // Insert into psr_change_flag if historical data moved
    if (historicalMoved > 0) {
      await prisma.psr_change_flag.create({
        data: { processed: false },
      });
    }

    // Generate filters AFTER finalized merge (not for historical)
    if (finalizedMoved > 0) {
      runGenerateFilters();
    }

    return res.status(200).json({
      message: "✅ Merge completed successfully",
      finalizedMoved,
      historicalMoved,
      success: true,
      timeStamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("❌ Merge error:", error);
    return res.status(500).json({ message: error?.message || error || "Failed to merge data", success: false, timeStamp: new Date().toISOString() });
  }
}
