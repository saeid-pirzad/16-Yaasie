import Loading from "./Loading.tsx";

interface TableLoadingProps {
    rows?: number
    columns?: number
    className?: string
}

export default function TableLoading({
                                         rows = 5,
                                         columns = 5,
                                         className = 'relative',
                                     }: TableLoadingProps) {
    return (
        <div className={className}>
            <div className="mb-2 h-10 rounded-lg bg-gray-100 dark:bg-slate-700 animate-pulse"></div>
            <div className="bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-800">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-800">
                        <thead className="bg-gray-50 dark:bg-slate-700">
                        <tr>
                            {Array.from({length: columns}).map((_, index) => (
                                <th key={index} className="px-3 py-3 text-right">
                                    <div className="h-3 bg-gray-200 dark:bg-slate-800 rounded animate-pulse"></div>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-slate-600 divide-y divide-gray-200 dark:divide-slate-800">
                        {Array.from({length: rows}).map((_, rowIndex) => (
                            <tr key={rowIndex}>
                                {Array.from({length: columns}).map((_, colIndex) => (
                                    <td key={colIndex} className="px-6 py-4">
                                        <div
                                            className="h-3 bg-gray-100 dark:bg-slate-800 rounded animate-pulse"
                                            style={{
                                                animationDelay: `${(rowIndex * columns + colIndex) * 0.05}s`,
                                                animationDuration: '1.2s'
                                            }}
                                        ></div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-3 py-2 border-t border-blue-100 dark:border-slate-900 animate-pulse h-8">
                    <div className="flex items-center justify-between">
                    </div>
                </div>
            </div>
        </div>
    )
}

interface TableLoadingOverlayProps {
    isLoading?: boolean
    message?: string
}

export function TableLoadingOverlay({
                                        isLoading = false,
                                        message = 'در حال بارگذاری...'
                                    }: TableLoadingOverlayProps) {
    if (!isLoading) return null

    return (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
            <Loading message={message}/>
        </div>
    )
} 