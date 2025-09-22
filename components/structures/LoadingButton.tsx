import { Loader } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";

export default function LoadingButton({
  loading,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { loading?: boolean }) {
  return (
    <Button
      {...props}
      type={props.type ?? "button"} // 👈 default to "button" but allow "submit"
      disabled={loading || props.disabled}
    >
      {loading && <Loader className="h-4 w-4 mr-2 animate-spin" />}
      {children}
    </Button>
  );
}
