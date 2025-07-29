import filterValues from "./filterValues";

// NAVBAR PAGES
export const pages = [
  {
    id: 0,
    path: "/dashboard",
    title: "Dashboard",
  },
  {
    id: 1,
    path: "/store",
    title: "Stores",
  },
  {
    id: 2,
    path: "/ranking",
    title: "Ranking",
  },
  {
    id: 3,
    path: "/upload",
    title: "Upload",
  },
];

export const filters = [
  { label: "Year", key: "Year", values: filterValues.years },
  { label: "Month", key: "Month", values: filterValues.months },
  { label: "Category", key: "Category", values: filterValues.categories },
  { label: "Brand", key: "Brand", values: filterValues.brands },
  { label: "Brandform", key: "Brandform", values: filterValues.brandforms },
  { label: "Branch", key: "Branch", values: filterValues.branches },
  { label: "ZM", key: "ZM", values: filterValues.zms },
  { label: "SM", key: "SM", values: filterValues.sms },
  { label: "BE", key: "BE", values: filterValues.bes },
  { label: "Channel", key: "Channel", values: filterValues.channels },
  {
    label: "Broad Channel",
    key: "BroadChannel",
    values: filterValues.broadChannels,
  },
  {
    label: "Short Channel",
    key: "ShortChannel",
    values: filterValues.shortChannels,
  },
];
