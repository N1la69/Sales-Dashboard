"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminNavLinks, PublicNavLinks } from "@/constants/data";
import { useAppContext } from "@/hooks/AppContext";
import { logOutUser } from "@/lib/auth/logOutUser";
import { cn } from "@/lib/utils";
import { CircleUserRound, LogOut, Moon, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export default function Navbar() {
  const { state } = useAppContext();
  const { user } = state;
  const currentUser = user?.user;
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const IS_LOGGED_IN = useMemo(() => !!currentUser, [currentUser]);
  const IS_ADMIN = currentUser?.role === "ADMIN";
  const IS_ADMIN_PAGE = useMemo(
    () => pathname?.startsWith("/admin"),
    [pathname]
  );

  // ✅ If admin, show AdminNavLinks or PublicNavLinks depending on page
  // ✅ If not admin, only show PublicNavLinks
  const navLinks = useMemo(() => {
    if (IS_ADMIN) {
      return IS_ADMIN_PAGE
        ? AdminNavLinks.filter((link) => link.toRender)
        : PublicNavLinks.filter((link) => link.toRender);
    }
    return PublicNavLinks.filter((link) => link.toRender);
  }, [IS_ADMIN_PAGE, IS_ADMIN]);
  const isActive = (path?: string) => path && pathname === path;

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 md:px-8 w-full">
        {/* Left Section: Logo + Company */}
        <div className="flex items-center space-x-3">
          <Image src="/logo.png" alt="logo" width={40} height={40} priority />
          <h1 className="hidden md:block text-lg font-bold text-gray-900 dark:text-gray-200 tracking-tight">
            B G Distributors Pvt Ltd
          </h1>
        </div>

        {/* Center Section: Nav Links (desktop only) */}
        {IS_LOGGED_IN && (
          <ul className="hidden md:flex items-center space-x-6">
            {navLinks.map((page) => {
              const active = isActive(page.path);
              return (
                <li key={page.id}>
                  <Link
                    href={page.path ?? "/"}
                    className={cn(
                      "group flex items-center gap-2 px-2 py-1 font-medium text-sm transition-all duration-200 relative",
                      active
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-500 hover:text-gray-900 dark:dark:text-gray-400 dark:hover:text-gray-200"
                    )}
                  >
                    {page.icon && (
                      <page.icon
                        className={cn(
                          "h-4 w-4 transition-colors",
                          active
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200"
                        )}
                      />
                    )}
                    <span>{page.title}</span>
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 h-[2px] bg-blue-500 dark:bg-blue-300 transition-all duration-300",
                        active ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        {/* Right Section: Theme + User */}
        <div className="flex items-center space-x-4 md:pr-2 lg:pr-6">
          {/* 🔹 Only admins get the Admin/Public switcher */}
          {IS_LOGGED_IN && IS_ADMIN && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="hidden md:flex text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                >
                  {IS_ADMIN_PAGE ? "Public" : "Admin"} Pages
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Switch Pages</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {(IS_ADMIN_PAGE
                  ? PublicNavLinks.filter((link) => link.toRender)
                  : AdminNavLinks.filter((link) => link.toRender)
                ).map((page) => {
                  const active = pathname === page.path;
                  return (
                    <DropdownMenuItem key={page.id} asChild>
                      <Link
                        href={page.path ?? "/"}
                        className={cn(
                          "flex items-center gap-2 px-2 py-1.5 rounded-md transition-all",
                          active
                            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 font-semibold"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        )}
                      >
                        {page.icon && (
                          <page.icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        )}
                        <span>{page.title}</span>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle dark mode"
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>

          {/* User Menu */}
          {IS_LOGGED_IN && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2"
                  aria-label="User profile menu"
                >
                  <Avatar className="h-9 w-9 border-2 border-transparent hover:border-blue-500 transition-all">
                    <AvatarImage
                      src={currentUser?.image}
                      alt={currentUser?.name}
                    />
                    <AvatarFallback>{currentUser?.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <span className="hidden lg:block text-sm font-semibold text-gray-900 dark:text-gray-200">
                    {currentUser?.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-35 flex flex-col">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => (window.location.href = "/profile")}
                >
                  <CircleUserRound className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logOutUser()}>
                  <LogOut className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}
