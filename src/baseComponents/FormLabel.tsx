interface FormLabelProps {
    label: string;
    data: string;
}

export default function FormLabel({
                                      label,
                                      data,
                                  }: FormLabelProps) {
    return (
        <div className="flex items-stretch">
            <label
                className="flex items-center text-sm text-gray-700 dark:text-gray-400 bg-gray-100 dark:bg-slate-900 py-2 px-3 rounded-r-lg ml-0.5">{label}</label>
            <span
                className="flex-1 flex items-center text-sm text-blue-900 dark:text-white bg-gray-100 dark:bg-slate-900 py-2 px-3 rounded-l-lg">{data}</span>
        </div>
    )
}