import type { VariantProps } from "class-variance-authority";
import { Loader, Newspaper, Trash2 } from "lucide-react";
import * as React from "react";
import { Button, buttonVariants } from "../ui/button";

type LoadingStyle = "spinner" | "dots" | "bar" | "pulse" | "delete";

/**
 * @name LoadingButton
 * @description A button component that shows different loading animations based on the loadingStyle prop.
 * @param loading - Whether the button is in a loading state.
 * @param loadingStyle - The style of the loading animation.
 * @returns A button element with loading animations.
 * @example
 * <LoadingButton loading={true} loadingStyle="spinner">Submit</LoadingButton>
 * <LoadingButton loading={true} loadingStyle="dots">Submit</LoadingButton>
 * <LoadingButton loading={true} loadingStyle="bar">Submit</LoadingButton>
 * <LoadingButton loading={true} loadingStyle="pulse">Submit</LoadingButton>
 * <LoadingButton loading={true} loadingStyle="delete">Delete</LoadingButton>
 */
export default function LoadingButton({
  loading,
  loadingStyle = "spinner", // 👈 choose style
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
    loadingStyle?: LoadingStyle;
  }) {
  return (
    <Button
      {...props}
      type={props.type ?? "button"}
      disabled={loading || props.disabled}
      className={`flex items-center justify-center ${props.className}`}
    >
      {/* Spinner before text */}
      {loading && loadingStyle === "spinner" && (
        <Loader className="h-4 w-4 mr-2 animate-spin" />
      )}

      {/* Delete / File + Dustbin animation */}
      {loading && loadingStyle === "delete" && (
        <span
          className="ml-2 relative flex items-center animate-button-shrink"
          onAnimationEnd={(e) => {
            e.currentTarget.style.display = "none"; // removes from layout
          }}
          onAnimationStart={(e) => {
            e.currentTarget.style.display = "flex"; // ensures it's visible
          }}
        >
          {/* File flying */}
          <Newspaper className="h-4 w-4 absolute text-white animate-file-throw" />

          {/* Dustbin reacts */}
          <Trash2 className="h-4 w-4 ml-6 text-white animate-dustbin-react" />
        </span>
      )}

      {children}

      {/* Dancing dots after text */}
      {loading && loadingStyle === "dots" && (
        <span className="ml-2 flex space-x-1">
          <span className="h-1.5 w-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 bg-current rounded-full animate-bounce" />
        </span>
      )}

      {/* Loading bar */}
      {loading && loadingStyle === "bar" && (
        <span className="ml-2 w-6 h-1 bg-current rounded-sm animate-pulse" />
      )}

      {/* Pulsing dot */}
      {loading && loadingStyle === "pulse" && (
        <span className="ml-2 h-2 w-2 bg-current rounded-full animate-ping" />
      )}
    </Button>
  );
}
