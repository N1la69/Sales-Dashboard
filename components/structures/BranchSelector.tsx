import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <Select
      value={selectedBranch || "ALL"}
      onValueChange={(val) => onChange(val === "ALL" ? "" : val)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Branch" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ALL">All Branches</SelectItem>
        {branches.map((branch) => (
          <SelectItem key={branch} value={branch}>
            {branch}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
