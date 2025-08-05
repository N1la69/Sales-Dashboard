"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type Props = {
  value: { startDate: Date | null; endDate: Date | null };
  onChange: (dates: { startDate: Date | null; endDate: Date | null }) => void;
};

const DateRange: React.FC<Props> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(value.startDate);
  const [endDate, setEndDate] = useState<Date | null>(value.endDate);

  // Keep internal state in sync when external props change (especially after clearing)
  useEffect(() => {
    setStartDate(value.startDate);
    setEndDate(value.endDate);
  }, [value]);

  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onChange({ startDate: start, endDate: end });
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    onChange({ startDate: null, endDate: null });
    setOpen(false); // Close popover after clearing
  };

  const formatDate = (date: Date | null) =>
    date ? date.toISOString().split("T")[0] : "";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="py-2.5 rounded-xl border border-indigo-300 dark:border-indigo-700 bg-indigo-50/30 dark:bg-indigo-950/20 
                     focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all placeholder:text-indigo-400 
                     dark:placeholder:text-indigo-500 text-indigo-700 dark:text-indigo-200"
      >
        <Button variant="outline" className="justify-between">
          {startDate && endDate
            ? `From ${formatDate(startDate)} to ${formatDate(endDate)}`
            : "Select Date Range"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-2 space-y-2">
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={handleChange}
          inline
        />
        {(startDate || endDate) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="w-full"
          >
            Clear Date Range
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default DateRange;
