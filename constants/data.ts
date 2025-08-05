import ForgotPasswordPage from "@/components/pages/auth/forgot-password";
import LoginPage from "@/components/pages/auth/login";
import ResetPasswordPage from "@/components/pages/auth/reset-password";
import Dashboard from "@/components/pages/dashboard";
import RankingPage from "@/components/pages/ranking";
import StorePage from "@/components/pages/store";
import UploadPage from "@/components/pages/upload";
import { LucideIcon } from "lucide-react";
import { JSX } from "react";
import filterValues from "./filterValues";

// NAVBAR PAGES
interface NavLink {
  id: number;
  path: string;
  title: string;
  page: string;
  key: string | undefined;
  module?: ({ routeParams }: { routeParams?: string[] }) => JSX.Element;
  icon?: LucideIcon;
  toRender: boolean;
}

export const PublicNavLinks: NavLink[] = [
  {
    id: 0,
    path: "/",
    page: "dashboard",
    title: "Dashboard",
    module: Dashboard,
    key: undefined,
    toRender: true,
  },
  {
    id: 1,
    path: "/store",
    page: "store",
    title: "Stores",
    module: StorePage,
    key: "store",
    toRender: true,
  },
  {
    id: 2,
    path: "/ranking",
    title: "Top100",
    page: "ranking",
    key: "ranking",
    module: RankingPage,
    toRender: true,
  },
  {
    id: 3,
    path: "/upload",
    title: "Upload",
    page: "upload",
    key: "upload",
    module: UploadPage,
    toRender: true,
  },
  {
    id: 4,
    path: "/login",
    title: "Login",
    page: "login",
    key: "login",
    module: LoginPage,
    toRender: false,
  },
  {
    id: 5,
    path: "/forgot-password",
    title: "Forgot Password",
    page: "forgot-password",
    key: "forgot-password",
    module: ForgotPasswordPage,
    toRender: false,
  },
  {
    id: 6,
    path: "/reset-password",
    title: "Reset Password",
    page: "reset-password",
    key: "reset-password",
    module: ResetPasswordPage,
    toRender: false,
  },
];

export const filters = [
  { label: "Year", key: "Year", values: filterValues.years },
  { label: "Month", key: "Month", values: filterValues.months },
  { label: "Category", key: "Category", values: filterValues.categories },
  { label: "Brand", key: "Brand", values: filterValues.brands },
  { label: "Brandform", key: "Brandform", values: filterValues.brandforms },
  {
    label: "Subbrandform",
    key: "Subbrandform",
    values: filterValues.subbrandforms,
  },
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
