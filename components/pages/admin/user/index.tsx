"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Settings, Trash2, UserPlus } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AdminNavLinks } from "@/constants/data"; // pages { key, title }
import { SafeUser } from "@/CustomModels/UserModel";

const OPERATIONS = [
  "read",
  "create",
  "update",
  "delete",
  "import",
  "export",
  "bulk",
];

export default function UserManagementPage() {
  const [data, setData] = useState<SafeUser[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SafeUser | null>(null);
  const [localPerms, setLocalPerms] = useState<Record<string, string[]>>({});

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

  // 🔴 Delete User
  const deleteUser = async (id: number) => {
    try {
      const res = await fetch(`/api/user`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (json.success) {
        setData((prev) => prev.filter((u) => u.id !== id));
        toast.success("User deleted");
      }
    } catch {
      toast.error("Error deleting user");
    }
  };

  // 🟢 Toggle Active/Inactive
  const toggleActive = async (user: SafeUser) => {
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: user.id,
          data: { isActive: !user.isActive },
        }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success(
          `User ${user.name} is now ${!user.isActive ? "Active" : "Inactive"}`
        );
        fetchUsers();
      }
    } catch {
      toast.error("Failed to toggle user status");
    }
  };

  // 🟡 Save Permissions
  const savePermissions = async () => {
    if (!selectedUser) return;
    try {
      const res = await fetch(`/api/user`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          userId: selectedUser.id,
          permissions: localPerms,
        }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Permissions updated");
        setSelectedUser(null);
        fetchUsers();
      } else toast.error(json.error || "Failed");
    } catch {
      toast.error("Server error");
    }
  };

  // 🔧 Handle Checkbox Change
  const togglePerm = (page: string, op: string, checked: boolean) => {
    setLocalPerms((prev) => {
      const existing = prev[page] || [];
      const updated = checked
        ? [...existing, op]
        : existing.filter((x) => x !== op);
      return { ...prev, [page]: updated };
    });
  };

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

            {/* Permissions Dialog */}
            <Dialog
              open={selectedUser?.id === row.original.id}
              onOpenChange={(open) => {
                if (open) {
                  setSelectedUser(row.original);
                  // Map API permissionSets -> localPerms
                  const mapped = Object.fromEntries(
                    row.original.permissionSets.map((ps) => [
                      ps.page,
                      ps.permissions,
                    ])
                  );
                  setLocalPerms(mapped);
                } else {
                  setSelectedUser(null);
                  setLocalPerms({});
                }
              }}
            >
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  <Settings className="h-4 w-4 mr-1" /> Permissions
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Edit Permissions</DialogTitle>
                  <DialogDescription>
                    Manage permissions for <b>{row.original.name}</b>
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 max-h-[60vh] overflow-y-auto">
                  {AdminNavLinks.map((page) => {
                    const current = localPerms[page.key] || [];
                    return (
                      <Card key={page.key}>
                        <CardHeader className="py-2">
                          <CardTitle className="text-sm">
                            {page.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {OPERATIONS.map((op) => (
                              <label
                                key={op}
                                className="flex items-center gap-2 text-sm cursor-pointer"
                              >
                                <Checkbox
                                  checked={current.includes(op)}
                                  onCheckedChange={(c) =>
                                    togglePerm(page.key, op, c === true)
                                  }
                                />
                                {op}
                              </label>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedUser(null)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={savePermissions}>Save</Button>
                </div>
              </DialogContent>
            </Dialog>

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
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="container mx-auto py-8 space-y-6">
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
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((hg) => (
                    <TableRow key={hg.id}>
                      {hg.headers.map((h) => (
                        <TableHead
                          key={h.id}
                          onClick={h.column.getToggleSortingHandler()}
                          className="cursor-pointer"
                        >
                          {flexRender(
                            h.column.columnDef.header,
                            h.getContext()
                          )}
                          {{ asc: " 🔼", desc: " 🔽" }[
                            h.column.getIsSorted() as string
                          ] ?? null}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              variant="outline"
              size="sm"
            >
              Previous
            </Button>
            <span>
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              variant="outline"
              size="sm"
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
