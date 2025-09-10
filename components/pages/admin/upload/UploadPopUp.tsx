import { CheckCircle2, Upload } from "lucide-react";

export default function UploadPopup({ filetype = "File", percentage = 0 }) {
  if (!percentage) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white shadow-2xl p-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md">
            {percentage === 100 ? (
              <CheckCircle2 className="h-6 w-6 text-white" />
            ) : (
              <Upload className="h-6 w-6 text-white animate-pulse" />
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              {filetype} Upload
            </h3>
            <p className="text-xs text-slate-500">
              {percentage === 100 ? "Completed" : "Uploading..."}
            </p>
          </div>
        </div>

        {/* progress bar */}
        <div className="mt-4 w-full overflow-hidden rounded-lg bg-slate-100">
          <div
            className="h-3 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="mt-2 text-right text-xs text-slate-500">
          {percentage}%
        </div>
      </div>
    </div>
  );
}
