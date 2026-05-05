import React from "react";

/**
 * Interface for the Reusable Button Component.
 * Extends standard HTML button attributes for maximum flexibility.
 */
interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "outline";
}

const Button: React.FC<IButtonProps> = ({
  children,
  isLoading,
  variant = "primary",
  className = "",
  ...props
}) => {
  // Base styles following your design requirements
  const baseStyles =
    "w-90 h-12 rounded-lg text-[15px] font-semibold transition-all duration-200 active:scale-[0.98] flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-70";

  // Color scheme variants
  const variants = {
    primary:
      "bg-[#3c46ff] hover:bg-[#0000ff] text-white shadow-lg shadow-indigo-100",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900",
    outline:
      "border-2 border-[#3c46ff] text-[#3c46ff] hover:bg-[#3c46ff] hover:text-white",
  };

  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {isLoading ? (
        // Standard loading spinner for async operations
        <svg
          className="animate-spin h-5 w-5 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
