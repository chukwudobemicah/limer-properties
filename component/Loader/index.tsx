import React from "react";
import { motion } from "framer-motion";

interface LoadingProps {
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
  fullScreen?: boolean;
  className?: string;
  color?: "primary" | "white" | "current";
}

export default function Loader({
  size = "md",
  text,
  fullScreen = false,
  className = "",
  color = "primary",
}: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 sm:w-10 sm:h-10 border-2 sm:border-3",
    lg: "w-10 h-10 sm:w-12 sm:h-12 border-3 sm:border-4",
    xl: "w-12 h-12 sm:w-16 sm:h-16 border-3 sm:border-4",
  };

  const colorClasses = {
    primary: "border-primary/30 border-t-primary",
    white: "border-white/30 border-t-white",
    current: "border-current/30 border-t-current",
  };

  const spinnerElement = (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full ${
        fullScreen ? "mb-4" : ""
      }`}
    />
  );

  if (fullScreen) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center text-center ${className}`}
      >
        {spinnerElement}
        {text && (
          <span className="text-gray-600 text-xs sm:text-sm font-medium block mt-2 sm:mt-3">
            {text}
          </span>
        )}
      </div>
    );
  }

  if (text) {
    return (
      <div
        className={`text-center flex flex-col items-center justify-center ${className}`}
      >
        {spinnerElement}
        <span className="text-gray-600 text-xs sm:text-sm font-medium block mt-2 sm:mt-3">
          {text}
        </span>
      </div>
    );
  }

  // For buttons and inline usage, return just the spinner without wrapper
  return <div className={className}>{spinnerElement}</div>;
}
