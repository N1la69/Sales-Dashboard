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
import ExcelJS from "exceljs";
import { Trash2, UserPlus } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import EditUserDetails from "./EditUserDetails";
import UserPermission from "./UserPermission";
import UserTable from "./UserTable";
import userManagementHandlers from "./utils";

// ✅ ShadCN Dialog
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function UserManagementPage() {
  const [data, setData] = useState<SafeUser[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    user: SafeUser | null;
    mode: "editDetails" | "permissionBox" | "";
  }>({ user: null, mode: "" });
  const [localPerms, setLocalPerms] = useState<Record<string, string[]>>({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

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

  // 🟣 Handle Excel Upload
  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select an Excel file first");
      return;
    }

    try {
      const buffer = await file.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buffer);

      const worksheet = workbook.worksheets[0];
      const rows: any[] = [];

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // skip header
        const [name, role, email, password] = row.values.slice(1) as any[];
        rows.push({ name, role, email, password });
      });

      if (!rows.length) {
        toast.error("No users found in file");
        return;
      }

      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rows),
      });
      const result = await res.json();

      if (result.success) {
        toast.success(result.message || "Users uploaded successfully");
        fetchUsers();
        setIsDialogOpen(false); // close dialog after success
        setFile(null);
      } else {
        toast.error(result?.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.message || err || "Invalid Excel file");
    }
  };

  // 🟣 Download Template with Role Dropdown
  const downloadTemplate = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("UsersTemplate");

    // Define columns
    worksheet.columns = [
      { header: "name", key: "name", width: 30 },
      { header: "role", key: "role", width: 20 },
      { header: "email", key: "email", width: 30 },
      { header: "password", key: "password", width: 20 },
    ];

    // Add header row (automatically added by worksheet.columns)
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };

    // Example: Add role validation dropdown for rows 2–100
    const roleColumn = worksheet.getColumn("role");
    for (let i = 2; i <= 100; i++) {
      worksheet.getCell(`B${i}`).dataValidation = {
        type: "list",
        allowBlank: false,
        formulae: ['"admin,user,zm,rsm,asm,tsi"'], // allowed values
        showErrorMessage: true,
        errorStyle: "error",
        errorTitle: "Invalid Role",
        error: "Please select a role from the dropdown list",
      };
    }

    // Export as Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "UsersTemplate.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
    [
      selectedUser,
      localPerms,
      toggleActive,
      togglePerm,
      savePermissions,
      deleteUser,
    ]
  );

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, pagination },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
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
        <Button onClick={() => setIsDialogOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" /> Add Users
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

      {/* 🔹 Upload Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Users (Excel)</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <p className="text-sm text-muted-foreground">
              Expected columns: <b>name, role, email, password</b>
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload}>Upload</Button>
            <Button onClick={downloadTemplate}>Download Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
