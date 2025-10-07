import {BadgeAlert} from 'lucide-react'

interface FormInputProps {
    id: string
    name: string
    type?: string
    value: string
    onChange: (value: string) => void
    label: string
    disabled?: boolean
    error?: string
    placeholder?: string
    maxLength?: number
    dir?: 'ltr' | 'rtl'
    className?: string
    required?: boolean
}

export default function FormInput({
                                      id,
                                      name,
                                      type = 'text',
                                      value,
                                      onChange,
                                      label,
                                      disabled = false,
                                      error,
                                      placeholder = ' ',
                                      maxLength,
                                      dir = 'ltr',
                                      className = '',
                                      required = false
                                  }: FormInputProps) {
    return (
        <div className="relative w-full m-1">
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                placeholder={placeholder}
                maxLength={maxLength}
                dir={dir}
                className={`block w-full bg-transparent border appearance-none focus:outline-none rounded-md peer p-3 text-sm focus:ring-0 disabled:opacity-30
                    ${error
                    ? "border-red-500 focus:border-red-500 text-red-600 dark:text-red-400"
                    : "border-gray-300 dark:border-slate-500 text-gray-900 dark:text-white focus:border-blue-900 dark:focus:border-slate-400"
                }
                ${className}`}
            />
            <label
                htmlFor={id}
                className={`absolute text-sm right-3 duration-100 transform px-2 select-none pointer-events-none top-3.5 -translate-y-6 scale-75 peer-placeholder-shown:top-2.5 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-white peer-focus:top-3.5 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-900 bg-white dark:bg-slate-800
                ${error
                    ? "text-red-500 dark:text-red-400 peer-focus:text-red-500 dark:peer-focus:text-red-400 peer-disabled:text-red-500/30 dark:peer-disabled:text-red-400/30"
                    : "text-gray-500 dark:text-white peer-focus:text-blue-900 dark:peer-focus:text-slate-400 peer-disabled:text-gray-500/30 dark:peer-disabled:text-white/30"
                }`}
            >
                {label}
                {required && <span
                    className="text-red-500 dark:text-red-400 mr-1">*</span>}
            </label>

            {error && (
                <p className="mt-1 text-xs text-red-500 dark:text-red-400 flex items-center disabled:opacity-30 peer-disabled:text-red-500/30 dark:peer-disabled:text-red-400/30">
                    <BadgeAlert className={`w-3 h-3 ml-1`}></BadgeAlert>{error}
                </p>
            )}
        </div>
    )
} 