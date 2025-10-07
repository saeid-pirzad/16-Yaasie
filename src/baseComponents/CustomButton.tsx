// import { Loader2 } from "lucide-react";

// interface CustomButtonProps {
//   type?: "button" | "submit" | "reset";
//   onClick?: () => void;
//   isLoading?: boolean;
//   disabled?: boolean;
//   children: React.ReactNode;
//   variant?: "primary" | "secondary" | "danger" | "success";
//   size?: "sm" | "md" | "lg";
//   className?: string;
// }

// export default function CustomButton({
//   type = "button",
//   onClick,
//   isLoading = false,
//   disabled = false,
//   children,
//   variant = "primary",
//   size = "md",
//   className = "",
// }: CustomButtonProps) {
//   // 🎨 رنگ‌ها
//   const variants: Record<string, string> = {
//     primary:
//       "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-400",
//     secondary:
//       "bg-gray-500 hover:bg-gray-600 text-white disabled:bg-gray-300",
//     success:
//       "bg-green-600 hover:bg-green-700 text-white disabled:bg-green-400",
//     danger:
//       "bg-red-600 hover:bg-red-700 text-white disabled:bg-red-400",
//   };

//   // 🔠 سایزها
//   const sizes: Record<string, string> = {
//     sm: "px-3 py-1 text-sm",
//     md: "px-4 py-2 text-base",
//     lg: "px-6 py-3 text-lg",
//   };

//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       disabled={disabled || isLoading}
//       className={`
//         flex items-center justify-center rounded-md transition w-full
//         disabled:opacity-70 disabled:cursor-not-allowed 
//         ${variants[variant]} ${sizes[size]} ${className}
//       `}
//     >
//       {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
//       {children}
//     </button>
//   );
// }


import { Loader2 } from "lucide-react";

interface CustomButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  className?: string;
  allowedRoles?: string[];
  hideIfUnauthorized?: boolean; 
}

export default function CustomButton({
  type = "button",
  onClick,
  isLoading = false,
  disabled = false,
  children,
  variant = "primary",
  size = "md",
  className = "",
  allowedRoles,
  hideIfUnauthorized = false,
}: CustomButtonProps) {
  const roles: string[] = JSON.parse(localStorage.getItem("roles") || "[]");
  console.log("roles", roles);

  const isAuthorized =
    !allowedRoles || allowedRoles.some((r) => roles.includes(r));

  if (!isAuthorized && hideIfUnauthorized) {
    return null; // ⬅️ کلا دکمه رو نشون نده
  }
  // 🎨 رنگ‌ها
  const variants: Record<string, string> = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-400",
    secondary:
      "bg-gray-500 hover:bg-gray-600 text-white disabled:bg-gray-300",
    success:
      "bg-green-600 hover:bg-green-700 text-white disabled:bg-green-400",
    danger:
      "bg-red-600 hover:bg-red-700 text-white disabled:bg-red-400",
  };

  // 🔠 سایزها
  const sizes: Record<string, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading || !isAuthorized}
      className={`
        flex items-center justify-center rounded-md transition w-full
        disabled:opacity-70 disabled:cursor-not-allowed 
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
