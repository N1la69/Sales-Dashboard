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
  const [loadingType, setLoadingType] = useState<
    "" | "psr" | "channel" | "store" | "merge"
  >("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetMessages = () => {
    setError("");
    setSuccess("");
  };

  const uploadFile = async (file: File, type: "psr" | "channel" | "store") => {
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

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData.error || `Failed to upload ${type} data`);
      }

      setSuccess(
        `${type.toUpperCase()} file received. Processing in background.`
      );
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

  return (
    <div className="pt-3 mx-5 z-20 dark:text-gray-200">
      <h1 className="text-center text-2xl font-bold">
        Upload Analytics Data Here
      </h1>

      {/* PSR Data Upload */}
      <Card className="mt-5 border border-border bg-background shadow-xl dark:shadow-blue-900/10 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold dark:text-gray-200">
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
            className="cursor-pointer border border-primary/30 dark:border-primary/50 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
          />
          <div className="flex space-x-3">
            <Button
              onClick={() => psrFile && uploadFile(psrFile, "psr")}
              disabled={loadingType === "psr"}
            >
              {loadingType === "psr" ? "Uploading..." : "Upload"}
            </Button>

            <Button
              onClick={handleMergePsrData}
              disabled={loadingType === "merge"}
            >
              {loadingType === "merge" ? "Merging..." : "Merge to Main Data"}
            </Button>

            <Button variant="outline" disabled>
              Download Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Channel Mapping Upload */}
      <Card className="mt-5 border border-border bg-background shadow-xl dark:shadow-blue-900/10 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold dark:text-gray-200">
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
            className="cursor-pointer border border-primary/30 dark:border-primary/50 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
          />
          <div className="flex space-x-3">
            <Button
              onClick={() => channelFile && uploadFile(channelFile, "channel")}
              disabled={loadingType === "channel"}
            >
              {loadingType === "channel" ? "Uploading..." : "Upload"}
            </Button>

            <Button variant="outline" disabled>
              Download Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Store Mapping Upload */}
      <Card className="mt-5 border border-border bg-background shadow-xl dark:shadow-blue-900/10 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold dark:text-gray-200">
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
            className="cursor-pointer border border-primary/30 dark:border-primary/50 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
          />
          <div className="flex space-x-3">
            <Button
              onClick={() => storeFile && uploadFile(storeFile, "store")}
              disabled={loadingType === "store"}
            >
              {loadingType === "store" ? "Uploading..." : "Upload"}
            </Button>

            <Button variant="outline" disabled>
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
