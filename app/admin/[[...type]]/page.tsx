"use client";

import { PermissionSet } from "@/app/generated/prisma";
import { AdminNavLinks } from "@/constants/data";
import { useAppContext } from "@/hooks/AppContext";
import { notFound } from "next/navigation";
import { use, useEffect } from "react";

export default function AdminRouter({
  params,
}: {
  params: Promise<{ type?: string[] }>;
}) {
  const { state } = useAppContext();
  const { user, loading } = state;

  const resolvedParams = use(params);
  const typeArray: string[] = resolvedParams.type ?? [];
  const pageKey = typeArray[0];

  const page = AdminNavLinks.find((p) => p.key === pageKey);

  useEffect(() => {
    if (page?.title) {
      document.title = `${page.title} || ${process.env.NEXT_PUBLIC_APP_NAME}`;
    }
  }, [page]);

  // ⏳ While loading, don't decide yet
  if (loading) {
    return <p>Loading...</p>;
  }

  // ❌ If no user after loading, block
  if (!user) {
    console.log("No user after loading");
    notFound();
  }
  // ❌ Invalid page
  if (!page?.module) {
    console.log("Invalid page", { pageKey });
    notFound();
  }

  const permissions: PermissionSet[] = Array.isArray(user.permissions)
    ? user.permissions
    : [];

  // ✅ Check "read" access AFTER user is ready
  const hasReadAccess = permissions.some(
    (perm) =>
      perm.page === pageKey && String(perm.permissions)?.includes("read")
  );

  if (!hasReadAccess) {
    console.log("User does not have read access", { permissions, pageKey });
    notFound();
  }

  const Component = page.module;
  return <Component routeParams={typeArray.slice(1)} />;
}
