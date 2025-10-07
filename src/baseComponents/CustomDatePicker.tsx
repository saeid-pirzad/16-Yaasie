import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import gregorian from 'react-date-object/calendars/gregorian'
import gregorian_en from 'react-date-object/locales/gregorian_en'
import {Calendar} from 'lucide-react'

interface CustomDatePickerProps {
    id: string
    name: string
    label: string
    value: string
    onChange: (date: string) => void
    error?: string
    required?: boolean
    disabled?: boolean
    className?: string
    locale?: string
}

export default function CustomDatePicker({
                                             id,
                                             label,
                                             value,
                                             onChange,
                                             error,
                                             required = false,
                                             disabled = false,
                                             className = '',
                                             locale = 'fa'
                                         }: CustomDatePickerProps) {
    const isPersian = locale === 'fa'

    const handleDateChange = (date: any) => {
        if (date) {
            onChange(date.format('YYYY-MM-DD'))
        } else {
            onChange('')
        }
    }

    return (
        <div className="relative w-full m-1">
            <DatePicker
                value={value}
                onChange={handleDateChange}
                calendar={isPersian ? persian : gregorian}
                locale={isPersian ? persian_fa : gregorian_en}
                // format={isPersian ? 'YYYY/MM/DD' : 'MM/DD/YYYY'}
                calendarPosition="bottom-start"
                className={`w-full`}
                inputClass={`block w-full bg-transparent border border-gray-300 dark:border-slate-500 appearance-none focus:outline-none rounded-md peer focus:border-blue-900 dark:focus:border-slate-400 p-3 text-sm text-gray-900 focus:ring-0 dark:text-white dark:[&>option]:text-black ${className}`}
                containerClassName="w-full"
                style={{
                    width: '100%'
                }}
                disabled={disabled}
                placeholder=" "
            />
            <Calendar
                className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none left-3"
            />
            <label
                htmlFor={id}
                className={`absolute text-sm text-gray-500 right-3 duration-200 transform bg-white px-2 select-none pointer-events-none transition-all dark:text-white dark:peer-focus:text-slate-400 dark:bg-slate-800 ${
                    value ? 'top-3 -translate-y-6 scale-75 text-blue-600' : 'top-2.5 translate-y-0 scale-100'
                }`}
            >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {error && (
                <p className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    )
}