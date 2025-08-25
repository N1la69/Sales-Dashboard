"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet, UserPlus, Trash2 } from "lucide-react";
import ExcelJS from "exceljs";

// Mock data (replace with API data later)
type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLogin: string;
  image: string;
};

const initialData: User[] = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    role: "admin",
    isActive: true,
    lastLogin: "2025-08-20T10:00:00Z",
    image: "https://picsum.photos/100/100?1",
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
    role: "staff",
    isActive: false,
    lastLogin: "2025-08-22T15:30:00Z",
    image: "https://picsum.photos/100/100?2",
  },
];

export default function UserManagementPage() {
  const [data, setData] = useState<User[]>(initialData);
  const [globalFilter, setGlobalFilter] = useState("");

  // 📊 Table Columns
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "image",
        header: "",
        cell: ({ row }) => (
          <img
            src={row.original.image}
            alt={row.original.name}
            className="h-8 w-8 rounded-full"
          />
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "role",
        header: "Role",
      },
      {
        accessorKey: "isActive",
        header: "Active",
        cell: ({ getValue }) =>
          getValue<boolean>() ? (
            <span className="text-green-600 font-medium">Yes</span>
          ) : (
            <span className="text-red-500 font-medium">No</span>
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
              onClick={() =>
                setData((prev) => prev.filter((u) => u.id !== row.original.id))
              }
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

  // 📥 Import with exceljs
  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const workbook = new ExcelJS.Workbook();
    const buffer = await file.arrayBuffer();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.worksheets[0];
    const rows: User[] = [];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // skip header
      const [id, name, email, role, isActive, lastLogin, image] =
        row.values as any[];
      rows.push({
        id: Number(id),
        name,
        email,
        role,
        isActive: isActive === "true" || isActive === true,
        lastLogin,
        image,
      });
    });

    setData(rows);
  };

  // 📤 Export with exceljs
  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Users");

    // Header row
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
    worksheet.columns = [
      { width: 10 },
      { width: 20 },
      { width: 30 },
      { width: 15 },
      { width: 10 },
      { width: 25 },
      { width: 40 },
    ];

    // Data rows
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
