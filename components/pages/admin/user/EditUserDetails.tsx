import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SafeUser } from "@/CustomModels/UserModel";
import { Edit } from "lucide-react";
import { toast } from "react-toastify";

export default function EditUserDetails(
  selectedUser: {
    user: SafeUser | null;
    mode: "editDetails" | "permissionBox" | "";
  },
  row,
  setSelectedUser,
  fetchUsers: () => Promise<void>
) {
  return (
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
          onSubmit={async (e) => {
            e.preventDefault();
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
              if (json.success) {
                toast.success("User updated");
                fetchUsers();
                setSelectedUser({ user: null, mode: "" });
              } else {
                toast.error(json.error || "Failed to update user");
              }
            } catch {
              toast.error("Server error");
            }
          }}
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
                {["OWNER", "ADMIN", "ZM", "RSM", "ASM", "TSI"].map((role) => (
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
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
