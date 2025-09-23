"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { upload } from "@vercel/blob/client";
import ExcelJS from "exceljs";
import { useState } from "react";
import { toast } from "react-toastify";
import UploadHistory from "./History";
import UploadPopup from "./UploadPopUp";
const UploadPage = () => {
  const [channelFile, setChannelFile] = useState<File | null>(null);
  const [storeFile, setStoreFile] = useState<File | null>(null);
  const [psrFile, setPsrFile] = useState<File | null>(null);
  const [gpFile, setGpFile] = useState<File | null>(null);
  const [productFile, setProductFile] = useState<File | null>(null);
  const [psrAction, setPsrAction] = useState<"append" | "overwrite">(
    "overwrite"
  );
  const [gpAction, setGpAction] = useState<"append" | "overwrite">("overwrite");
  const [loadingType, setLoadingType] = useState<
    | ""
    | "psr"
    | "gp"
    | "channel"
    | "store"
    | "product"
    | "merge-psr"
    | "merge-gp"
    | "clear"
    | "transform"
  >("");
  const [percentage, setPercentage] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetMessages = () => {
    setError("");
    setSuccess("");
  };

  const uploadContentFile = async (
    file: File,
    fileType: "psr" | "channel" | "store" | "product" | "gp"
  ) => {
    try {
      const fileResponse = await upload(
        `${fileType}/${new Date().getFullYear()}/${String(
          new Date().getMonth() + 1
        ).padStart(2, "0")}/${file.name}`,
        file,
        {
          access: "public",
          handleUploadUrl: "/api/file", // backend route for signed upload URL
          onUploadProgress: (progress) => setPercentage(progress.percentage),
        }
      );
      console.log("✅ File uploaded successfully:", fileResponse);
      return fileResponse;
    } catch (error: any) {
      console.error("❌ Error uploading file:", error);
      toast.error(error?.message || error || "File upload failed");
      throw error;
    } finally {
      setTimeout(() => setPercentage(0), 1000);
    }
  };

  const uploadFile = async (
    file: File,
    type: "psr" | "channel" | "store" | "product" | "gp",
    action: "append" | "overwrite" = "overwrite"
  ) => {
    if (!file) {
      throw new Error(`Please select a ${type} file to upload.`);
    }

    try {
      setLoadingType(type);
      const uploaded = await uploadContentFile(file, type);

      const body = {
        type,
        fileUrl: uploaded?.url || "",
        ...(type === "psr" ? { action } : {}),
      };

      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!data?.success) {
        toast.error(data?.message);
        return;
      }
      setSuccess(
        data?.message || `${type.toUpperCase()} data uploaded successfully.`
      );
      toast.success(
        data?.message || `${type.toUpperCase()} data uploaded successfully.`
      );
    } catch (err: any) {
      console.error("❌ Upload error:", err?.message || err);
      setError(
        err?.message || err || `An error occurred while uploading ${type} data.`
      );
      toast.error(
        err?.message || err || `An error occurred while uploading ${type} data.`
      );
    } finally {
      setLoadingType("");
    }
  };

  const handleTransformPsrData = async () => {
    setLoadingType("transform");
    resetMessages();

    try {
      const response = await fetch("/api/transform-psr", {
        method: "POST",
      });

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData.error || "Failed to transform PSR data.");
      }

      const resData = await response.json();
      setSuccess(resData.message);
      toast.success(resData.message || "PSR data transformed successfully.");
    } catch (err: any) {
      setError(err.message || "An error occurred while transforming data.");
      toast.error(
        err?.message || err || "An error occurred while transforming data."
      );
    } finally {
      setLoadingType("");
    }
  };

  const handleMergePsrData = async () => {
    setLoadingType("merge-psr");
    resetMessages();

    try {
      const response = await fetch("/api/merge-psr", {
        method: "POST",
      });

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData.error || "Failed to merge PSR data");
      }

      const resData = await response.json();
      setSuccess(resData.message);
      toast.success(resData.message || "PSR data merged successfully.");
    } catch (err: any) {
      setError(err.message || "An error occurred while merging data.");
      toast.error(
        err?.message || err || "An error occurred while merging data."
      );
    } finally {
      setLoadingType("");
    }
  };

  const handleMergeGpData = async () => {
    setLoadingType("merge-gp");
    resetMessages();

    try {
      const response = await fetch("/api/merge-gp", {
        method: "POST",
      });

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData.error || "Failed to merge GP data");
      }

      const resData = await response.json();
      setSuccess(resData.message);

      toast.success(resData.message || "GP data merged successfully.");
    } catch (error: any) {
      setError(error.message || "An error occurred while merging data.");
      toast.error(
        error?.message || error || "An error occurred while merging data."
      );
    } finally {
      setLoadingType("");
    }
  };

  const handleClearPsrTemp = async () => {
    setLoadingType("clear");
    resetMessages();

    try {
      const response = await fetch("/api/clear-psr-temp", {
        method: "POST",
      });

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData.error || "Failed to clear PSR temp data.");
      }

      const resData = await response.json();
      setSuccess(resData.message);
      toast.success(resData.message || "PSR temp data cleared successfully.");
    } catch (err: any) {
      setError(
        err.message || "An error occurred while clearing PSR temp data."
      );
      toast.error(
        err?.message || err || "An error occurred while clearing PSR temp data."
      );
    } finally {
      setLoadingType("");
    }
  };

  const handleClearGpTemp = async () => {
    setLoadingType("clear");
    resetMessages();

    try {
      const response = await fetch("/api/clear-gp-temp", {
        method: "POST",
      });

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData?.message || "Failed to clear GP temp data.");
      }

      const resData = await response.json();
      setSuccess(resData.message);
      toast.success(resData.message || "GP temp data cleared successfully.");
    } catch (error: any) {
      setError(
        error.message || "An error occurred while clearing GP temp data."
      );
      toast.error(
        error?.message ||
          error ||
          "An error occurred while clearing GP temp data."
      );
    } finally {
      setLoadingType("");
    }
  };

  async function downloadTemplate(
    type: "psr" | "channel" | "store" | "product" | "gp"
  ) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Template");

    // Define headers & sample rows for each type
    const templates: Record<string, { headers: string[]; sample: any[] }> = {
      psr: {
        headers: [
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
        ],
        sample: [
          "DOC123",
          "2025-09-01",
          "SubBrandX",
          "Test Store",
          "CUST001",
          101,
          "Retail",
          "CategoryA",
          "BrandY",
          "BrandFormZ",
          5000.75,
        ],
      },
      channel: {
        headers: [
          "customer_type",
          "base_channel",
          "short_channel",
          "channel_desc",
        ],
        sample: ["Retail", "Modern Trade", "MT", "Modern Trade Outlets"],
      },
      store: {
        headers: [
          "Old_Store_Code",
          "New_Store_Code",
          "customer_name",
          "customer_type",
          "Branch",
          "DSE_Code",
          "ZM",
          "RSM",
          "ASM",
          "TSI",
        ],
        sample: [
          "S001",
          "NS001",
          "Test Store",
          "Retail",
          "Kolkata",
          "DSE01",
          "ZM01",
          "RSM01",
          "ASM01",
          "TSI01",
        ],
      },
      product: {
        headers: [
          "p_code",
          "desc_short",
          "category",
          "brand",
          "brandform",
          "subbrandform",
        ],
        sample: [
          101,
          "Product Desc",
          "CategoryA",
          "BrandY",
          "FormZ",
          "SubBrandX",
        ],
      },
      gp: {
        headers: [
          "document_date",
          "retailer_code",
          "retailer_name",
          "p3m_gp",
          "p1m_gp",
        ],
        sample: ["2025-09-01", "BGNWS_007", "Store_name", 10, 2],
      },
    };

    const { headers, sample } = templates[type];

    // Add header row
    const headerRow = worksheet.addRow(headers);

    // Style the header row
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } }; // white text
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4472C4" }, // Excel blue
      };
      cell.alignment = { horizontal: "center", vertical: "middle" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Add sample row
    worksheet.addRow(sample);

    // Auto-fit columns
    worksheet.columns.forEach((col, i) => {
      col.width =
        Math.max(headers[i]?.length ?? 10, String(sample[i] ?? "").length) + 5;
    });

    // Export as blob & trigger download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}_template.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
  return (
    <div className="pt-3 px-4 sm:px-6 md:px-10 z-20 dark:text-blue-100">
      <h1 className="text-center text-2xl sm:text-3xl font-bold">
        Upload Analytics Data Here
      </h1>
      <UploadPopup
        filetype={loadingType.toUpperCase()}
        percentage={percentage}
      />
      {/* Status Messages */}
      {success && <p className="text-green-500 text-center mt-4">{success}</p>}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {/* PSR Data Upload */}
      <Card className="mt-6 border border-border bg-background shadow-xl dark:shadow-blue-900/10 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold dark:text-blue-100">
            Upload PSR Data
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <Input
            type="file"
            accept=".xlsx"
            onChange={(e) => {
              if (e.target.files) {
                setPsrFile(e.target.files[0]);
                resetMessages();
              }
            }}
            className="cursor-pointer border border-blue-200 dark:border-blue-700 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/20 file:text-blue-700 dark:file:text-blue-200 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/30"
          />

          <div className="flex flex-wrap gap-2">
            <Button
              variant={psrAction === "overwrite" ? "default" : "outline"}
              onClick={() => setPsrAction("overwrite")}
              className={`${
                psrAction === "overwrite"
                  ? "bg-indigo text-white hover:bg-indigo-hover"
                  : "border border-gray-200 text-gray-900 dark:text-gray-100 hover:border-indigo"
              }`}
            >
              Overwrite
            </Button>
            <Button
              variant={psrAction === "append" ? "default" : "outline"}
              onClick={() => setPsrAction("append")}
              className={`${
                psrAction === "append"
                  ? "bg-indigo text-white hover:bg-indigo-hover"
                  : "border border-gray-200 text-gray-900 dark:text-gray-100 hover:border-indigo"
              }`}
            >
              Append
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 mt-3">
            <Button
              onClick={() => psrFile && uploadFile(psrFile, "psr", psrAction)}
              disabled={loadingType === "psr"}
              className="bg-indigo text-white hover:bg-indigo-hover"
            >
              {loadingType === "psr" ? "Uploading..." : "Upload"}
            </Button>

            <Button
              onClick={handleTransformPsrData}
              disabled={loadingType === "transform"}
              className="bg-indigo text-white hover:bg-indigo-hover"
            >
              {loadingType === "transform"
                ? "Transforming..."
                : "Transform Temp Data"}
            </Button>

            <Button
              onClick={handleMergePsrData}
              disabled={loadingType === "merge-psr"}
              className="bg-indigo text-white hover:bg-indigo-hover"
            >
              {loadingType === "merge-psr"
                ? "Merging..."
                : "Merge to Main Data"}
            </Button>

            <Button
              onClick={handleClearPsrTemp}
              disabled={loadingType === "clear"}
              variant="destructive"
            >
              {loadingType === "clear" ? "Clearing..." : "Clear Temp Data"}
            </Button>

            <Button
              onClick={() => downloadTemplate("psr")}
              variant="outline"
              className="border border-gray-200 text-gray-900 dark:text-gray-100 hover:border-indigo"
            >
              Download Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* GP Data Upload */}
      <Card className="mt-6 border border-border bg-background shadow-xl dark:shadow-blue-900/10 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold dark:text-blue-100">
            Upload GP Data
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <Input
            type="file"
            accept=".xlsx"
            onChange={(e) => {
              if (e.target.files) {
                setGpFile(e.target.files[0]);
                resetMessages();
              }
            }}
            className="cursor-pointer border border-blue-200 dark:border-blue-700 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/20 file:text-blue-700 dark:file:text-blue-200 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/30"
          />

          <div className="flex flex-wrap gap-2">
            <Button
              variant={gpAction === "overwrite" ? "default" : "outline"}
              onClick={() => setGpAction("overwrite")}
              className={`${
                gpAction === "overwrite"
                  ? "bg-indigo text-white hover:bg-indigo-hover"
                  : "border border-gray-200 text-gray-900 dark:text-gray-100 hover:border-indigo"
              }`}
            >
              Overwrite
            </Button>
            <Button
              variant={gpAction === "append" ? "default" : "outline"}
              onClick={() => setGpAction("append")}
              className={`${
                gpAction === "append"
                  ? "bg-indigo text-white hover:bg-indigo-hover"
                  : "border border-gray-200 text-gray-900 dark:text-gray-100 hover:border-indigo"
              }`}
            >
              Append
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 mt-3">
            <Button
              onClick={() => gpFile && uploadFile(gpFile, "gp", gpAction)}
              disabled={loadingType === "gp"}
              className="bg-indigo text-white hover:bg-indigo-hover"
            >
              {loadingType === "gp" ? "Uploading..." : "Upload"}
            </Button>

            <Button
              onClick={handleMergeGpData}
              disabled={loadingType === "merge-gp"}
              className="bg-indigo text-white hover:bg-indigo-hover"
            >
              {loadingType === "merge-gp" ? "Merging..." : "Merge to Main Data"}
            </Button>

            <Button
              onClick={handleClearGpTemp}
              disabled={loadingType === "clear"}
              variant="destructive"
            >
              {loadingType === "clear" ? "Clearing..." : "Clear Temp Data"}
            </Button>

            <Button
              onClick={() => downloadTemplate("gp")}
              variant="outline"
              className="border border-gray-200 text-gray-900 dark:text-gray-100 hover:border-indigo"
            >
              Download Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Channel Mapping Upload */}
      <Card className="mt-6 border border-border bg-background shadow-xl dark:shadow-blue-900/10 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold dark:text-blue-100">
            Upload Channel Mapping Data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <Input
            type="file"
            accept=".xlsx"
            onChange={(e) => {
              if (e.target.files) {
                setChannelFile(e.target.files[0]);
                resetMessages();
              }
            }}
            className="cursor-pointer border border-blue-200 dark:border-blue-700 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/20 file:text-blue-700 dark:file:text-blue-200 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/30"
          />
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => channelFile && uploadFile(channelFile, "channel")}
              disabled={loadingType === "channel"}
              className="bg-indigo text-white hover:bg-indigo-hover"
            >
              {loadingType === "channel" ? "Uploading..." : "Upload"}
            </Button>

            <Button
              variant="outline"
              className="border border-indigo-400 dark:border-indigo-600 text-gray-900 dark:text-gray-100 hover:border-indigo"
              onClick={() =>
                window.open(`/api/download-mapping?type=channel`, "_blank")
              }
            >
              Download Channel Mapping
            </Button>

            <Button
              onClick={() => downloadTemplate("channel")}
              variant="outline"
              className="border border-gray-200 text-gray-900 dark:text-gray-100 hover:border-indigo"
            >
              Download Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Store Mapping Upload */}
      <Card className="mt-6 border border-border bg-background shadow-xl dark:shadow-blue-900/10 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold dark:text-blue-100">
            Upload Store Mapping Data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <Input
            type="file"
            accept=".xlsx"
            onChange={(e) => {
              if (e.target.files) {
                setStoreFile(e.target.files[0]);
                resetMessages();
              }
            }}
            className="cursor-pointer border border-blue-200 dark:border-blue-700 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/20 file:text-blue-700 dark:file:text-blue-200 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/30"
          />
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => storeFile && uploadFile(storeFile, "store")}
              disabled={loadingType === "store"}
              className="bg-indigo text-white hover:bg-indigo-hover"
            >
              {loadingType === "store" ? "Uploading..." : "Upload"}
            </Button>

            <Button
              variant="outline"
              className="border border-indigo-400 dark:border-indigo-600 text-gray-900 dark:text-gray-100 hover:border-indigo"
              onClick={() =>
                window.open(`/api/download-mapping?type=store`, "_blank")
              }
            >
              Download Store Mapping
            </Button>

            <Button
              onClick={() => downloadTemplate("store")}
              variant="outline"
              className="border border-gray-200 text-gray-900 dark:text-gray-100 hover:border-indigo"
            >
              Download Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Product Mapping Upload */}
      <Card className="mt-6 border border-border bg-background shadow-xl dark:shadow-blue-900/10 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold dark:text-blue-100">
            Upload Product Mapping Data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <Input
            type="file"
            accept=".xlsx"
            onChange={(e) => {
              if (e.target.files) {
                setProductFile(e.target.files[0]);
                resetMessages();
              }
            }}
            className="cursor-pointer border border-blue-200 dark:border-blue-700 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/20 file:text-blue-700 dark:file:text-blue-200 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/30"
          />
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => productFile && uploadFile(productFile, "product")}
              disabled={loadingType === "product"}
              className="bg-indigo text-white hover:bg-indigo-hover"
            >
              {loadingType === "product" ? "Uploading..." : "Upload"}
            </Button>

            <Button
              variant="outline"
              className="border border-indigo-400 dark:border-indigo-600 text-gray-900 dark:text-gray-100 hover:border-indigo"
              onClick={() =>
                window.open(`/api/download-mapping?type=product`, "_blank")
              }
            >
              Download Product Mapping
            </Button>

            <Button
              onClick={() => downloadTemplate("product")}
              variant="outline"
              className="border border-gray-200 text-gray-900 dark:text-gray-100 hover:border-indigo"
            >
              Download Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upload History */}
      <UploadHistory />
    </div>
  );
};

export default UploadPage;
