import UploadPage from "@/components/pages/admin/upload";
import UserManagementPage from "@/components/pages/admin/user";
import ForgotPasswordPage from "@/components/pages/auth/forgot-password";
import LoginPage from "@/components/pages/auth/login";
import ResetPasswordPage from "@/components/pages/auth/reset-password";
import Dashboard from "@/components/pages/public/dashboard";
import RankingPage from "@/components/pages/public/ranking";
import StorePage from "@/components/pages/public/store";
import {
  BarChart3,
  ChartBar,
  LayoutDashboard,
  LogIn,
  LucideIcon,
  ShieldQuestion,
  Store,
  Unlock,
  UploadCloud,
  UsersRound,
} from "lucide-react";
import { JSX } from "react";
import filterValues from "./filterValues";
import DistributionPage from "@/components/pages/public/distribution";

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
    icon: LayoutDashboard,
    key: undefined,
    toRender: true,
  },
  {
    id: 1,
    path: "/store",
    page: "store",
    title: "Stores",
    module: StorePage,
    icon: Store,
    key: "store",
    toRender: true,
  },
  {
    id: 2,
    path: "/ranking",
    title: "Top100",
    page: "ranking",
    key: "ranking",
    icon: BarChart3,
    module: RankingPage,
    toRender: true,
  },
  {
    id: 3,
    path: "/login",
    title: "Login",
    page: "login",
    key: "login",
    icon: LogIn,
    module: LoginPage,
    toRender: false,
  },
  {
    id: 4,
    path: "/distribution",
    title: "Distribution",
    page: "distribution",
    key: "distribution",
    icon: ChartBar,
    module: DistributionPage,
    toRender: true,
  },
  {
    id: 4,
    path: "/forgot-password",
    title: "Forgot Password",
    page: "forgot-password",
    key: "forgot-password",
    icon: ShieldQuestion,
    module: ForgotPasswordPage,
    toRender: false,
  },
  {
    id: 5,
    path: "/reset-password",
    title: "Reset Password",
    page: "reset-password",
    key: "reset-password",
    icon: Unlock,
    module: ResetPasswordPage,
    toRender: false,
  },
];

export const AdminNavLinks: NavLink[] = [
  {
    id: 0,
    path: "/admin/upload",
    title: "Upload",
    page: "upload",
    key: "upload",
    icon: UploadCloud,
    module: UploadPage,
    toRender: true,
  },
  {
    id: 1,
    path: "/admin/manage-user",
    title: "Manage User",
    page: "manage-user",
    key: "manage-user",
    icon: UsersRound,
    module: UserManagementPage,
    toRender: true,
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
  { label: "RSM", key: "RSM", values: filterValues.rsms },
  { label: "ASM", key: "ASM", values: filterValues.asms },
  {
    label: "Channel Desc",
    key: "ChannelDesc",
    values: filterValues.channelDescs,
  },
  {
    label: "Base Channel",
    key: "BaseChannel",
    values: filterValues.baseChannels,
  },
  {
    label: "Short Channel",
    key: "ShortChannel",
    values: filterValues.shortChannels,
  },
];
