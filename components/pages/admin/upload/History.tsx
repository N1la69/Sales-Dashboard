import LoadingButton from "@/components/structures/LoadingButton";
import { ChevronRight, Download, FileText, Folder, Trash2 } from "lucide-react";
import path from "path";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type UploadHistoryData = {
  pathname: string; // e.g. "gp/2025/09_GP-Apr'25.xlsx"
  uploadedAt: string;
  size: number;
  downloadUrl: string;
};

// Helper: split into folders & files
function getChildren(path: string[], uploads: UploadHistoryData[]) {
  const children: {
    [key: string]: { type: "folder" | "file"; file?: UploadHistoryData };
  } = {};

  uploads.forEach((file) => {
    const parts = file.pathname.split("/");
    if (parts.length < path.length) return;
    if (!path.every((p, i) => parts[i] === p)) return;

    const next = parts[path.length];
    if (!next) return;

    if (parts.length === path.length + 1) {
      // file
      children[next] = { type: "file", file };
    } else {
      // folder
      children[next] = { type: "folder" };
    }
  });

  return children;
}

export default function UploadHistory() {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [uploads, setUploads] = useState<UploadHistoryData[]>([]);
  const [deleting, setDeleting] = useState<string[]>([]);
  useEffect(() => {
    fetch("/api/file")
      .then((res) => res.json())
      .then((data) =>
        setUploads(
          Array.from(data.data).filter(
            (item) => item.pathname !== "robots.txt"
          ) || []
        )
      )
      .catch((err) => {
        console.error("Error fetching upload history:", err);
        toast.error(err?.message || err || "Error fetching upload history");
      });
  }, []);

  const handleDelete = async (pathname: string) => {
    setDeleting((prev) => [...prev, pathname]);
    fetch(`/api/file?url=${encodeURIComponent(pathname)}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setUploads((prev) => prev.filter((f) => f.pathname !== pathname));
        toast.success(data?.message || "File deleted");
      })
      .catch((error) => toast.error(error?.message || "Failed to delete file"))
      .finally(() => setDeleting((prev) => prev.filter((p) => p !== pathname)));
  };

  const children = getChildren(currentPath, uploads);

  return (
    <div className="p-8 scale-[1.05] transition-transform">
      <h2 className="text-xl font-semibold mb-6 text-slate-800 dark:text-slate-100">
        Upload History
      </h2>

      {/* Breadcrumb */}
      <div className="mb-5 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
        <button
          onClick={() => setCurrentPath([])}
          className="hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
        >
          Home
        </button>
        {currentPath.map((p, idx) => (
          <React.Fragment key={idx}>
            <ChevronRight className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            <button
              onClick={() => setCurrentPath(currentPath.slice(0, idx + 1))}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
            >
              {p}
            </button>
          </React.Fragment>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-xl">
        {uploads.length === 0 ? (
          <p className="text-center text-slate-400 dark:text-slate-500 py-8">
            No uploads yet
          </p>
        ) : Object.keys(children).length === 0 ? (
          <p className="text-center text-slate-400 dark:text-slate-500 py-8">
            Empty folder
          </p>
        ) : (
          <div className="space-y-3">
            {Object.entries(children).map(([name, info]) =>
              info.type === "folder" ? (
                <div
                  key={name}
                  onClick={() => setCurrentPath([...currentPath, name])}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Folder className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium text-slate-700 dark:text-slate-200">
                    {name}
                  </span>
                </div>
              ) : (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-lg border px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                    <span className="font-mono text-sm text-slate-700 dark:text-slate-200">
                      {name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-slate-500 dark:text-slate-400">
                      {new Date(info.file?.uploadedAt || "").toLocaleString()}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {info.file
                        ? (info.file.size / 1024 / 1024).toFixed(2)
                        : "0"}{" "}
                      MB
                    </span>
                    <a
                      href={info.file?.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 rounded-md bg-indigo-600 px-2.5 py-1.5 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition"
                    >
                      <Download className="h-4 w-4" /> Download
                    </a>
                    <LoadingButton
                      onClick={() =>
                        info.file && handleDelete(info.file.pathname)
                      }
                      loading={deleting.includes(info.file?.pathname || "")}
                      loadingStyle="delete"
                      className="flex items-center gap-1 rounded-md bg-red-500 px-2.5 py-1.5 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition"
                    >
                      {deleting.includes(info.file?.pathname || "") ? (
                        "Deleting"
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4" /> Delete
                        </>
                      )}
                    </LoadingButton>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
