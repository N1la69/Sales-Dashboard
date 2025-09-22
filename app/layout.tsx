import ApolloWrapper from "@/components/ApolloWrapper";
import Maintenance from "@/components/structures/Maintainence";
import Navbar from "@/components/structures/Navbar";
import { AppSidebar } from "@/components/structures/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/context/AppContext";
import ReactQueryProvider from "@/context/QueryClient";
import { ThemeProvider } from "@/context/theme-provider";
import { isBlockedTime } from "@/lib/maintenance";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sales Dashboard",
  description: "Sales Dashboard for Data Visualization",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Steering maintenance mode
  if (isBlockedTime())
    return (
      <html lang="en">
        <body>
          <Maintenance />
        </body>
      </html>
    );
  // Normal site rendering
  else
    return (
      <ReactQueryProvider>
        <AuthProvider>
          <html lang="en" suppressHydrationWarning>
            <body className="antialiased bg-background-light dark:bg-background-dark">
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <SidebarProvider>
                  <ApolloWrapper>
                    {/* Background decorations */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="absolute top-20 right-20 w-64 h-64 rounded-full blur-3xl opacity-10 bg-blue-400 dark:bg-blue-500" />
                      <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full blur-3xl opacity-10 bg-purple-400 dark:bg-purple-500" />
                    </div>

                    {/* Navbar and Sidebar */}
                    <Navbar />
                    <AppSidebar />

                    <main className="relative flex flex-col w-full pt-16">
                      <ToastContainer />
                      {children}
                    </main>
                  </ApolloWrapper>
                </SidebarProvider>
              </ThemeProvider>
            </body>
          </html>
        </AuthProvider>
      </ReactQueryProvider>
    );
}
