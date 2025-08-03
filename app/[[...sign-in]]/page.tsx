"use client";

import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // You can add redirect logic here if already signed in
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
      <Card className="w-full max-w-sm border-0 shadow-sm bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-center space-y-2 mb-3">
            <h1 className="text-2xl font-medium text-gray-800 dark:text-gray-100">
              BG Sales Dashboard
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

            <div className="space-y-2 flex flex-col pb-3">
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
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 dark:bg-gray-700 hover:bg-gray-600 dark:hover:bg-gray-600 text-white font-medium py-2.5 rounded-md cursor-pointer"
            >
              Sign In
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
