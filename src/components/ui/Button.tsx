import React from "react";

export interface ButtonProps {
  /** Is this the principal call to action? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: "small" | "medium" | "large";
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  onClick,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full font-semibold transition-colors";
  const mode = primary
    ? "bg-blue-600 text-white hover:bg-blue-700"
    : "bg-slate-200 text-slate-900 hover:bg-slate-300";
  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  return (
    <button
      type="button"
      className={`${baseStyles} ${mode} ${sizes[size]}`}
      style={{ backgroundColor }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
