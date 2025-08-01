import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface StoreSearchInputProps {
  value: string;
  onChange: (query: string) => void;
}

export default function StoreSearchInput({
  value,
  onChange,
}: StoreSearchInputProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-500 dark:text-indigo-300" />
      <Input
        type="text"
        placeholder="Enter Store Code"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 py-2.5 rounded-xl border border-indigo-300 dark:border-indigo-700 bg-indigo-50/30 dark:bg-indigo-950/20 
                   focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400 transition-all placeholder:text-indigo-400 
                   dark:placeholder:text-indigo-500 text-indigo-700 dark:text-indigo-200"
      />
    </div>
  );
}
