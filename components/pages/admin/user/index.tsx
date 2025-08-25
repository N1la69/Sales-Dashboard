"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ExcelJS from "exceljs";
import { FileSpreadsheet, Trash2, UserPlus } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLogin: string;
  image: string;
};

export default function UserManagementPage() {
  const [data, setData] = useState<User[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [loading, setLoading] = useState(false);

  // 📡 Fetch users from API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user", {
        method: "GET",
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) {
        setData(json.data);
        toast.success(json?.message || "Users fetched successfully");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error(err?.message || "Failed to fetch users");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🟢 Toggle Active/Inactive
  const toggleActive = async (user: User) => {
    try {
      const res = await fetch(`/api/user`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          data: { isActive: !user.isActive },
          id: user.id,
        }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success(
          json?.message ||
            `User ${user.name} is now ${!user.isActive ? "Active" : "Inactive"}`
        );
        fetchUsers();
      }
    } catch (err) {
      console.error("Error toggling status:", err);
      toast.error(err?.message || "Failed to toggle user status");
    }
  };

  // 🗑 Delete User
  const deleteUser = async (id: string) => {
    try {
      const res = await fetch(`/api/user`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: id }),
      });
      const json = await res.json();
      if (json.success) {
        setData((prev) => prev.filter((u) => u.id !== id));
        toast.success(json?.message || "User deleted successfully");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error(err?.message || "Failed to delete user");
    }
  };

  // 📊 Table Columns
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "image",
        header: "",
        cell: ({ row }) => (
          <Image
            width={32}
            height={32}
            src={row.original.image}
            alt={row.original.name}
            className="h-8 w-8 rounded-full"
          />
        ),
      },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "role", header: "Role" },
      {
        accessorKey: "isActive",
        header: "Active",
        cell: ({ row }) => (
          <Button
            size="sm"
            variant={row.original.isActive ? "outline" : "destructive"}
            onClick={() => toggleActive(row.original)}
          >
            {row.original.isActive ? "Active" : "Inactive"}
          </Button>
        ),
      },
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
            <Button
              size="sm"
              variant="outline"
              onClick={() => alert("Edit " + row.original.name)}
            >
              Edit
            </Button>
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
    []
  );

  // ⚡ TanStack Table
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

  // 📥 Import with ExcelJS
  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const workbook = new ExcelJS.Workbook();
    const buffer = await file.arrayBuffer();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.worksheets[0];
    const rows: Partial<User>[] = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const [id, name, email, role, isActive, lastLogin, image] =
        row.values as (string | boolean)[];
      rows.push({
        id: id?.toString(),
        name: typeof name === "string" ? name : name?.toString(),
        email: typeof email === "string" ? email : email?.toString(),
        role: typeof role === "string" ? role : role?.toString(),
        isActive: isActive === "true" || isActive === true,
        lastLogin:
          typeof lastLogin === "string" ? lastLogin : lastLogin?.toString(),
        image: typeof image === "string" ? image : image?.toString(),
      });
    });

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rows),
      });
      if (res.ok) {
        fetchUsers();
      }
    } catch (err) {
      console.error("Error importing users:", err);
    }
  };

  // 📤 Export with ExcelJS
  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Users");

    worksheet.addRow([
      "ID",
      "Name",
      "Email",
      "Role",
      "Active",
      "Last Login",
      "Image",
    ]);
    worksheet.getRow(1).font = { bold: true };

    data.forEach((user) => {
      worksheet.addRow([
        user.id,
        user.name,
        user.email,
        user.role,
        user.isActive,
        user.lastLogin,
        user.image,
      ]);
    });

    const buf = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buf], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex gap-2">
          {/* Import */}
          <label>
            <input
              type="file"
              accept=".xlsx"
              className="hidden"
              onChange={handleImport}
            />
            <Button asChild variant="outline">
              <span className="flex items-center gap-2 cursor-pointer">
                <FileSpreadsheet className="h-4 w-4" /> Import Excel
              </span>
            </Button>
          </label>
          {/* Export */}
          <Button variant="outline" onClick={handleExport}>
            Export
          </Button>
          {/* Add user */}
          <Button variant="default">
            <UserPlus className="h-4 w-4 mr-2" /> Add User
          </Button>
        </div>
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
            <p>Loading users...</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          className="cursor-pointer select-none"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
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
