import Navbar from "@/components/structures/Navbar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="dark:bg-gray-950 h-screen">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full blur-3xl opacity-10 bg-blue-400 dark:bg-blue-500" />
        <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full blur-3xl opacity-10 bg-purple-400 dark:bg-purple-500" />
      </div>

      <Navbar />
      {children}
    </div>
  );
}
