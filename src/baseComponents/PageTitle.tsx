interface PageTitleProps {
    title: string
    subtitle?: string
    className?: string
}

export default function PageTitle({
                                      title,
                                      subtitle,
                                      className = ""
                                  }: PageTitleProps) {
    return (
        <div className={`mb-8 text-right ${className}`}>
            <div className="flex items-center justify-end mb-2 flex-row-reverse">
                <h1 className="text-lg font-black dark:text-white">{title}</h1>
            </div>
            {subtitle && (
                <p className="text-sm text-gray-600 text-right dark:text-white">{subtitle}</p>
            )}


        </div>
    )
} 