"use client";

import LoadingButton from "@/components/structures/LoadingButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { state } = useAppContext();
  const { user } = state;
  // 🔐 Check if user is already logged in
  useEffect(() => {
    const verifyAndRedirect = async () => {
      try {
        if (user?.user?.id) {
          const params = new URLSearchParams(window.location.search);
          const redirectTo = params.get("from") || "/";
          toast.success(`Welcome Back, ${user.user.name || "User"}!`);
          await new Promise((resolve) => setTimeout(resolve, 1500)); // Slight delay for better UX
          window.location.href = redirectTo;
        }
      } catch (err) {
        console.error("User verification failed:", err);
      }
    };

    verifyAndRedirect();
  }, [user]);

  // 🔑 Handle login form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/user/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        const params = new URLSearchParams(window.location.search);
        const redirectTo = params.get("from") || "/";
        window.location.href = redirectTo;
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      toast.error(err?.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-svh min-w-full items-center justify-center bg-gray-50 dark:bg-gray-950">
      <Card className="w-full max-w-sm border-0 shadow-sm bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-center space-y-2 mb-3">
            <h1 className="text-2xl font-medium text-gray-800 dark:text-gray-100">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </h1>
            <h2 className="text-gray-500 dark:text-gray-300 font-normal">
              Sign in to your account
            </h2>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md py-2 px-2"
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-md py-2 px-2"
              />
              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <LoadingButton
              type="submit"
              loading={loading}
              loadingStyle="dots"
              className="w-full bg-gray-900 dark:bg-gray-700 hover:bg-gray-600 dark:hover:bg-gray-600 text-white font-medium py-2.5 rounded-md cursor-pointer"
            >
              {loading ? "Signing in" : "Sign In"}
            </LoadingButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
