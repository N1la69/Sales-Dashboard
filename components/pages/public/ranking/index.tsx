"use client";

import { gql, useQuery } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import filterValues from "@/constants/filterValues";
import { format, set } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useAppContext } from "@/hooks/AppContext";

// ================= GraphQL Queries =================
const GET_TOP_STORES = gql`
  query GetTopStores(
    $source: String!
    $months: Int
    $zm: String
    $rsm: String
    $asm: String
    $category: String
    $branch: String
    $baseChannel: String
    $shortChannel: String
    $channelDesc: String
    $brand: String
    $brandform: String
    $startDate: String
    $endDate: String
  ) {
    topStores(
      source: $source
      months: $months
      zm: $zm
      rsm: $rsm
      asm: $asm
      category: $category
      branch: $branch
      baseChannel: $baseChannel
      shortChannel: $shortChannel
      channelDesc: $channelDesc
      brand: $brand
      brandform: $brandform
      startDate: $startDate
      endDate: $endDate
    ) {
      stores {
        store_code
        store_name
        branch_name
        channel_desc
        average_retailing
      }
    }
  }
`;

// ================= Types =================
type FilterKey =
  | "zm"
  | "rsm"
  | "asm"
  | "branch"
  | "category"
  | "brand"
  | "brandform"
  | "baseChannel"
  | "shortChannel"
  | "channelDesc";

interface Filters {
  zm?: string;
  rsm?: string;
  asm?: string;
  branch?: string;
  baseChannel?: string;
  shortChannel?: string;
  channelDesc?: string;
  brand?: string;
  brandform?: string;
  category?: string;
  months: number;
  startDate?: Date;
  endDate?: Date;
}

// ================= Component =================
const RankingPage = () => {
  const [dataSource, setDataSource] = useState<"combined" | "main" | "temp">(
    "combined"
  );

  const [allStores, setAllStores] = useState<any[]>([]);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const [months, setMonths] = useState(3);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const startDate = dateRange?.from;
  const endDate = dateRange?.to;

  const [pendingFilters, setPendingFilters] = useState<Filters>({
    zm: undefined,
    rsm: undefined,
    asm: undefined,
    branch: undefined,
    baseChannel: undefined,
    shortChannel: undefined,
    channelDesc: undefined,
    brand: undefined,
    brandform: undefined,
    category: undefined,
    months: 3,
    startDate: undefined,
    endDate: undefined,
  });

  const [appliedFilters, setAppliedFilters] = useState<Filters>(pendingFilters);

  const [page, setPage] = useState(0);
  const pageSize = 20;
  const { state } = useAppContext();
  const isUserAdmin = state?.user?.user?.role === "ADMIN" ? true : false;

  const handleSourceChange = (source: "combined" | "main" | "temp") => {
    setDataSource(source);
  };

  const { data, loading, error } = useQuery(GET_TOP_STORES, {
    variables: {
      source: dataSource,
      months:
        appliedFilters.startDate && appliedFilters.endDate
          ? undefined
          : appliedFilters.months,
      zm: appliedFilters.zm,
      rsm: appliedFilters.rsm,
      asm: appliedFilters.asm,
      category: appliedFilters.category,
      branch: appliedFilters.branch,
      baseChannel: appliedFilters.baseChannel,
      shortChannel: appliedFilters.shortChannel,
      channelDesc: appliedFilters.channelDesc,
      brand: appliedFilters.brand,
      brandform: appliedFilters.brandform,
      startDate: appliedFilters.startDate
        ? appliedFilters.startDate.toISOString().slice(0, 10)
        : undefined,
      endDate: appliedFilters.endDate
        ? appliedFilters.endDate.toISOString().slice(0, 10)
        : undefined,
    },
    fetchPolicy: "network-only",
  });

  const paginatedStores = allStores.slice(
    page * pageSize,
    (page + 1) * pageSize
  );

  const handleExcelDownload = async () => {
    try {
      setDownloadLoading(true);

      const rows = allStores;
      if (!rows || rows.length === 0) {
        alert("No data available to download");
        return;
      }

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Top Stores");
      worksheet.columns = [
        { header: "Store Code", key: "store_code", width: 20 },
        { header: "Store Name", key: "store_name", width: 30 },
        { header: "Branch Name", key: "branch_name", width: 30 },
        { header: "Channel", key: "channel_desc", width: 30 },
        { header: "Average Retailing", key: "average_retailing", width: 20 },
      ];
      // Add rows
      rows.forEach(
        (row: {
          store_code: string;
          store_name: string;
          branch_name: string;
          channel_desc: string;
          average_retailing: number;
        }) => {
          worksheet.addRow(row);
        }
      );
      // Style header row
      const headerRow = worksheet.getRow(1);
      headerRow.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFFCC00" }, // Yellow fill
        };
        cell.alignment = { vertical: "middle", horizontal: "center" };
        cell.font = { bold: true };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });

      // Center align all data cells
      worksheet.eachRow({ includeEmpty: false }, (row) => {
        row.eachCell((cell) => {
          cell.alignment = { vertical: "middle", horizontal: "center" };
        });
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "top_stores.xlsx");
    } catch (error: any) {
      console.error("Error downloading Excel file:", error);
      alert("Failed to download Excel file. Please try again.");
      return;
    } finally {
      setDownloadLoading(false);
    }
  };

  useEffect(() => {
    if (data?.topStores?.stores) {
      setAllStores(data.topStores.stores);
      setPage(0);
    }
  }, [data]);

  return (
    <div className="relative pt-3 px-4 sm:px-6 md:px-10 z-10 text-gray-900 dark:text-gray-200">
      {/* TITLE */}
      <div className="text-left md:text-center space-y-1 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">
          Top 100 Stores
        </h1>
        <p className="text-sm sm:text-lg text-muted-foreground font-medium">
          Generate rankings based on average retailing
        </p>
      </div>

      {/* Data Source Dropdown */}
      {isUserAdmin && (
        <div className="absolute top-3 right-3 md:right-4 md:top-5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="cursor-pointer border-indigo-300 dark:border-indigo-700 bg-indigo-500 dark:bg-indigo-200 text-indigo-50 dark:text-indigo-900"
              >
                {dataSource.charAt(0).toUpperCase() + dataSource.slice(1)} DB
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36">
              {["combined", "main", "temp"].map((source) => (
                <DropdownMenuItem
                  key={source}
                  onClick={() =>
                    handleSourceChange(source as "combined" | "main" | "temp")
                  }
                  className={`cursor-pointer ${
                    dataSource === source
                      ? "bg-indigo-100 dark:bg-indigo-900 font-semibold"
                      : ""
                  }`}
                >
                  {source.charAt(0).toUpperCase() + source.slice(1)} DB
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* FILTERS */}
      <div className="flex flex-wrap gap-3 sm:gap-4 mb-4">
        <Input
          type="number"
          value={pendingFilters.months}
          onChange={(e) =>
            setPendingFilters((prev) => ({
              ...prev,
              months: parseInt(e.target.value) || 3,
            }))
          }
          placeholder="Months"
          className="w-28 sm:w-32 py-2.5 rounded-xl border border-indigo-300 dark:border-indigo-700 bg-indigo-50/30 dark:bg-indigo-950/20 
                   focus:ring-indigo-500 dark:focus:ring-indigo-400 placeholder:text-indigo-400 
                   dark:placeholder:text-indigo-500 text-indigo-700 dark:text-indigo-200"
          disabled={!!pendingFilters.startDate && !!pendingFilters.endDate}
        />

        {/* Date Range Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant="outline"
              className="w-[250px] sm:w-[260px] py-2.5 rounded-xl border border-indigo-300 dark:border-indigo-700 bg-indigo-50/30 dark:bg-indigo-950/20 
                     text-indigo-700 dark:text-indigo-200 justify-start text-left font-normal cursor-pointer"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {pendingFilters.startDate && pendingFilters.endDate ? (
                `${format(pendingFilters.startDate, "LLL dd, yyyy")} - ${format(
                  pendingFilters.endDate,
                  "LLL dd, yyyy"
                )}`
              ) : (
                <span>Select date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="range"
              selected={{
                from: pendingFilters.startDate
                  ? new Date(pendingFilters.startDate)
                  : undefined,
                to: pendingFilters.endDate
                  ? new Date(pendingFilters.endDate)
                  : undefined,
              }}
              onSelect={(range) =>
                setPendingFilters((prev) => ({
                  ...prev,
                  startDate: range?.from,
                  endDate: range?.to,
                }))
              }
            />
          </PopoverContent>
        </Popover>

        {/* Select Filters */}
        {(
          [
            "zm",
            "rsm",
            "asm",
            "branch",
            "category",
            "brand",
            "brandform",
            "baseChannel",
            "shortChannel",
            "channelDesc",
          ] as FilterKey[]
        ).map((key, i) => {
          const labels = [
            "Select ZM",
            "Select RSM",
            "Select ASM",
            "Select Branch",
            "Select Category",
            "Select Brand",
            "Select Brandform",
            "Select Base Channel",
            "Select Short Channel",
            "Select Channel Desc.",
          ];

          const lists = [
            filterValues.zms,
            filterValues.rsms,
            filterValues.asms,
            filterValues.branches,
            filterValues.categories,
            filterValues.brands,
            filterValues.brandforms,
            filterValues.baseChannels,
            filterValues.shortChannels,
            filterValues.channelDescs,
          ];

          return (
            <Select
              key={key}
              value={pendingFilters[key] || ""}
              onValueChange={(val) =>
                setPendingFilters((prev) => ({
                  ...prev,
                  [key]: val === "" ? undefined : val,
                }))
              }
            >
              <SelectTrigger className="w-40 sm:w-48 py-2.5 rounded-xl border border-indigo-300 dark:border-indigo-700 bg-indigo-50/30 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-200 cursor-pointer">
                <SelectValue placeholder={labels[i]} />
              </SelectTrigger>
              <SelectContent>
                {lists[i].map((option: string) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        })}

        {/* Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            className="bg-indigo-600/80 text-white hover:bg-indigo-800 cursor-pointer"
            onClick={() => {
              setAppliedFilters(pendingFilters);
              setPage(0);
            }}
          >
            Apply Filters
          </Button>

          <Button
            variant="default"
            onClick={() => {
              const cleared = {
                zm: undefined,
                rsm: undefined,
                asm: undefined,
                branch: undefined,
                baseChannel: undefined,
                shortChannel: undefined,
                channelDesc: undefined,
                brand: undefined,
                brandform: undefined,
                category: undefined,
                months: 3,
                startDate: undefined,
                endDate: undefined,
              };
              setPendingFilters(cleared);
              setAppliedFilters(cleared);
            }}
            className="bg-indigo-600/80 text-white hover:bg-indigo-800 cursor-pointer"
          >
            Clear Filters
          </Button>

          <Button
            onClick={handleExcelDownload}
            disabled={downloadLoading}
            className="bg-indigo-600/80 text-white hover:bg-indigo-800 cursor-pointer"
          >
            {downloadLoading ? "Downloading..." : "Download Excel"}
          </Button>
        </div>
      </div>

      {/* MAIN TABLE */}
      <section className="py-4">
        {loading ? (
          <p>Loading top stores...</p>
        ) : error ? (
          <p>Error loading top stores: {error.message}</p>
        ) : (
          <>
            <div className="overflow-x-auto rounded-xl border border-indigo-300 dark:border-indigo-700">
              <table className="min-w-full text-sm text-indigo-800 dark:text-indigo-200 border-collapse">
                <thead className="bg-indigo-100/50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
                  <tr>
                    <th className="px-4 py-2 border-b border-indigo-200 dark:border-indigo-700 text-left">
                      Sl. No.
                    </th>
                    <th className="px-4 py-2 border-b border-indigo-200 dark:border-indigo-700 text-left">
                      Store Code
                    </th>
                    <th className="px-4 py-2 border-b border-indigo-200 dark:border-indigo-700 text-left">
                      Store Name
                    </th>
                    <th className="px-4 py-2 border-b border-indigo-200 dark:border-indigo-700 text-left">
                      Branch Name
                    </th>
                    <th className="px-4 py-2 border-b border-indigo-200 dark:border-indigo-700 text-left">
                      Channel
                    </th>
                    <th className="px-4 py-2 border-b border-indigo-200 dark:border-indigo-700 text-right">
                      Avg. Retailing
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedStores.map((store: any, idx: number) => (
                    <tr
                      key={idx}
                      className={`${
                        idx % 2 === 0
                          ? "bg-indigo-50/30 dark:bg-indigo-950/20"
                          : "bg-white dark:bg-zinc-900"
                      } border-t border-indigo-200 dark:border-indigo-700`}
                    >
                      <td className="px-4 py-2 text-left">
                        {page * pageSize + idx + 1}
                      </td>
                      <td className="px-4 py-2 text-left">
                        {store.store_code}
                      </td>
                      <td className="px-4 py-2 text-left">
                        {store.store_name}
                      </td>
                      <td className="px-4 py-2 text-left">
                        {store.branch_name}
                      </td>
                      <td className="px-4 py-2 text-left">
                        {store.channel_desc}
                      </td>
                      <td className="px-4 py-2 text-right">
                        ₹ {store.average_retailing.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 px-2">
              <Button
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
                disabled={page === 0}
                className="rounded-xl border border-indigo-300 dark:border-indigo-700 bg-indigo-50/30 hover:bg-indigo-700/30 dark:bg-indigo-950/20 dark:hover:bg-indigo-400/30 text-indigo-700 dark:text-indigo-200"
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Prev
              </Button>

              <span>
                Page {allStores.length > 0 ? page + 1 : 0} of{" "}
                {Math.max(1, Math.ceil(allStores.length / pageSize))}
              </span>

              <Button
                onClick={() =>
                  setPage((p) =>
                    (p + 1) * pageSize < allStores.length ? p + 1 : p
                  )
                }
                disabled={
                  allStores.length === 0 ||
                  (page + 1) * pageSize >= allStores.length
                }
                className="rounded-xl border border-indigo-300 dark:border-indigo-700 bg-indigo-50/30 hover:bg-indigo-700/30 dark:bg-indigo-950/20 dark:hover:bg-indigo-400/30 text-indigo-700 dark:text-indigo-200"
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default RankingPage;
