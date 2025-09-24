"use client";

import LoadingButton from "@/components/structures/LoadingButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/user/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
        credentials: "include",
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      toast.success("Password reset successfully");
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Slight delay for better UX
      window.location.href = "/";
    } catch (error: any) {
      console.error("Reset Password error:", error);
      toast.error(error?.message || error);
    } finally {
      setLoading(false);
    }
  };

  //set Email from query params if available
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, []);

  return (
    <div className="flex min-h-screen min-w-full items-center justify-center bg-gray-50 dark:bg-gray-950">
      <Card className="w-full max-w-sm border-0 shadow-sm bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-center space-y-2 mb-3">
            <h1 className="text-2xl font-medium text-gray-800 dark:text-gray-100">
              Reset Password
            </h1>
            <h2 className="text-gray-500 dark:text-gray-300 font-normal">
              Enter details to reset
            </h2>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled
                className="border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md py-2 px-2"
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md py-2 px-2"
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md py-2 px-2"
              />
            </div>

            <LoadingButton
              type="submit"
              loading={loading}
              loadingStyle="dots"
              className="w-full bg-gray-900 dark:bg-gray-700 hover:bg-gray-600 dark:hover:bg-gray-600 text-white font-medium py-2.5 rounded-md cursor-pointer"
            >
              {loading ? "Resetting" : "Reset Password"}
            </LoadingButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
