import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ProductMapping(
  setProductFile,
  resetMessages: () => void,
  productFile: File | null,
  uploadFile: (
    file: File,
    type: "psr" | "channel" | "store" | "product" | "gp",
    action?: "append" | "overwrite"
  ) => Promise<void>,
  loadingType: string,
  downloadTemplate: (
    type: "psr" | "channel" | "store" | "product" | "gp"
  ) => Promise<void>
) {
  return (
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
  );
}
