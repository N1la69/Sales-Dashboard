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
import { AdminNavLinks } from "@/constants/data"; // pages { key, title }
import { SafeUser } from "@/CustomModels/UserModel";
import { Settings } from "lucide-react";

const OPERATIONS = [
  "read",
  "create",
  "update",
  "delete",
  "import",
  "export",
  "bulk",
];

export default function UserPermission(
  selectedUser: {
    user: SafeUser | null;
    mode: "editDetails" | "permissionBox" | "";
  },
  row,
  setSelectedUser,
  setLocalPerms,
  localPerms: Record<string, string[]>,
  togglePerm: (page: string, op: string, checked: boolean) => void,
  savePermissions: () => Promise<void>
) {
  return (
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
            row.original.permissionSets.map((ps) => [ps.page, ps.permissions])
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
          <Button onClick={savePermissions}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
