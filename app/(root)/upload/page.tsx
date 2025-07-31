"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UploadPage = () => {
  const [channelFile, setChannelFile] = useState<File | null>(null);
  const [storeFile, setStoreFile] = useState<File | null>(null);
  const [psrFile, setPsrFile] = useState<File | null>(null);
  const [psrAction, setPsrAction] = useState<"append" | "overwrite">(
    "overwrite"
  );
  const [loadingType, setLoadingType] = useState<
    "" | "psr" | "channel" | "store" | "merge" | "clear"
  >("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetMessages = () => {
    setError("");
    setSuccess("");
  };

  const uploadFile = async (
    file: File,
    type: "psr" | "channel" | "store",
    action: "append" | "overwrite" = "overwrite"
  ) => {
    if (!file) {
      setError(`Please select a ${type} file to upload.`);
      return;
    }

    setLoadingType(type);
    resetMessages();

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      if (type === "psr") {
        formData.append("action", action);
      }

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData.error || `Failed to upload ${type} data`);
      }

      setSuccess(`${type.toUpperCase()} file uploaded successfully!`);
    } catch (err: any) {
      setError(err.message || `An error occurred during ${type} upload.`);
    } finally {
      setLoadingType("");
    }
  };

  const handleMergePsrData = async () => {
    setLoadingType("merge");
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
    } catch (err: any) {
      setError(err.message || "An error occurred while merging data.");
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
    } catch (err: any) {
      setError(
        err.message || "An error occurred while clearing PSR temp data."
      );
    } finally {
      setLoadingType("");
    }
  };

  return (
    <div className="pt-3 px-4 sm:px-6 md:px-10 z-20 dark:text-blue-100">
      <h1 className="text-center text-2xl sm:text-3xl font-bold">
        Upload Analytics Data Here
      </h1>

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
              onClick={handleMergePsrData}
              disabled={loadingType === "merge"}
              className="bg-indigo text-white hover:bg-indigo-hover"
            >
              {loadingType === "merge" ? "Merging..." : "Merge to Main Data"}
            </Button>

            <Button
              onClick={handleClearPsrTemp}
              disabled={loadingType === "clear"}
              variant="destructive"
            >
              {loadingType === "clear" ? "Clearing..." : "Clear Temp Data"}
            </Button>

            <Button
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
              className="border border-gray-200 text-gray-900 dark:text-gray-100 hover:border-indigo"
            >
              Download Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Status Messages */}
      {success && <p className="text-green-500 text-center mt-4">{success}</p>}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default UploadPage;
