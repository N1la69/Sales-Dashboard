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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePsrFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPsrFile(e.target.files[0]);
      setError("");
      setSuccess("");
    }
  };

  const handleChannelFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setChannelFile(e.target.files[0]);
      setError("");
      setSuccess("");
    }
  };

  const handleStoreFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setStoreFile(e.target.files[0]);
      setError("");
      setSuccess("");
    }
  };

  const handlePsrUpload = async () => {
    if (!psrFile) {
      setError("Please select a PSR data file to upload.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("file", psrFile);
      formData.append("type", "psr");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData.error || "Failed to upload PSR data");
      }

      const resData = await response.json();
      setSuccess(`PSR Data Upload Successful: ${resData.rowsParsed} rows`);
    } catch (err: any) {
      setError(err.message || "An error occurred during PSR upload.");
    } finally {
      setLoading(false);
    }
  };

  const handleChannelUpload = async () => {
    if (!channelFile) {
      setError("Please select a channel mapping file to upload.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("file", channelFile);
      formData.append("type", "channel");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const responseText = await response.text();
      console.log("Raw upload response:", responseText);

      if (!response.ok) {
        throw new Error("Failed to upload channel mapping");
      }

      const resData = JSON.parse(responseText);
      setSuccess(`Upload successful: ${resData.rowsParsed} rows processed`);
    } catch (err: any) {
      setError(err.message || "An error occurred during upload.");
    } finally {
      setLoading(false);
    }
  };

  const handleStoreUpload = async () => {
    if (!storeFile) {
      setError("Please select a store mapping file to upload.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("file", storeFile);
      formData.append("type", "store");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData.error || "Failed to upload store mapping");
      }

      const resData = await response.json();
      setSuccess(
        `Store mapping upload successful: ${resData.rowsParsed} rows processed`
      );
    } catch (err: any) {
      setError(err.message || "An error occurred during store mapping upload.");
    } finally {
      setLoading(false);
    }
  };

  const handleMergePsrData = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

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
      setLoading(false);
    }
  };

  return (
    <div className="pt-3 mx-5 z-10 dark:text-gray-200">
      <h1 className="text-center text-2xl font-bold">
        Upload Analytics Data Here
      </h1>

      {/* PSR Data Upload */}
      <Card className="shadow-lg mt-5">
        <CardHeader>
          <CardTitle>Upload PSR Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="file"
            accept=".xlsx"
            onChange={handlePsrFileChange}
            className="cursor-pointer border border-amber-100"
          />
          <div className="flex space-x-3">
            <Button
              className="cursor-pointer"
              onClick={handlePsrUpload}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </Button>

            <Button
              className="cursor-pointer"
              onClick={handleMergePsrData}
              disabled={loading}
            >
              {loading ? "Merging..." : "Merge to Main Data"}
            </Button>

            <Button disabled>Download Template</Button>
          </div>
        </CardContent>
      </Card>

      {/* Channel Mapping Data Upload */}
      <Card className="shadow-lg mt-5">
        <CardHeader>
          <CardTitle>Upload Channel Mapping Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="file"
            accept=".xlsx"
            onClick={() => console.log("Clicked")}
            onChange={handleChannelFileChange}
            className="cursor-pointer border border-amber-100"
          />
          <div className="flex space-x-3">
            <Button
              className="cursor-pointer"
              onClick={handleChannelUpload}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </Button>
            <Button disabled>Download Template</Button>
          </div>
        </CardContent>
      </Card>

      {/* Store Mapping Data Upload */}
      <Card className="shadow-lg mt-5">
        <CardHeader>
          <CardTitle>Upload Store Mapping Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="file"
            accept=".xlsx"
            onChange={handleStoreFileChange}
            className="cursor-pointer border border-amber-100"
          />
          <div className="flex space-x-3">
            <Button onClick={handleStoreUpload} disabled={loading}>
              {loading ? "Uploading..." : "Upload"}
            </Button>
            <Button disabled>Download Template</Button>
          </div>
        </CardContent>
      </Card>

      {/* Success Message */}
      {success && <p className="text-green-500 text-center mt-4">{success}</p>}

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default UploadPage;
