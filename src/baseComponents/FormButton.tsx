import {Loader2} from "lucide-react";

interface FormButtonProps {
    type?: "button" | "submit" | "reset";
    title: React.ReactNode;
    size?: "sm" | "md" | "lg";
    onClick?: () => void;
    className?: string;
    variant?: "primary" | "secondary" | "danger" | "success";
    disabled?: boolean;
    isLoading?: boolean;
    allowedRoles?: string[];
    hideIfUnauthorized?: boolean;
}

export default function FormButton({
                                       type = "button",
                                       title,
                                       size = "sm",
                                       onClick,
                                       className = "",
                                       variant = "primary",
                                       disabled = false,
                                       isLoading = false,
                                       allowedRoles,
                                       hideIfUnauthorized = false,
                                   }: FormButtonProps) {
    const roles: string[] = JSON.parse(localStorage.getItem("roles") || "[]");

    const isAuthorized =
        !allowedRoles || allowedRoles.some((r) => roles.includes(r));

    if (!isAuthorized && hideIfUnauthorized) {
        return null;
    }

    const variants: Record<string, string> = {
        primary:
            "bg-blue-800 hover:bg-blue-700 text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-blue-800 dark:bg-blue-700 dark:hover:bg-blue-600 dark:disabled:hover:bg-blue-700",
        secondary:
            "bg-yellow-400 hover:bg-yellow-500 text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-yellow-400 dark:bg-yellow-600 dark:hover:bg-yellow-500 dark:disabled:hover:bg-yellow-600",
        success:
            "bg-teal-500 hover:bg-teal-600 text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-teal-500 dark:bg-teal-700 dark:hover:bg-teal-600 dark:disabled:hover:bg-teal-700",
        danger:
            "bg-red-500 hover:bg-red-600 text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-600 dark:disabled:hover:bg-red-700",
    };

    const sizes: Record<string, string> = {
        sm: "py-2 px-4 text-sm",
        md: "py-2 px-5 text-base",
        lg: "py-2 px-6 text-lg",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`rounded-lg cursor-pointer mx-1 
                ${variants[variant]} ${sizes[size]} ${className}
            `}
        >
            <span className="flex items-center">
                {isLoading && <Loader2 className="w-3 h-3 animate-spin ml-1"/>}
                {title}
            </span>
        </button>
    )
}