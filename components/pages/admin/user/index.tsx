"use client";
import LoadingButton from "@/components/structures/LoadingButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Edit, Settings, Trash2, UserPlus } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
  const [selectedUser, setSelectedUser] = useState<{
    user: SafeUser | null;
    mode: "editDetails" | "permissionBox" | "";
  }>({ user: null, mode: "" });
  const [localPerms, setLocalPerms] = useState<never[]>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const [working, setWorking] = useState({
    uploading: false,
    deleting: false,
    savingPerms: false,
    savingDetails: false,
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
      if (!json.success) throw new Error(json?.message);
      setData(json.data);
      toast.success(json.message);
    } catch (error: any) {
      console.error("❌ Fetch users error:", error?.message || error);
      toast.error(error?.message || error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔴 Manage User Utils
  const deleteUser = async (id: number) => {
    try {
      setDeletingUserId(id.toString());
      setWorking((prev) => ({ ...prev, deleting: true }));
      const res = await fetch(`/api/user`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json?.message);
      setData((prev) => prev.filter((u) => u.id !== id));
      toast.success(json.message);
    } catch (error: any) {
      console.error("❌ Delete user error:", error?.message || error);
      toast.error(error?.message || error);
    } finally {
      setWorking((prev) => ({ ...prev, deleting: false }));
      setDeletingUserId(null);
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
      if (!json.success) throw new Error(json?.message);
      toast.success(json.message || "User status updated");
    } catch (error: any) {
      console.error("❌ Toggle user status error:", error?.message || error);
      toast.error(error?.message || error);
    }
  };

  // 🟡 Save Permissions
  const savePermissions = async () => {
    if (selectedUser.mode !== "permissionBox" || !selectedUser.user?.id) return;
    try {
      setWorking((prev) => ({ ...prev, savingPerms: true }));
      const res = await fetch(`/api/user`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          userId: selectedUser?.user?.id,
          permissions: localPerms,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json?.message);

      toast.success(json.message || "Permissions updated");
      setSelectedUser({ user: null, mode: "" });
      fetchUsers();
    } catch (error: any) {
      console.error("❌ Save permissions error:", error?.message || error);
      toast.error(error?.message || error);
    } finally {
      setWorking((prev) => ({ ...prev, savingPerms: false }));
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

  // 🟠 Handle User Detail Update
  async function handleUserUpdate(
    e: React.FormEvent<HTMLFormElement>,
    row: any
  ) {
    e.preventDefault();
    setWorking((prev) => ({ ...prev, savingDetails: true }));
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      role: formData.get("role"),
      image: formData.get("image"),
      password: formData.get("password"),
    };
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: row.original.id,
          data: payload,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Update failed");
      toast.success(json.message || "User updated successfully");
      fetchUsers();
    } catch (error: any) {
      console.error("❌ Update user error:", error?.message || error);
      toast.error(error.message || error);
    } finally {
      setWorking((prev) => ({ ...prev, savingDetails: false }));
      setSelectedUser({ user: null, mode: "" });
    }
  }

  // 🟣 Handle Excel Upload
  const handleUpload = async () => {
    setWorking((prev) => ({ ...prev, uploading: true }));
    if (!file) {
      toast.error("Please select an Excel file first");
      return;
    }

    try {
      const buffer = await file.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buffer);

      const worksheet = workbook.worksheets[0];
      const rows: {
        name: string;
        role: string;
        email: string;
        password: string;
      }[] = [];

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // skip header
        rows.push({
          name: row.getCell(1).text,
          role: row.getCell(2).text,
          email: row.getCell(3).text,
          password: row.getCell(4).text,
        });
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
      if (!result.success) throw new Error(result?.message);
      toast.success(result.message || "Users uploaded successfully");
      fetchUsers();
      setIsDialogOpen(false); // close dialog after success
      setFile(null);
    } catch (error: any) {
      console.error("❌ Upload users error:", error?.message || error);
      toast.error(error?.message || error);
    } finally {
      setWorking((prev) => ({ ...prev, uploading: false }));
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

  const columns: ColumnDef<SafeUser>[] = [
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
          <Dialog
            open={
              selectedUser?.user?.id === row.original.id &&
              selectedUser.mode === "editDetails"
            }
            onOpenChange={(open) => {
              if (open) {
                setSelectedUser({ user: row.original, mode: "editDetails" });
              } else {
                setSelectedUser({ user: null, mode: "" });
              }
            }}
          >
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Edit className="h-4 w-4 mr-1" /> Edit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Edit User</DialogTitle>
                <DialogDescription>
                  Update details for <b>{row.original.name}</b>
                </DialogDescription>
              </DialogHeader>

              <form
                className="space-y-4"
                onSubmit={(e) => handleUserUpdate(e, row)}
              >
                {/* Name */}
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={row.original.name}
                    required
                  />
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={row.original.email}
                    required
                  />
                </div>

                {/* Role */}
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select name="role" defaultValue={row.original.role}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "OWNER",
                        "ADMIN",
                        "ZM",
                        "RSM",
                        "ASM",
                        "TSI",
                        "USER",
                      ].map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Image */}
                <div className="grid gap-2">
                  <Label htmlFor="image">Profile Image (URL)</Label>
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    defaultValue={row.original.image}
                  />
                </div>

                {/* Password */}
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="text"
                    placeholder="Leave blank to keep current"
                  />
                </div>
                {/* Actions */}
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedUser({ user: null, mode: "" })}
                  >
                    Cancel
                  </Button>
                  <LoadingButton
                    type="submit"
                    loading={working.savingDetails}
                    loadingStyle="dots"
                  >
                    {working.savingDetails ? "Saving" : "Save"}
                  </LoadingButton>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* Permissions Dialog */}
          <Dialog
            open={
              selectedUser?.user?.id === row.original.id &&
              selectedUser?.mode === "permissionBox"
            }
            onOpenChange={(open) => {
              if (open) {
                setSelectedUser({
                  user: row.original,
                  mode: "permissionBox",
                });
                // Map API permissionSets -> localPerms
                const mapped = Object.fromEntries(
                  row.original.permissionSets.map((ps) => [
                    ps.page,
                    ps.permissions,
                  ])
                );
                setLocalPerms(mapped);
              } else {
                setSelectedUser({ user: null, mode: "" });
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
                        <CardTitle className="text-sm">{page.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {OPERATIONS.map((op) => (
                            <label
                              key={op}
                              className="flex items-center gap-2 text-sm cursor-pointer capitalize"
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
                  onClick={() => setSelectedUser({ user: null, mode: "" })}
                >
                  Cancel
                </Button>
                <LoadingButton
                  onClick={savePermissions}
                  loading={working.savingPerms}
                  loadingStyle="dots"
                >
                  {working.savingPerms ? "Saving" : "Save"}
                </LoadingButton>
              </div>
            </DialogContent>
          </Dialog>
          {/* Delete */}
          <LoadingButton
            size="sm"
            variant="destructive"
            onClick={() => deleteUser(row.original.id)}
            loadingStyle="delete"
            loading={deletingUserId === row.original.id.toString()} // only this row shows loading
          >
            {working.deleting &&
            deletingUserId === row.original.id.toString() ? (
              "Deleting"
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-1" /> Delete
              </>
            )}
          </LoadingButton>
        </div>
      ),
    },
  ];

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
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[h.column.getIsSorted() as string] ?? null}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>

                <TableBody>
                  {/* 👇 use getPaginationRowModel instead of getRowModel */}
                  {table.getPaginationRowModel().rows.map((row) => (
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

              {/* Pagination Controls */}
              <div className="flex items-center justify-between mt-4 gap-4">
                {/* Rows per page selector */}
                <Select
                  value={String(table.getState().pagination.pageSize)}
                  onValueChange={(value) => table.setPageSize(Number(value))}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Rows per page" />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 10, 15, 20, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={String(pageSize)}>
                        Show {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Pagination buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                  >
                    ⏮ First
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    ◀ Prev
                  </Button>

                  <span className="text-sm px-2">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    Next ▶
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                  >
                    Last ⏭
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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
            <LoadingButton
              onClick={handleUpload}
              loading={working.uploading}
              loadingStyle="dots"
            >
              {working.uploading ? "Uploading" : "Upload"}
            </LoadingButton>
            <Button onClick={downloadTemplate}>Download Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
