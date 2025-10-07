// src/layouts/AuthLayout.tsx
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (

    <div className="border flex flex-col items-center">
      <div className="">LOGIN LAYOUT</div>
      <div> {children} </div>
    </div>

  );
}
