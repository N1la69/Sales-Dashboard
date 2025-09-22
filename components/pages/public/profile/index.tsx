"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";
import { toast } from "react-toastify";

export default function UserProfilePage() {
  const { state } = useAppContext();
  const currentUser = state.user?.user; // ✅ SafeUser

  const [openEdit, setOpenEdit] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);

  const handleUpdate = async (formData: FormData) => {
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      image: formData.get("image"),
      password: formData.get("password"),
    };
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: currentUser?.id,
          data: {
            ...(payload.name && { name: payload.name }),
            ...(payload.email && { email: payload.email }),
            ...(payload.image && { image: payload.image }),
            ...(payload.password && { password: payload.password }),
          },
        }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Profile updated");
        setOpenEdit(false);
        setOpenPassword(false);
      } else {
        toast.error(json.error || "Update failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-64 text-muted-foreground">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Profile Card */}
      <Card className="max-w-3xl mx-auto shadow-md">
        <CardHeader className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={currentUser.image || ""} alt={currentUser.name} />
            <AvatarFallback>
              {currentUser.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{currentUser.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{currentUser.email}</p>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline">{currentUser.role}</Badge>
              <Badge variant={currentUser.isActive ? "default" : "destructive"}>
                {currentUser.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Last login: {new Date(currentUser.lastLogin).toLocaleString()}
          </p>
        </CardContent>
      </Card>

      {/* Action buttons */}
      <div className="flex justify-center gap-4">
        {/* Edit Profile */}
        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
          <DialogTrigger asChild>
            <Button>Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Update your personal details below.
              </DialogDescription>
            </DialogHeader>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(new FormData(e.currentTarget));
              }}
            >
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={currentUser.name}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  defaultValue={currentUser.email}
                  required
                />
              </div>
              <div>
                <Label htmlFor="image">Profile Image</Label>
                <Input
                  id="image"
                  name="image"
                  defaultValue={currentUser.image}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpenEdit(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Change Password */}
        <Dialog open={openPassword} onOpenChange={setOpenPassword}>
          <DialogTrigger asChild>
            <Button variant="secondary">Change Password</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
            </DialogHeader>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(new FormData(e.currentTarget));
              }}
            >
              <div>
                <Label htmlFor="password" className="mb-2">
                  New Password
                </Label>
                <Input id="password" name="password" type="text" required />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpenPassword(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Update</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
