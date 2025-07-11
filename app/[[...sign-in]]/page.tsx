"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SignInPage = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    try {
      const signedInUser = user;
      if (signedInUser) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  }, [user, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <SignIn.Root>
        <Card className="w-full max-w-sm border-0 shadow-sm">
          <SignIn.Step name="start">
            <CardHeader>
              <CardTitle className="text-center space-y-2 mb-3">
                <h1 className="text-2xl font-medium text-gray-800">
                  BG Sales Dashboard
                </h1>
                <h2 className="text-gray-500 font-normal">
                  Sign in to your account
                </h2>
              </CardTitle>
            </CardHeader>

            <Clerk.GlobalError className="block text-sm text-red-400" />

            <CardContent className="space-y-4">
              <Clerk.Field
                name="identifier"
                className="space-y-2 flex flex-col"
              >
                <Clerk.Label className="text-sm font-medium text-gray-700">
                  Username
                </Clerk.Label>
                <Clerk.Input
                  type="text"
                  required
                  className="border border-gray-400 rounded-md py-2 px-2"
                />
                <Clerk.FieldError className="block text-sm text-red-400" />
              </Clerk.Field>

              <Clerk.Field
                name="password"
                className="space-y-2 flex flex-col pb-3"
              >
                <Clerk.Label className="text-sm font-medium text-gray-700">
                  Password
                </Clerk.Label>
                <Clerk.Input
                  type="password"
                  required
                  className="border border-gray-400 rounded-md py-2 px-2"
                />
                <Clerk.FieldError className="block text-sm text-red-400" />
              </Clerk.Field>

              <SignIn.Action
                submit
                className="w-full bg-gray-900 hover:bg-gray-600 text-white font-medium py-2.5 rounded-md cursor-pointer"
              >
                Sign In
              </SignIn.Action>
            </CardContent>
          </SignIn.Step>
        </Card>
      </SignIn.Root>
    </div>
  );
};

export default SignInPage;
