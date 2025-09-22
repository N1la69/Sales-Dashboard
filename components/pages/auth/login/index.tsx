"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await fetch("/api/user/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  return data;
};

const LoginPage = () => {
  const { state } = useAppContext();
  const { user } = state;

  // 🔐 Already logged in → redirect
  useEffect(() => {
    if (user?.user?.id) {
      const params = new URLSearchParams(window.location.search);
      const redirectTo = params.get("from") || "/";
      toast.success(`Welcome Back, ${user.user.name || "User"}!`);
      setTimeout(() => {
        window.location.href = redirectTo;
      }, 1500);
    }
  }, [user]);

  // 🔑 React Query mutation handles loading/error states
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      const params = new URLSearchParams(window.location.search);
      const redirectTo = params.get("from") || "/";
      window.location.href = redirectTo;
    },
    onError: (err: any) => {
      toast.error(err.message || "An error occurred during login");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutation.mutate({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
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
                name="email"
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
                name="password"
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

            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-gray-700 hover:bg-gray-600 dark:hover:bg-gray-600 text-white font-medium py-2.5 rounded-md cursor-pointer disabled:opacity-50"
            >
              {mutation.isPending && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              {mutation.isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
