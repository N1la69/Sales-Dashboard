import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface MultiSelectProps {
  label: string;
  options: (string | number)[];
  selected: (string | number)[];
  onChange: (values: (string | number)[]) => void;
}

const MultiSelect = ({
  label,
  options,
  selected,
  onChange,
}: MultiSelectProps) => {
  const toggleSelection = (value: string | number) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder={`Select ${label}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option}
            value={option.toString()}
            onClick={() => toggleSelection(option)}
          >
            <span
              className={
                selected.includes(option) ? "font-bold text-primary" : ""
              }
            >
              {option}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MultiSelect;
