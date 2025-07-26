/* eslint-disable @typescript-eslint/no-explicit-any */

import type { NextApiRequest, NextApiResponse } from "next";
import { spawn } from "child_process";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const type = req.query.type as string;

  if (!type || !["forecast", "actual"].includes(type)) {
    return res.status(400).json({ error: "Invalid or missing 'type'" });
  }

  const scriptPath = path.join(process.cwd(), "python", "forecast.py");
  const python = spawn("python", [scriptPath, "--type", type]);

  let output = "";
  let error = "";

  python.stdout.on("data", (data) => {
    output += data.toString();
  });

  python.stderr.on("data", (data) => {
    error += data.toString();
  });

  python.on("close", (code) => {
    if (code !== 0) {
      console.error("Python error:", error);
      return res
        .status(500)
        .json({ error: "Forecast script failed", details: error });
    }

    if (error) {
      console.warn("Python warning:", error); // log non-critical warnings
    }

    try {
      const result = JSON.parse(output);
      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(500)
        .json({ error: error || "Invalid JSON", raw: output });
    }
  });
}
