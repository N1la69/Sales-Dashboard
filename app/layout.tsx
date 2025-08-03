import type { Metadata } from "next";
import "./globals.css";
import ApolloWrapper from "@/components/ApolloWrapper";
import { ToastContainer } from "react-toastify";

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
    <html lang="en">
      <body className="antialiased bg-background-light dark:bg-background-dark">
        <ToastContainer />
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
