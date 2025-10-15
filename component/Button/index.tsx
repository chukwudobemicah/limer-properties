import React from "react";
import Link from "next/link";
import { cn } from "@/utils/functions";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  disabled = false,
  href,
  onClick,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex w-fit text-center disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none disabled:bg-gray-200 items-center cursor-pointer justify-center px-6 py-2 rounded-full font-medium transition-all duration-200 ease-in-out hover:-translate-y-1";
  const variants = {
    primary: "button_primary hover:bg-primary-dark disabled:opacity-50",
    secondary:
      "button_secondary border border-[#0D0E0E40] hover:border-primary disabled:opacity-50",
  };

  const buttonStyles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cn(buttonStyles, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={cn(buttonStyles, className)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
