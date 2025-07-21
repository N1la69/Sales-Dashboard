import { Input } from "@/components/ui/input";

interface StoreSearchInputProps {
  value: string;
  onChange: (query: string) => void;
}

export default function StoreSearchInput({
  value,
  onChange,
}: StoreSearchInputProps) {
  return (
    <div>
      <Input
        type="text"
        placeholder="Store Code"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
