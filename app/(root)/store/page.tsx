/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import BranchSelector from "@/components/structures/BranchSelector";
import StoreSearchInput from "@/components/structures/StoreSearchInput";
import StoreStatsCard from "@/components/structures/StoreStatsCard";
import SuggestionList from "@/components/structures/SuggestionList";
import { Button } from "@/components/ui/button";
import StoreRetailingTrendChart from "@/components/visuals/StoreRetailingTrendChart";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import MultiSelect from "@/components/MultiSelect";
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import filterValues from "@/constants/filterValues";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import client from "@/lib/apollo-client";

// ================= GraphQL Queries =================
const GET_ALL_BRANCHES = gql`
  query GetAllBranches {
    allBranches
  }
`;

const SEARCH_STORE_CODES = gql`
  query SearchStoreCodes($query: String!, $branch: String) {
    suggestStores(query: $query, branch: $branch) {
      Old_Store_Code
    }
  }
`;

const GET_STORE_TREND = gql`
  query GetStoreRetailingTrend(
    $storeCode: String!
    $source: String
    $year: [Int]
    $month: [Int]
  ) {
    storeRetailingTrend(
      storeCode: $storeCode
      source: $source
      year: $year
      month: $month
    ) {
      year
      month
      retailing
    }
  }
`;

const GET_ADDITIONAL_STATS = gql`
  query GetStoreStats(
    $storeCode: String!
    $source: String
    $year: [Int]
    $month: [Int]
  ) {
    getStoreStats(
      storeCode: $storeCode
      source: $source
      year: $year
      month: $month
    ) {
      highestRetailingMonth {
        year
        month
        monthName
        retailing
      }
      lowestRetailingMonth {
        year
        month
        monthName
        retailing
      }
      highestRetailingBrand {
        brand
        retailing
      }
      lowestRetailingBrand {
        brand
        retailing
      }
      categoryRetailing {
        category
        retailing
      }
    }
  }
`;

const GET_STORE_DETAILS = gql`
  query GetStoreDetails($storeCode: String!, $source: String) {
    getStoreDetails(storeCode: $storeCode, source: $source) {
      storeCode
      storeName
    }
  }
`;

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

// ================= Component =================
const StorePage = () => {
  const [dataSource, setDataSource] = useState<"combined" | "main" | "temp">(
    "combined"
  );
  const [branch, setBranch] = useState<string>("");
  const [storeQuery, setStoreQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedStore, setSelectedStore] = useState<string>("");
  const [storeName, setStoreName] = useState<string | null>(null);

  const [pendingFilters, setPendingFilters] = useState<{
    year: number[];
    month: number[];
  }>({
    year: [],
    month: [],
  });
  const [appliedFilters, setAppliedFilters] = useState<{
    year: number[];
    month: number[];
  }>({
    year: [],
    month: [],
  });

  const [topStores, setTopStores] = useState<any[]>([]);
  const [zm, setZm] = useState<string | undefined>(undefined);
  const [sm, setSm] = useState<string | undefined>(undefined);
  const [be, setBe] = useState<string | undefined>(undefined);
  const [branchBottom, setBranchBottom] = useState<string | undefined>(
    undefined
  );
  const [broadChannel, setBroadChannel] = useState<string | undefined>(
    undefined
  );
  const [brand, setBrand] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [months, setMonths] = useState(3);
  const [downloadData, setDownloadData] = useState<any[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const startDate = dateRange?.from;
  const endDate = dateRange?.to;

  const [page, setPage] = useState(0);
  const pageSize = 20;

  const yearsList = [2023, 2024, 2025];

  const monthsList = Array.from({ length: 12 }, (_, i) => i + 1);

  const { data: branchData, loading: branchLoading } =
    useQuery(GET_ALL_BRANCHES);

  const [
    searchStores,
    { data: searchData, loading: searchLoading, error: searchError },
  ] = useLazyQuery(SEARCH_STORE_CODES);

  const {
    data: trendData,
    loading: trendLoading,
    error: trendError,
    refetch: refetchTrend,
  } = useQuery(GET_STORE_TREND, {
    variables: {
      storeCode: selectedStore,
      source: dataSource,
      year: appliedFilters.year,
      month: appliedFilters.month,
    },
    skip: !selectedStore,
  });

  const {
    data: additionalStatsData,
    loading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useQuery(GET_ADDITIONAL_STATS, {
    variables: {
      storeCode: selectedStore,
      source: dataSource,
      year: appliedFilters.year,
      month: appliedFilters.month,
    },
    skip: !selectedStore,
  });
  const categoryStats =
    additionalStatsData?.getStoreStats?.categoryRetailing ?? [];

  const { refetch: refetchStoreDetails } = useQuery(GET_STORE_DETAILS, {
    variables: { storeCode: selectedStore, source: dataSource },
    skip: !selectedStore,
    onCompleted: (data) => {
      if (data?.getStoreDetails) {
        setStoreName(data.getStoreDetails.storeName);
      }
    },
  });

  const { data, loading, error, refetch } = useQuery(GET_TOP_STORES, {
    variables: {
      source: dataSource,
      months: startDate && endDate ? undefined : months,
      zm,
      sm,
      be,
      category,
      branch: branchBottom,
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
        branchBottom,
        broadChannel,
        startDate,
        endDate,
      },
    });
  };

  useEffect(() => {
    if (data?.topStores?.stores) {
      setTopStores(data.topStores.stores);
    }
  }, [data]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (storeQuery.trim().length >= 2) {
        const branchFilter = branch.trim() === "" ? null : branch;
        searchStores({
          variables: { query: storeQuery, branch: branchFilter },
        });
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [storeQuery, branch, searchStores]);

  useEffect(() => {
    if (searchData?.suggestStores) {
      const storeCodes = searchData.suggestStores.map(
        (s: any) => s.Old_Store_Code
      );
      setSuggestions(storeCodes);
    }
  }, [searchData]);

  useEffect(() => {
    refetch(); // refetch topStores whenever page changes
  }, [page, refetch]);

  const handleStoreSelect = (storeCode: string) => {
    setSelectedStore(storeCode);
    setSuggestions([]);
    refetchTrend();
    refetchStats();
    refetchStoreDetails();
  };

  const handleSourceChange = (source: "combined" | "main" | "temp") => {
    setDataSource(source);
    if (selectedStore) {
      refetchTrend();
      refetchStats();
      refetchStoreDetails();
    }
  };

  const applyFilters = () => {
    setAppliedFilters(pendingFilters);
    if (selectedStore) {
      refetchTrend();
      refetchStats();
    }
  };

  const clearFilters = () => {
    setPendingFilters({ year: [], month: [] });
    setAppliedFilters({ year: [], month: [] });
    if (selectedStore) {
      refetchTrend();
      refetchStats();
    }
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
  }, [dataSource, months, zm, sm, be, category]);

  return (
    <div className="pt-3 mx-5 z-10 text-gray-900 dark:text-gray-200">
      <div className="flex flex-col text-center space-y-1 mb-6">
        <h1 className="text-3xl font-bold text-primary">Store at Fingertips</h1>
        <p className="text-muted-foreground font-medium text-lg">
          Your current stores&apos; summary & activity
        </p>
      </div>

      {/* Data Source Selection */}
      <div className="flex justify-center gap-3 my-4">
        {["combined", "main", "temp"].map((source) => (
          <Button
            key={source}
            variant={dataSource === source ? "default" : "outline"}
            onClick={() =>
              handleSourceChange(source as "combined" | "main" | "temp")
            }
            className={
              dataSource === source
                ? "bg-indigo text-white hover:bg-indigo-hover"
                : "border border-gray-200 text-gray-900 dark:text-gray-100 hover:border-indigo"
            }
          >
            {source.charAt(0).toUpperCase() + source.slice(1)} DB
          </Button>
        ))}
      </div>

      {/* TOP SECTION */}
      <section className="space-y-5 px-5">
        <h2 className="font-semibold text-2xl mb-4">Store Lookup</h2>

        <div className="flex flex-col gap-4 max-w-3xl">
          <div className="flex gap-3">
            <StoreSearchInput value={storeQuery} onChange={setStoreQuery} />

            {branchLoading ? (
              <p>Loading branches...</p>
            ) : (
              <BranchSelector
                branches={branchData?.allBranches || []}
                selectedBranch={branch}
                onChange={setBranch}
              />
            )}

            {searchLoading && <p>Searching...</p>}
            {searchError && <p>Error searching: {searchError.message}</p>}
          </div>

          <SuggestionList
            suggestions={suggestions}
            onSelectSuggestion={handleStoreSelect}
          />
        </div>

        {/* Content Section */}
        <div className="space-y-4">
          {selectedStore ? (
            <>
              <div className="flex gap-3">
                <MultiSelect
                  label="Year"
                  options={yearsList}
                  selected={pendingFilters.year}
                  onChange={(values) =>
                    setPendingFilters((prev) => ({
                      ...prev,
                      year: values as number[],
                    }))
                  }
                />
                <MultiSelect
                  label="Month"
                  options={monthsList}
                  selected={pendingFilters.month}
                  onChange={(values) =>
                    setPendingFilters((prev) => ({
                      ...prev,
                      month: values as number[],
                    }))
                  }
                />
              </div>

              {(pendingFilters.year.length > 0 ||
                pendingFilters.month.length > 0) && (
                <div className="flex gap-2">
                  <Button onClick={applyFilters}>Apply Filters</Button>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}

              <div className="grid grid-cols-5 mt-4 space-x-4">
                <div className="col-span-3">
                  <h2 className="text-xl font-semibold mb-3">
                    Retailing Trend for:{" "}
                    <span className="text-blue-600 dark:text-blue-400">
                      {selectedStore} {storeName && ` - ${storeName}`}
                    </span>
                  </h2>

                  {trendLoading ? (
                    <Skeleton className="h-60 w-full rounded-xl" />
                  ) : (
                    <StoreRetailingTrendChart
                      data={trendData?.storeRetailingTrend}
                      loading={trendLoading}
                      error={trendError}
                    />
                  )}
                </div>

                <div className="col-span-1">
                  <h2 className="text-xl font-semibold mb-3">
                    Additional Details:
                  </h2>

                  {statsLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-12 w-full rounded-md" />
                      <Skeleton className="h-12 w-full rounded-md" />
                      <Skeleton className="h-12 w-full rounded-md" />
                    </div>
                  ) : (
                    <StoreStatsCard
                      data={additionalStatsData?.getStoreStats}
                      loading={statsLoading}
                      error={statsError}
                    />
                  )}
                </div>

                <div className="col-span-1 pl-3">
                  {categoryStats.length > 0 && (
                    <div className="">
                      <h2 className="text-xl font-semibold mb-3">
                        Category-wise retailing:
                      </h2>
                      <ul className="space-y-1 h-96 overflow-y-auto">
                        {categoryStats.map((item: any, index: number) => (
                          <li
                            key={index}
                            className="flex justify-between text-indigo-800 dark:text-indigo-200"
                          >
                            <span>{item.category}</span>
                            <span>₹ {item.retailing.toLocaleString()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            // Initial loading placeholder before store is selected
            <div className="grid grid-cols-5 gap-2 mt-4">
              <div className="col-span-3 space-y-4">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-60 w-full rounded-xl" />
              </div>
              <div className="col-span-2 space-y-4">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="h-12 w-full rounded-md" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* BOTTOM SECTION */}
      <section className="py-4 px-4">
        <h2 className="font-semibold text-2xl mb-4">Top 100 Stores</h2>

        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Input
              type="number"
              value={months}
              onChange={(e) => setMonths(parseInt(e.target.value))}
              placeholder="Months"
              className="w-48 py-2.5 rounded-xl border border-indigo-300 dark:border-indigo-700 bg-indigo-50/30 dark:bg-indigo-950/20 
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
                  initialFocus
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>

            <Select value={zm} onValueChange={(value) => setZm(value)}>
              <SelectTrigger
                className="rounded-xl border border-indigo-300 dark:border-indigo-700 
                   bg-indigo-50/30 dark:bg-indigo-950/20 py-2.5 px-4 text-indigo-700 
                   dark:text-indigo-200 placeholder:text-indigo-400 dark:placeholder:text-indigo-500 
                   focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all"
              >
                <SelectValue placeholder="Select ZM" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-zinc-900 border border-indigo-200 dark:border-indigo-700 text-indigo-800 dark:text-indigo-200">
                {filterValues.zms.map((z) => (
                  <SelectItem key={z} value={z}>
                    {z}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sm} onValueChange={(value) => setSm(value)}>
              <SelectTrigger
                className="rounded-xl border border-indigo-300 dark:border-indigo-700 
                   bg-indigo-50/30 dark:bg-indigo-950/20 py-2.5 px-4 text-indigo-700 
                   dark:text-indigo-200 placeholder:text-indigo-400 dark:placeholder:text-indigo-500 
                   focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all"
              >
                <SelectValue placeholder="Select SM" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-zinc-900 border border-indigo-200 dark:border-indigo-700 text-indigo-800 dark:text-indigo-200">
                {filterValues.sms.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={be} onValueChange={(value) => setBe(value)}>
              <SelectTrigger
                className="rounded-xl border border-indigo-300 dark:border-indigo-700 
                   bg-indigo-50/30 dark:bg-indigo-950/20 py-2.5 px-4 text-indigo-700 
                   dark:text-indigo-200 placeholder:text-indigo-400 dark:placeholder:text-indigo-500 
                   focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all"
              >
                <SelectValue placeholder="Select BE" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-zinc-900 border border-indigo-200 dark:border-indigo-700 text-indigo-800 dark:text-indigo-200">
                {filterValues.bes.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={branchBottom}
              onValueChange={(value) => setBranchBottom(value)}
            >
              <SelectTrigger
                className="rounded-xl border border-indigo-300 dark:border-indigo-700 
                   bg-indigo-50/30 dark:bg-indigo-950/20 py-2.5 px-4 text-indigo-700 
                   dark:text-indigo-200 placeholder:text-indigo-400 dark:placeholder:text-indigo-500 
                   focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all"
              >
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-zinc-900 border border-indigo-200 dark:border-indigo-700 text-indigo-800 dark:text-indigo-200">
                {filterValues.branches.map((br) => (
                  <SelectItem key={br} value={br}>
                    {br}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={category}
              onValueChange={(value) => setCategory(value)}
            >
              <SelectTrigger
                className="rounded-xl border border-indigo-300 dark:border-indigo-700 
                   bg-indigo-50/30 dark:bg-indigo-950/20 py-2.5 px-4 text-indigo-700 
                   dark:text-indigo-200 placeholder:text-indigo-400 dark:placeholder:text-indigo-500 
                   focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all"
              >
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-zinc-900 border border-indigo-200 dark:border-indigo-700 text-indigo-800 dark:text-indigo-200">
                {filterValues.categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={brand} onValueChange={(value) => setBrand(value)}>
              <SelectTrigger
                className="rounded-xl border border-indigo-300 dark:border-indigo-700 
                   bg-indigo-50/30 dark:bg-indigo-950/20 py-2.5 px-4 text-indigo-700 
                   dark:text-indigo-200 placeholder:text-indigo-400 dark:placeholder:text-indigo-500 
                   focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all"
              >
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-zinc-900 border border-indigo-200 dark:border-indigo-700 text-indigo-800 dark:text-indigo-200">
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
              <SelectTrigger
                className="rounded-xl border border-indigo-300 dark:border-indigo-700 
                   bg-indigo-50/30 dark:bg-indigo-950/20 py-2.5 px-4 text-indigo-700 
                   dark:text-indigo-200 placeholder:text-indigo-400 dark:placeholder:text-indigo-500 
                   focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all"
              >
                <SelectValue placeholder="Select Channel (Base)" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-zinc-900 border border-indigo-200 dark:border-indigo-700 text-indigo-800 dark:text-indigo-200">
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
                setBranchBottom("");
                setBroadChannel("");
                setBrand("");
                setMonths(3);
                setDateRange(undefined);
                setPage(0);
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

          {loading ? (
            <p>Loading top stores...</p>
          ) : error ? (
            <p>Error loading top stores: {error.message}</p>
          ) : (
            <div className="overflow-auto">
              <table className="w-full border text-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="px-4 py-2">Sl. No.</th>
                    <th className="px-4 py-2">Store Code</th>
                    <th className="px-4 py-2">Store Name</th>
                    <th className="px-4 py-2">Branch Name</th>
                    <th className="px-4 py-2 text-right">Avg. Retailing</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.topStores?.stores?.map((store: any, idx: number) => (
                    <tr key={idx} className="border-t text-center">
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
              <div className="flex justify-between items-center mt-4">
                <Button onClick={handlePrev} disabled={page === 0}>
                  <ChevronLeft className="h-4 w-4" /> Prev
                </Button>
                <span className="text-muted-foreground text-sm">
                  Page {page + 1} of{" "}
                  {Math.ceil((data?.topStores?.totalCount || 0) / pageSize)}
                </span>
                <Button
                  onClick={handleNext}
                  disabled={
                    (page + 1) * pageSize >= (data?.topStores?.totalCount || 0)
                  }
                >
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default StorePage;
