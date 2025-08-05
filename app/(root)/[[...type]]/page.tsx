"use client";

import { use } from "react";
import { useEffect } from "react";
import { notFound } from "next/navigation";
import { PublicNavLinks } from "@/constants/data";

export default function Page({
  params,
}: {
  params: Promise<{ type?: string[] }>;
}) {
  const resolvedParams = use(params); // <-- unwrap Promise
  const typeArray: string[] = resolvedParams.type ?? [];
  const pageKey = typeArray[0]; // e.g., 'store'
  const page = PublicNavLinks.find((page) => page.key === pageKey);

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
