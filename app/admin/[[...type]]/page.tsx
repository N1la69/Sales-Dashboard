"use client";

import { AdminNavLinks } from "@/constants/data";
import { notFound } from "next/navigation";
import { use, useEffect } from "react";

export default function AdminRouter({
  params,
}: {
  params: Promise<{ type?: string[] }>;
}) {
  const resolvedParams = use(params); // <-- unwrap Promise
  const typeArray: string[] = resolvedParams.type ?? [];
  const pageKey = typeArray[0]; // e.g., 'store'
  console.log(typeArray, pageKey);
  const page = AdminNavLinks.find((page) => page.key == pageKey);
  useEffect(() => {
    if (page?.title) {
      document.title = `${page.title} || ${process.env.NEXT_PUBLIC_APP_NAME}`;
    }
  }, [page]);

  if (!page?.module) {
    notFound();
  }
  const Component = page.module;

  return <Component routeParams={typeArray.slice(1)} />;
}
