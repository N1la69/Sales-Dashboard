/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { gql, useQuery, useLazyQuery } from "@apollo/client";
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
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import client from "@/lib/apollo-client";

// ================= GraphQL Queries =================
const GET_TOP_STORES = gql`
  query GetTopStores(
    $source: String!
    $months: Int
    $zm: String
    $sm: String
    $be: String
    $category: String
    $branch: String
    $broadChannel: String
    $brand: String
    $startDate: String
    $endDate: String
    $page: Int!
    $pageSize: Int!
  ) {
    topStores(
      source: $source
      months: $months
      zm: $zm
      sm: $sm
      be: $be
      category: $category
      branch: $branch
      broadChannel: $broadChannel
      brand: $brand
      startDate: $startDate
      endDate: $endDate
      page: $page
      pageSize: $pageSize
    ) {
      totalCount
      stores {
        store_code
        store_name
        branch_name
        average_retailing
      }
    }
  }
`;

const GET_DOWNLOAD_TOP_STORES = gql`
  query DownloadTopStores(
    $source: String!
    $months: Int!
    $zm: String
    $sm: String
    $be: String
    $category: String
    $branch: String
    $broadChannel: String
    $brand: String
    $startDate: String
    $endDate: String
  ) {
    downloadTopStores(
      source: $source
      months: $months
      zm: $zm
      sm: $sm
      be: $be
      category: $category
      branch: $branch
      broadChannel: $broadChannel
      brand: $brand
      startDate: $startDate
      endDate: $endDate
    ) {
      store_code
      store_name
      branch_name
      average_retailing
    }
  }
`;

// ================= Reusable Styles =================
const selectFilterTriggerStyles =
  "rounded-xl cursor-pointer border border-indigo-300 dark:border-indigo-700 bg-indigo-50/30 dark:bg-indigo-950/20 py-2.5 px-4 text-indigo-700 dark:text-indigo-200 placeholder:text-indigo-400 dark:placeholder:text-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all";

const selectFilterContentStyles =
  "bg-white dark:bg-zinc-900 border border-indigo-200 dark:border-indigo-700 text-indigo-800 dark:text-indigo-200";

// ================= Component =================
const RankingPage = () => {
  const [dataSource, setDataSource] = useState<"combined" | "main" | "temp">(
    "combined"
  );

  const [topStores, setTopStores] = useState<any[]>([]);
  const [downloadData, setDownloadData] = useState<any[]>([]);
  const [months, setMonths] = useState(3);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const startDate = dateRange?.from;
  const endDate = dateRange?.to;
  const [zm, setZm] = useState<string | undefined>(undefined);
  const [sm, setSm] = useState<string | undefined>(undefined);
  const [be, setBe] = useState<string | undefined>(undefined);
  const [branch, setBranch] = useState<string | undefined>(undefined);
  const [broadChannel, setBroadChannel] = useState<string | undefined>(
    undefined
  );
  const [brand, setBrand] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(undefined);

  const [page, setPage] = useState(0);
  const pageSize = 20;

  const handleSourceChange = (source: "combined" | "main" | "temp") => {
    setDataSource(source);
  };

  const { data, loading, error, refetch } = useQuery(GET_TOP_STORES, {
    variables: {
      source: dataSource,
      months: startDate && endDate ? undefined : months,
      zm,
      sm,
      be,
      category,
      branch: branch,
      broadChannel,
      brand,
      startDate: startDate ? startDate.toISOString().slice(0, 10) : undefined,
      endDate: endDate ? endDate.toISOString().slice(0, 10) : undefined,
      page,
      pageSize,
    },
    fetchPolicy: "network-only",
  });

  const [fetchDownloadData, { loading: downloadLoading }] = useLazyQuery(
    GET_DOWNLOAD_TOP_STORES,
    {
      fetchPolicy: "network-only",
      onCompleted: async (data) => {
        const rows = data.downloadTopStores;

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
          { header: "Average Retailing", key: "average_retailing", width: 20 },
        ];

        // Add rows
        rows.forEach(
          (row: {
            store_code: string;
            store_name: string;
            branch_name: string;
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
        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
          row.eachCell((cell) => {
            cell.alignment = { vertical: "middle", horizontal: "center" };
          });
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "top_stores.xlsx");
      },

      onError: (err) => {
        console.error("Download error:", err);
        alert("Error downloading data");
      },
    }
  );

  const handleExcelDownload = () => {
    fetchDownloadData({
      variables: {
        source: dataSource,
        months,
        zm,
        sm,
        be,
        category,
        branch,
        broadChannel,
        startDate,
        endDate,
      },
    });
  };

  const handleNext = () => {
    if ((page + 1) * pageSize < (data?.topStores?.totalCount || 0)) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  useEffect(() => {
    if (data?.topStores?.stores) {
      setTopStores(data.topStores.stores);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  useEffect(() => {
    client
      .query({
        query: GET_TOP_STORES,
        variables: {
          source: dataSource,
          months,
          zm,
          sm,
          be,
          category,
          branch,
          broadChannel,
          brand,
          startDate: startDate
            ? startDate.toISOString().slice(0, 10)
            : undefined,
          endDate: endDate ? endDate.toISOString().slice(0, 10) : undefined,
          page: 0,
          pageSize: 100,
        },
        fetchPolicy: "network-only",
      })
      .then((res) => {
        setDownloadData(res.data.topStores.stores);
      })
      .catch((err) => {
        console.error("Error fetching data for download", err);
      });
  }, [
    dataSource,
    months,
    zm,
    sm,
    be,
    category,
    branch,
    broadChannel,
    brand,
    startDate,
    endDate,
  ]);

  return (
    <div className="relative pt-3 mx-5 z-10 text-gray-900 dark:text-gray-200">
      <div className="text-center space-y-1 mb-6">
        <h1 className="text-3xl font-bold text-primary">Top 100 Stores</h1>
        <p className="text-muted-foreground font-medium text-lg">
          Generate rankings based on average retailing
        </p>
      </div>

      {/* Data Source Dropdown */}
      <div className="absolute right-4 top-7">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-indigo-300 dark:border-indigo-700 bg-indigo-500 dark:bg-indigo-200 text-indigo-50 dark:text-indigo-900"
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

      {/* FILTERS */}
      <div className="flex flex-wrap gap-2">
        <Input
          type="number"
          value={months}
          onChange={(e) => setMonths(parseInt(e.target.value))}
          placeholder="Months"
          className="w-32 py-2.5 rounded-xl border border-indigo-300 dark:border-indigo-700 bg-indigo-50/30 dark:bg-indigo-950/20 
                     focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all placeholder:text-indigo-400 
                     dark:placeholder:text-indigo-500 text-indigo-700 dark:text-indigo-200"
          disabled={!!startDate && !!endDate}
        />

        <Popover>
          <PopoverTrigger
            asChild
            className="py-2.5 rounded-xl border border-indigo-300 dark:border-indigo-700 bg-indigo-50/30 dark:bg-indigo-950/20 
                     focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all placeholder:text-indigo-400 
                     dark:placeholder:text-indigo-500 text-indigo-700 dark:text-indigo-200"
          >
            <Button
              id="date"
              variant={"outline"}
              className="w-[260px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate && endDate ? (
                `${format(startDate, "LLL dd, yyyy")} - ${format(
                  endDate,
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
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <Select value={zm} onValueChange={(value) => setZm(value)}>
          <SelectTrigger className={selectFilterTriggerStyles}>
            <SelectValue placeholder="Select ZM" />
          </SelectTrigger>
          <SelectContent className={selectFilterContentStyles}>
            {filterValues.zms.map((z) => (
              <SelectItem key={z} value={z}>
                {z}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sm} onValueChange={(value) => setSm(value)}>
          <SelectTrigger className={selectFilterTriggerStyles}>
            <SelectValue placeholder="Select SM" />
          </SelectTrigger>
          <SelectContent className={selectFilterContentStyles}>
            {filterValues.sms.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={be} onValueChange={(value) => setBe(value)}>
          <SelectTrigger className={selectFilterTriggerStyles}>
            <SelectValue placeholder="Select BE" />
          </SelectTrigger>
          <SelectContent className={selectFilterContentStyles}>
            {filterValues.bes.map((b) => (
              <SelectItem key={b} value={b}>
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={branch} onValueChange={(value) => setBranch(value)}>
          <SelectTrigger className={selectFilterTriggerStyles}>
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent className={selectFilterContentStyles}>
            {filterValues.branches.map((br) => (
              <SelectItem key={br} value={br}>
                {br}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={category} onValueChange={(value) => setCategory(value)}>
          <SelectTrigger className={selectFilterTriggerStyles}>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent className={selectFilterContentStyles}>
            {filterValues.categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={brand} onValueChange={(value) => setBrand(value)}>
          <SelectTrigger className={selectFilterTriggerStyles}>
            <SelectValue placeholder="Select Brand" />
          </SelectTrigger>
          <SelectContent className={selectFilterContentStyles}>
            {filterValues.brands.map((b) => (
              <SelectItem key={b} value={b}>
                {b}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={broadChannel}
          onValueChange={(value) => setBroadChannel(value)}
        >
          <SelectTrigger className={selectFilterTriggerStyles}>
            <SelectValue placeholder="Select Channel (Base)" />
          </SelectTrigger>
          <SelectContent className={selectFilterContentStyles}>
            {filterValues.broadChannels.map((bc) => (
              <SelectItem key={bc} value={bc}>
                {bc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="default"
          onClick={() => {
            setZm("");
            setSm("");
            setBe("");
            setCategory("");
            setBranch("");
            setBroadChannel("");
            setBrand("");
            setMonths(3);
            setDateRange(undefined);
          }}
          className="bg-indigo text-white hover:bg-indigo-hover"
        >
          Clear All Filters
        </Button>

        <Button
          onClick={handleExcelDownload}
          disabled={downloadLoading}
          className="bg-indigo text-white hover:bg-indigo-hover"
        >
          {downloadLoading ? "Downloading..." : "Download Excel"}
        </Button>
      </div>

      {/* MAIN CONTENT */}
      <section className="py-4">
        {loading ? (
          <p>Loading top stores...</p>
        ) : error ? (
          <p>Error loading top stores: {error.message}</p>
        ) : (
          <>
            {" "}
            <div className="overflow-auto rounded-xl border border-indigo-300 dark:border-indigo-700">
              <table className="min-w-full text-sm text-indigo-800 dark:text-indigo-200">
                <thead className="bg-indigo-100/50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-center">
                  <tr>
                    <th className="px-4 py-2 border-b border-indigo-200 dark:border-indigo-700">
                      Sl. No.
                    </th>
                    <th className="px-4 py-2 border-b border-indigo-200 dark:border-indigo-700">
                      Store Code
                    </th>
                    <th className="px-4 py-2 border-b border-indigo-200 dark:border-indigo-700">
                      Store Name
                    </th>
                    <th className="px-4 py-2 border-b border-indigo-200 dark:border-indigo-700">
                      Branch Name
                    </th>
                    <th className="px-4 py-2 text-right border-b border-indigo-200 dark:border-indigo-700">
                      Avg. Retailing
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topStores.map((store: any, idx: number) => (
                    <tr
                      key={idx}
                      className={`${
                        idx % 2 === 0
                          ? "bg-indigo-50/30 dark:bg-indigo-950/20"
                          : "bg-white dark:bg-zinc-900"
                      } border-t border-indigo-200 dark:border-indigo-700 text-center`}
                    >
                      <td className="px-4 py-2">{page * pageSize + idx + 1}</td>
                      <td className="px-4 py-2">{store.store_code}</td>
                      <td className="px-4 py-2">{store.store_name}</td>
                      <td className="px-4 py-2">{store.branch_name}</td>
                      <td className="px-4 py-2 text-right">
                        ₹ {store.average_retailing.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* PAGINATION */}
            <div className="flex justify-between items-center mt-4 px-2">
              <Button
                onClick={handlePrev}
                disabled={page === 0}
                className="rounded-xl border border-indigo-300 dark:border-indigo-700 bg-indigo-50/30 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-200"
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Prev
              </Button>

              <span className="text-indigo-500 dark:text-indigo-300 text-sm">
                Page {page + 1} of{" "}
                {Math.ceil((data?.topStores?.totalCount || 0) / pageSize)}
              </span>

              <Button
                onClick={handleNext}
                disabled={
                  (page + 1) * pageSize >= (data?.topStores?.totalCount || 0)
                }
                className="rounded-xl border border-indigo-300 dark:border-indigo-700 bg-indigo-50/30 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-200"
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
