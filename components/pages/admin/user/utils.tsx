import { SafeUser } from "@/CustomModels/UserModel";
import { toast } from "react-toastify";

export default function userManagementHandlers(
  setData,
  fetchUsers: () => Promise<void>,
  selectedUser: {
    user: SafeUser | null;
    mode: "editDetails" | "permissionBox" | "";
  },
  localPerms: Record<string, string[]>,
  setSelectedUser,
  setLocalPerms
) {
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
    if (selectedUser.mode !== "permissionBox" || !selectedUser.user?.id) return;
    try {
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
      if (json.success) {
        toast.success("Permissions updated");
        setSelectedUser({ user: null, mode: "" });
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
  return { toggleActive, togglePerm, savePermissions, deleteUser };
}
