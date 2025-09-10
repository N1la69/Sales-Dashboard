// pages/api/blob.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { handleUpload } from "@vercel/blob/client";
import { del, list } from "@vercel/blob";

// 🔑 API Handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // ✅ Upload a file (POST)
        if (req.method === "POST") {
            const body = req.body;

            const response = await handleUpload({
                body,
                request: req,
                onBeforeGenerateToken: async () => ({
                    allowedContentTypes: [
                        "application/vnd.ms-excel", // .xls
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
                        "text/csv",
                    ],
                    tokenPayload: req.headers["x-user"] as string, // already stringified JSON
                    // addRandomSuffix: true,
                    allowOverwrite: true,

                }),
                onUploadCompleted: async ({ tokenPayload, blob }) => {
                    console.log("Uploaded:", blob.url);
                    console.log("Metadata:", blob.pathname);
                    console.log("Token Payload:", tokenPayload);
                },
            });
            return res.status(200).json(response);
        }

        // ✅ List files (GET)
        if (req.method === "GET") {
            const blobs = await list();
            return res.status(200).json({
                data: blobs,
                message: "Files retrieved successfully",
                success: true
            });
        }

        // ✅ Delete a file (DELETE)
        if (req.method === "DELETE") {
            const { url } = req.query;
            if (!url || typeof url !== "string") {
                return res.status(400).json({ error: "Missing ?url= param" });
            }

            await del(url, {

            });
            return res.status(200).json({
                success: true,
                data: url,
                message: "File deleted successfully"
            });
        }

        return res.status(405).json({ message: "Method Not Allowed", success: false });
    } catch (err: any) {
        console.error("Blob API error:", err);
        return res.status(500).json({ message: err.message || err || "Internal Server Error", success: false });
    }
}
