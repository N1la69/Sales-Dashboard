"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UploadPage = () => {
  const [channelFile, setChannelFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChannelFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setChannelFile(e.target.files[0]);
      setError("");
      setSuccess("");
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

  return (
    <div className="pt-3 mx-5 z-10 dark:text-gray-200">
      <h1 className="text-center text-2xl font-bold">
        Upload Analytics Data Here
      </h1>

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

      {/* Success Message */}
      {success && <p className="text-green-500 text-center mt-4">{success}</p>}

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default UploadPage;
