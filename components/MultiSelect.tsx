"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface MultiSelectProps {
  label: string;
  options: (string | number)[];
  selected: (string | number)[];
  onChange: (values: (string | number)[]) => void;
}

export default function MultiSelect({
  label,
  options,
  selected,
  onChange,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);

  const handleToggle = (option: string | number) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-between">
          {selected.length === 0
            ? `Select ${label}`
            : selected.length === 1
            ? `${label}: ${selected[0]}`
            : `${label}: ${selected.length} selected`}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="">
        <div className="flex flex-col space-y-2 max-h-64 overflow-y-auto">
          {options.map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <Checkbox
                checked={selected.includes(option)}
                onCheckedChange={() => handleToggle(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
