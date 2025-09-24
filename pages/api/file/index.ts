// pages/api/blob.ts
import { del, list } from "@vercel/blob";
import { handleUpload } from "@vercel/blob/client";
import type { NextApiRequest, NextApiResponse } from "next";

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
            return res.status(200).json({
                response,
                message: "File uploaded successfully",
                timeStamp: new Date().toISOString(),
                success: true
            });
        }

        // ✅ List files (GET)
        if (req.method === "GET") {
            const blobs = await list();
            return res.status(200).json({
                data: blobs?.blobs,
                message: "Files retrieved successfully",
                timeStamp: new Date().toISOString(),
                success: true
            });
        }

        // ✅ Delete a file (DELETE)
        if (req.method === "DELETE") {
            const { url } = req.query;
            if (!url || typeof url !== "string") throw { message: "File URL is required", status: 400 };

            await del(url);
            return res.status(200).json({
                success: true,
                timeStamp: new Date().toISOString(),
                data: url,
                message: "File deleted successfully"
            });
        }

        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        return res.status(405).json({
            message: `Method ${req.method} Not Allowed`,
            timeStamp: new Date().toISOString(),
            success: false,
        });
    } catch (err: any) {
        console.error("Blob API error:", err);
        return res.status(err?.status || 500).json({
            message: err?.message || err || "Internal Server Error",
            timeStamp: new Date().toISOString(),
            success: false
        });
    }
}
