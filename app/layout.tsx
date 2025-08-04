import ApolloWrapper from "@/components/ApolloWrapper";
import { AuthProvider } from "@/hooks/AppContext";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sales Dashboard",
  description: "Sales Dashboard for Data Visualization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className="antialiased bg-background-light dark:bg-background-dark">
          <ToastContainer />
          <ApolloWrapper>{children}</ApolloWrapper>
        </body>
      </html>
    </AuthProvider>
  );
}
