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
  path: string | undefined;
  title: string;
  key: string;
  module?: ({ routeParams }: { routeParams?: string[] }) => JSX.Element;
  icon?: LucideIcon;
  toRender: boolean;
}
export const PublicNavLinks: NavLink[] = [
  {
    id: 0,
    path: undefined,
    title: "Dashboard",
    module: Dashboard,
    key: "dashboard",
    toRender: true,
  },
  {
    id: 1,
    path: "/store",
    title: "Stores",
    module: StorePage,
    key: "store",
    toRender: true,
  },
  {
    id: 2,
    path: "/ranking",
    title: "Top100",
    key: "ranking",
    module: RankingPage,
    toRender: true,
  },
  {
    id: 3,
    path: "/upload",
    title: "Upload",
    key: "upload",
    module: UploadPage,
    toRender: true,
  },
  {
    id: 4,
    path: "/login",
    title: "Login",
    key: "login",
    module: LoginPage,
    toRender: false,
  }, {
    id: 5,
    path: "/forgot-password",
    title: "Forgot Password",
    key: "forgot-password",
    module: ForgotPasswordPage,
    toRender: false,
  },
  {
    id: 6,
    path: "/reset-password",
    title: "Reset Password",
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
