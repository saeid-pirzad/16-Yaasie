// components/FormTitle.tsx
import { type ReactNode } from 'react'

interface FormTitleProps {
  children: ReactNode
  className?: string
}

export default function FormTitle({ children, className = '' }: FormTitleProps) {
  return (
    <p className={`text-center text-xl font-medium text-blue-800 my-10 ${className}`}>
      {children}
    </p>
  )
}
