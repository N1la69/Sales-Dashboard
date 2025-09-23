import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/utils";

// --- batch size can be tuned depending on memory/locks ---
const BATCH_SIZE = 50000;

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

    if (inserted === 0) break; // ✅ no more rows

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
    // Move gp_data_temp → gp_data
    const finalizedColumns = [
      "document_date",
      "retailer_code",
      "retailer_name",
      "p3m_gp",
      "p1m_gp",
    ];

    const finalizedMoved = await moveTableData(
      "gp_data_temp",
      "gp_data",
      finalizedColumns
    );

    return res.status(200).json({
      message: "✅ Merge completed successfully",
      finalizedMoved,
      success: true,
      timeStamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("❌ Merge error:", error);
    return res.status(500).json({ message: error?.message || error || "Failed to merge data", success: false, timeStamp: new Date().toISOString() });
  }
}
