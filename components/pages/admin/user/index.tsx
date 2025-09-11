"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SafeUser } from "@/CustomModels/UserModel";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Trash2, UserPlus } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import EditUserDetails from "./EditUserDetails";
import UserPermission from "./UserPermission";
import UserTable from "./UserTable";
import userManagementHandlers from "./utils";

export default function UserManagementPage() {
  const [data, setData] = useState<SafeUser[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    user: SafeUser | null;
    mode: "editDetails" | "permissionBox" | "";
  }>({ user: null, mode: "" });
  const [localPerms, setLocalPerms] = useState<Record<string, string[]>>({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5, // default rows per page
  });
  // 🔵 Fetch Users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user", {
        method: "GET",
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch {
      toast.error("Failed to fetch users");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔴 Manage User Utils
  const { toggleActive, togglePerm, savePermissions, deleteUser } =
    userManagementHandlers(
      setData,
      fetchUsers,
      selectedUser,
      localPerms,
      setSelectedUser,
      setLocalPerms
    );

  // 🟣 Table Columns
  const columns = useMemo<ColumnDef<SafeUser>[]>(
    () => [
      {
        accessorKey: "image",
        header: "",
        cell: ({ row }) => (
          <Image
            src={row.original.image}
            alt={row.original.name}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
          />
        ),
      },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "role", header: "Role" },
      {
        accessorKey: "lastLogin",
        header: "Last Login",
        cell: ({ getValue }) => new Date(getValue<string>()).toLocaleString(),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2 justify-end">
            {/* Status Toggle */}
            <div className="flex items-center space-x-2">
              <Switch
                id={`active-${row.original.id}`}
                checked={row.original.isActive}
                onCheckedChange={() => toggleActive(row.original)}
              />
              <Label htmlFor={`active-${row.original.id}`}>
                {row.original.isActive ? "Active" : "Inactive"}
              </Label>
            </div>
            {/* Edit User Dialog */}
            {EditUserDetails(selectedUser, row, setSelectedUser, fetchUsers)}

            {/* Permissions Dialog */}
            {UserPermission(
              selectedUser,
              row,
              setSelectedUser,
              setLocalPerms,
              localPerms,
              togglePerm,
              savePermissions
            )}

            {/* Delete */}
            <Button
              size="sm"
              variant="destructive"
              onClick={() => deleteUser(row.original.id)}
            >
              <Trash2 className="h-4 w-4 mr-1" /> Delete
            </Button>
          </div>
        ),
      },
    ],
    [selectedUser, localPerms]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      pagination, // 👈 include pagination state
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination, // 👈 update pagination
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    autoResetPageIndex: true,
  });

  return (
    <div className="container mx-auto lg:p-8 sm:p-2 md:p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" /> Add User
        </Button>
      </div>

      {/* Search */}
      <Input
        placeholder="Search users..."
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="max-w-sm"
      />

      {/* Table */}
      {UserTable(loading, table)}
    </div>
  );
}
