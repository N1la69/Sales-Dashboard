import { exec } from "child_process";
import path from "path";

/**
 * Executes the "generate:filters" script after data updates like uploads or merges.
 * Logs success or error output to the console.
 */
export function runGenerateFilters(): void {
  const cwd = path.resolve(process.cwd());

  exec("npm run generate:filters", { cwd }, (error, stdout, stderr) => {
    if (error) {
      console.error("❌ Failed to regenerate filters:", error.message);
      console.error(stderr);
      return;
    }

    console.log("✅ Filters regenerated successfully:\n", stdout);
  });
}
