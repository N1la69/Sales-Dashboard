// "use client";

// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
// import { pages } from "@/constants/data";
// import Image from "next/image";

// import { UserButton, useUser } from "@clerk/nextjs";
// import Link from "next/link";
// import { Minus, Moon, Sun } from "lucide-react";

// const Navbar = () => {
//   const { user } = useUser();
//   const pathname = usePathname();

//   const [activePage, setActivePage] = useState(0);
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     const theme = localStorage.getItem("theme");
//     if (theme === "dark") {
//       setDarkMode(true);
//     }
//   }, []);

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [darkMode]);

//   // Update activePage based on pathname
//   useEffect(() => {
//     const currentPage = pages.find((page) => page.path === pathname);
//     if (currentPage) {
//       setActivePage(currentPage.id);
//     }
//   }, [pathname]);

//   return (
//     <nav className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-600">
//       {/* LOGO */}
//       <div className="flex items-center">
//         <Image src="/logo.png" alt="logo" width={50} height={50} />
//         <h1 className="ml-2 text-xl font-semibold text-gray-950 dark:text-gray-200">
//           BG Distributors Pvt. Ltd.
//         </h1>
//       </div>

//       {/* LINKS */}
//       <div className="relative">
//         <ul className="flex justify-center items-center gap-2">
//           {pages.map((page) => (
//             <li key={page.id}>
//               <Link
//                 href={page.path}
//                 className="relative py-2 px-4 tracking-wide inline-block"
//                 onClick={() => setActivePage(page.id)}
//               >
//                 <h1 className="text-gray-950 dark:text-gray-200 font-semibold">
//                   {page.title}
//                 </h1>

//                 {activePage === page.id && (
//                   <div className="absolute inset-0 bg-blue-400 rounded-full opacity-20"></div>
//                 )}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* RIGHT SECTION */}
//       <div className="relative flex items-center">
//         <div className="flex items-center gap-4">
//           <div
//             className="hover:bg-gray-500 transition-colors duration-300 rounded-full p-1 cursor-pointer"
//             onClick={() => setDarkMode(!darkMode)}
//           >
//             {darkMode ? (
//               <Sun size={22} className="text-gray-950 dark:text-gray-200" />
//             ) : (
//               <Moon
//                 size={22}
//                 className="text-gray-950 hover:text-gray-200 dark:text-gray-200"
//               />
//             )}
//           </div>
//         </div>

//         <Minus
//           size={45}
//           className="rotate-90 text-gray-400 dark:text-gray-500"
//         />

//         <div className="flex items-center gap-2">
//           <UserButton />

//           <p className="text-gray-950 dark:text-gray-200 font-semibold uppercase">
//             {user?.name}
//           </p>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

"use client";

import { PublicNavLinks } from "@/constants/data";
import { useAppContext } from "@/hooks/AppContext";
import { Menu, Minus, Moon, Sun, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Navbar = () => {
  const { state } = useAppContext();
  const { user } = state; // Assuming user data is stored in the context
  const pathname = usePathname();
  const filteredNavLinks = PublicNavLinks.filter((p) => p.toRender);
  const [activePage, setActivePage] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const IS_LOGGED_IN = useMemo(() => !!user, [user]);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const currentPage = filteredNavLinks.find((page) => page.path === pathname);
    if (currentPage) setActivePage(currentPage.id);
  }, [pathname, filteredNavLinks]);

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-600">
      {/* LOGO */}
      <div className="flex items-center gap-1 md:gap-2">
        <Image src="/logo.png" alt="logo" width={40} height={40} />
        <h1 className="hidden md:block text-xl font-semibold text-gray-950 dark:text-gray-200">
          BG Distributors Pvt. Ltd.
        </h1>
      </div>

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex gap-3 items-center justify-center">
        {IS_LOGGED_IN &&
          filteredNavLinks.map((page) => (
            <li key={page.id}>
              <Link
                href={page.path ?? "/"}
                className="relative py-2 px-4 tracking-wide inline-block"
                onClick={() => setActivePage(page.id)}
              >
                <h1 className="text-gray-950 dark:text-gray-200 font-semibold">
                  {page.title}
                </h1>

                {activePage === page.id && (
                  <div className="absolute inset-0 bg-blue-400 rounded-full opacity-20 "></div>
                )}
              </Link>
            </li>
          ))}
      </ul>

      {/* Mobile Menu Toggle */}
      <div className="flex justify-center items-center gap-2 md:hidden px-2">
        <div
          className="hover:bg-gray-500 transition-colors duration-300 rounded-full p-1 cursor-pointer"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? (
            <Sun size={22} className="text-gray-950 dark:text-gray-200" />
          ) : (
            <Moon size={22} className="text-gray-950 dark:text-gray-200" />
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-950 dark:text-gray-200"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex items-center gap-2">
        {/* Theme Toggle */}
        <div
          className="hover:bg-gray-500 transition-colors duration-300 rounded-full p-1 cursor-pointer"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? (
            <Sun size={22} className="text-gray-950 dark:text-gray-200" />
          ) : (
            <Moon size={22} className="text-gray-950 dark:text-gray-200" />
          )}
        </div>

        <Minus
          size={45}
          className="rotate-90 text-gray-400 dark:text-gray-500"
        />

        {/* User Info */}
        <div className="flex items-center gap-2">
          {/* <UserButton /> */}
          <Avatar>
            <AvatarImage src={user?.image} />
            <AvatarFallback> {user?.name}</AvatarFallback>
          </Avatar>
          <p className="text-gray-950 dark:text-gray-200 font-semibold uppercase hidden sm:block">
            {user?.name}
          </p>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 md:hidden z-50">
          <ul className="flex flex-col text-center py-2">
            {IS_LOGGED_IN &&
              PublicNavLinks.map((page) => (
                <li key={page.id}>
                  <Link
                    href={page.path === undefined ? "/" : page.path}
                    className="block py-2 text-gray-950 dark:text-gray-200 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => {
                      setActivePage(page.id);
                      setMenuOpen(false);
                    }}
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            <li className="flex justify-center py-2 border-t border-gray-300 dark:border-gray-700">
              {/* <UserButton /> */}
              <p className="ml-2 text-gray-950 dark:text-gray-200 font-semibold uppercase">
                {user?.name}
              </p>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
