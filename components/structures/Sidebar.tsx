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
import { motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export function AppSidebar() {
  const { state } = useAppContext();
  const { user } = state;
  const currentUser = user?.user;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // ✅ same logic as Navbar
  const IS_LOGGED_IN = useMemo(() => !!currentUser, [currentUser]);
  const IS_ADMIN = currentUser?.role === "admin";
  const IS_ADMIN_PAGE = useMemo(
    () => pathname?.startsWith("/admin"),
    [pathname]
  );

  const navLinks = useMemo(() => {
    if (IS_ADMIN) {
      return IS_ADMIN_PAGE
        ? AdminNavLinks.filter((link) => link.toRender)
        : PublicNavLinks.filter((link) => link.toRender);
    }
    return PublicNavLinks.filter((link) => link.toRender);
  }, [IS_ADMIN, IS_ADMIN_PAGE]);

  // Handle body overflow when sidebar is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  // Close sidebar on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Sidebar Trigger Button (Mobile Only) */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        className="fixed top-4 right-2 z-50 md:hidden dark:text-white"
        aria-label="Open sidebar"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: open ? "0%" : "-100%" }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-900 shadow-xl z-50 md:hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={36} height={36} />
            <p className="text-base font-semibold text-gray-900 dark:text-gray-200">
              B G Distributors Pvt Ltd
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </Button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto py-4">
          <ul className="flex flex-col gap-1">
            {IS_LOGGED_IN &&
              navLinks.map((page) => {
                const active = pathname === page.path;
                const Icon = page.icon;
                return (
                  <li key={page.id}>
                    <Link
                      href={page.path ?? "/"}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "group relative flex items-center gap-3 px-5 py-2 rounded-md font-medium transition-all duration-300",
                        active
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                      )}
                    >
                      <span
                        className={cn(
                          "absolute left-0 top-1/2 -translate-y-1/2 h-2/3 w-[3px] rounded-full bg-blue-500 dark:bg-blue-400 transition-all duration-300",
                          active
                            ? "opacity-100 scale-y-100"
                            : "opacity-0 scale-y-0 group-hover:opacity-60 group-hover:scale-y-100"
                        )}
                      />
                      {Icon && (
                        <Icon
                          className={cn(
                            "h-5 w-5 transition-colors duration-300",
                            active
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100"
                          )}
                        />
                      )}
                      <span>{page.title}</span>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex flex-col gap-3">
          {/* 🔹 Only admins get the Admin/Public switcher */}
          {IS_LOGGED_IN && IS_ADMIN && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="justify-between w-full">
                  {IS_ADMIN_PAGE ? "Public Pages" : "Admin Pages"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-56">
                <DropdownMenuLabel>Switch Pages</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {(IS_ADMIN_PAGE
                  ? PublicNavLinks.filter((link) => link.toRender)
                  : AdminNavLinks.filter((link) => link.toRender)
                ).map((page) => (
                  <DropdownMenuItem key={page.id} asChild>
                    <Link
                      href={page.path ?? "/"}
                      className="flex items-center gap-2"
                    >
                      {page.icon && (
                        <page.icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      )}
                      <span>{page.title}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Dark Mode Toggle */}
          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center gap-2 justify-center"
          >
            {mounted && theme === "dark" ? (
              <>
                <Sun size={18} /> Light Mode
              </>
            ) : (
              <>
                <Moon size={18} /> Dark Mode
              </>
            )}
          </Button>

          {/* User Dropdown */}
          {IS_LOGGED_IN && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start px-2"
                >
                  <Avatar className="h-9 w-9 border border-gray-300 dark:border-gray-600">
                    <AvatarImage
                      src={currentUser?.image}
                      alt={currentUser?.name}
                    />
                    <AvatarFallback>{currentUser?.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                    {currentUser?.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    window.location.href = "/profile";
                  }}
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logOutUser()}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </motion.div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
        />
      )}
    </>
  );
}
