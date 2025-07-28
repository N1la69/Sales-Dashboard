import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2 } from "lucide-react";

interface BranchSelectorProps {
  branches: string[];
  selectedBranch: string;
  onChange: (branch: string) => void;
}

export default function BranchSelector({
  branches,
  selectedBranch,
  onChange,
}: BranchSelectorProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-500 dark:text-indigo-300 z-10" />
      <Select
        value={selectedBranch || "ALL"}
        onValueChange={(val) => onChange(val === "ALL" ? "" : val)}
      >
        <SelectTrigger
          className="pl-10 py-2.5 rounded-xl border border-indigo-300 dark:border-indigo-700 bg-indigo-50/30 dark:bg-indigo-950/20 
                     focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all placeholder:text-indigo-400 
                     dark:placeholder:text-indigo-500 text-indigo-700 dark:text-indigo-200"
        >
          <SelectValue placeholder="Select Branch" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-zinc-900 text-indigo-800 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-700">
          <SelectItem value="ALL">All Branches</SelectItem>
          {branches.map((branch) => (
            <SelectItem key={branch} value={branch}>
              {branch}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
