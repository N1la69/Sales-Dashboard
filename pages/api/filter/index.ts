// pages/api/filter/index.ts
import prisma from "@/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

// 🔹 Helper to clean distinct values (remove null/empty/"NA")
const clean = (values: { [key: string]: string }[], key: string) =>
    values.map((v) => v[key]).filter((val) => val && val.trim().toUpperCase() !== "NA");

// 🔹 Role → allowed filter keys mapping
const roleFilters: Record<string, string[]> = {
    OWNER: ["branches", "zms", "rsms", "asms", "tsis"],
    ADMIN: ["branches", "zms", "rsms", "asms", "tsis"],
    ZM: ["branches", "rsms", "asms", "tsis"],
    RSM: ["branches", "asms", "tsis"],
    ASM: ["branches", "tsis"],
    TSI: ["branches"],
};

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        // -------------------------------
        // Step 1. Authenticate user from header
        // -------------------------------
        const userHeader = req.headers["x-user"] as string | undefined;
        if (!userHeader) {
            throw { message: "Unauthorized", status: 401 };
        }

        const { user } = JSON.parse(userHeader); // expect { id, name, email, role }
        console.log("✅ User in filter API:", user);

        // -------------------------------
        // Step 2. Build fiscal year & months
        // -------------------------------
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const startFiscalYear = currentMonth >= 7 ? currentYear : currentYear - 1;

        const years = Array.from({ length: 4 }, (_, i) => {
            const fyStart = startFiscalYear - i;
            const fyEnd = fyStart + 1;
            return `${fyStart}-${fyEnd.toString().slice(-2)}`;
        });

        const months = [7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6];

        // -------------------------------
        // Step 3. Role-based store filter
        // -------------------------------
        let storeWhere: Record<string, string> = {};
        switch (user.role) {
            case "OWNER":
            case "ADMIN":
                break; // ✅ See everything
            case "ZM":
                storeWhere = { ZM: user.name };
                break;
            case "RSM":
                storeWhere = { RSM: user.name };
                break;
            case "ASM":
                storeWhere = { ASM: user.name };
                break;
            case "TSI":
                storeWhere = { TSI: user.name };
                break;
            default:
                throw { message: "Invalid role", status: 403 };
        }

        // -------------------------------
        // Step 4. Fetch store data by role
        // -------------------------------
        const [branches, zms, rsms, asms, tsis] = await Promise.all([
            prisma.store_mapping.findMany({ where: storeWhere, distinct: ["Branch"], select: { Branch: true } }),
            prisma.store_mapping.findMany({ where: storeWhere, distinct: ["ZM"], select: { ZM: true } }),
            prisma.store_mapping.findMany({ where: storeWhere, distinct: ["RSM"], select: { RSM: true } }),
            prisma.store_mapping.findMany({ where: storeWhere, distinct: ["ASM"], select: { ASM: true } }),
            prisma.store_mapping.findMany({ where: storeWhere, distinct: ["TSI"], select: { TSI: true } }),
        ]);

        // -------------------------------
        // Step 5. Fetch global product mappings
        // -------------------------------
        const [categories, brands, brandforms, subbrandforms] = await Promise.all([
            prisma.product_mapping.findMany({ distinct: ["category"], select: { category: true } }),
            prisma.product_mapping.findMany({ distinct: ["brand"], select: { brand: true } }),
            prisma.product_mapping.findMany({ distinct: ["brandform"], select: { brandform: true } }),
            prisma.product_mapping.findMany({ distinct: ["subbrandform"], select: { subbrandform: true } }),
        ]);

        // -------------------------------
        // Step 6. Fetch global channels
        // -------------------------------
        const [channelDescs, baseChannels, shortChannels] = await Promise.all([
            prisma.channel_mapping.findMany({ distinct: ["channel_desc"], select: { channel_desc: true } }),
            prisma.channel_mapping.findMany({ distinct: ["base_channel"], select: { base_channel: true } }),
            prisma.channel_mapping.findMany({ distinct: ["short_channel"], select: { short_channel: true } }),
        ]);

        // -------------------------------
        // Step 7. Build full filter values
        // -------------------------------
        const allFilterValues = {
            years,
            months,
            categories: clean(categories, "category"),
            brands: clean(brands, "brand"),
            brandforms: clean(brandforms, "brandform"),
            subbrandforms: clean(subbrandforms, "subbrandform"),
            branches: clean(branches, "Branch"),
            zms: clean(zms, "ZM"),
            rsms: clean(rsms, "RSM"),
            asms: clean(asms, "ASM"),
            tsis: clean(tsis, "TSI"),
            channelDescs: clean(channelDescs, "channel_desc"),
            baseChannels: clean(baseChannels, "base_channel"),
            shortChannels: clean(shortChannels, "short_channel"),
        };

        // -------------------------------
        // Step 8. Restrict filters per role
        // -------------------------------
        const allowedKeys = roleFilters[user.role] || [];
        const filteredValues = Object.fromEntries(
            Object.entries(allFilterValues).filter(([k]) =>
                // Always allow product/channel filters, restrict store filters
                ["years", "months", "categories", "brands", "brandforms", "subbrandforms", "channelDescs", "baseChannels", "shortChannels"].includes(k) ||
                allowedKeys.includes(k)
            )
        );

        // -------------------------------
        // Step 9. Return response
        // -------------------------------
        return res.status(200).json({
            success: true,
            timeStamp: new Date().toISOString(),
            message: "Fetched filter values successfully",
            data: filteredValues,
        });
        //eslint-disable-next-line
    } catch (error: any) {
        console.error("❌ Error generating filter values:", error);
        return res.status(error?.status || 500).json({
            success: false,
            error: error?.message || "Server error while fetching filters",
            timeStamp: new Date().toISOString(),
        });
    }
}
