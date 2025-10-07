import { useState } from "react";
import { Trash2 } from 'lucide-react'


interface FormUploadProps {
    label: string;
    accept: string;
    disabled?: boolean;
    onChange: (value: File | File[] | null | {}) => void
    dragDropLabel: string;
    subLabel: string;
    id: string;
    name: string;
    className?: string;
    required?: boolean;
    multiple?: boolean;
    maxFileSize?: number;
    value?: File | File[] | {} | []
}

export default function FormUpload({
    id,
    name,
    label,
    accept,
    disabled,
    onChange,
    dragDropLabel,
    subLabel,
    className,
    required,
    multiple = false,
    maxFileSize = 5,
}: FormUploadProps) {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateFiles = (files: File[]) => {
        setSelectedFiles((prev) => {
            let newFiles = multiple ? [...prev, ...files] : files;
            newFiles = newFiles.filter(
                (file, index, self) =>
                    index === self.findIndex((f) => f.name === file.name && f.size === file.size)
            );
            if (multiple) {
                onChange(newFiles);
            } else {
                onChange(newFiles[0] ?? null);
            }
            return newFiles;
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            onChange(null);
            setError(null);
            return;
        }

        const files = Array.from(e.target.files);
        const validFiles = files.filter(file => {
            const allowedTypes = accept.split(",");
            const isValidType = allowedTypes.includes(file.type);
            const isValidSize = file.size / 1024 / 1024 <= maxFileSize;
            return isValidType && isValidSize;
        });

        if (validFiles.length === 0) {
            onChange(multiple ? [] : null);
            setError('حجم یا فرمت فایل انتخاب شده معتبر نیست!');
            return;
        }

        setError(null);
        updateFiles(multiple ? validFiles : [validFiles[0]]);
        e.target.value = "";
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) {
            setError(null);
            return;
        }

        const files = Array.from(e.dataTransfer.files);
        const validFiles = files.filter(file => {
            const allowedTypes = accept.split(",");
            const isValidType = allowedTypes.includes(file.type);
            const isValidSize = file.size / 1024 / 1024 <= maxFileSize;
            return isValidType && isValidSize;
        });

        if (validFiles.length === 0) {
            onChange(multiple ? [] : null);
            setError('حجم یا فرمت فایل انتخاب شده معتبر نیست!');
            return;
        }

        setError(null);
        updateFiles(multiple ? validFiles : [validFiles[0]]);
    };

    const removeFile = (index: number) => {
        setSelectedFiles((prev) => {
            const newFiles = prev.filter((_, i) => i !== index);
            onChange(multiple ? newFiles : newFiles[0] ?? null);
            return newFiles;
        });
    };

    return (
        <div>
            <label
                htmlFor={id}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                className={`mt-1 flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md cursor-pointer transition ${isDragOver ? "border-indigo-500 bg-indigo-50" : "border-gray-300"}`}
            >
                <input
                    id={id}
                    name={name}
                    type="file"
                    className={`hidden ${className}`}
                    onChange={handleInputChange}
                    accept={accept}
                    disabled={disabled}
                    multiple={multiple}
                />
                <div className="flex align-middle mb-2 items-center">
                    <svg
                        className="mx-auto h-8 w-8 fill-gray-600"
                        viewBox="0 0 682.667 682.667"
                    >
                        <path
                            d="M259.279.005a10.001 10.001 0 0 0-9.667 8.969l-8.724 84.484-221.927 30.06a10.001 10.001 0 0 0-8.568 11.25l68.648 507.284a10.001 10.001 0 0 0 11.253 8.568l57.37-7.768v29.815a10.001 10.001 0 0 0 10 10h321.375a10.001 10.001 0 0 0 .544-.036 10.001 10.001 0 0 0 1.318-.161 10.001 10.001 0 0 0 1.307-.341 10.001 10.001 0 0 0 1.32-.549 10.001 10.001 0 0 0 1.234-.734 10.001 10.001 0 0 0 1.344-1.104l83.573-83.508a10.001 10.001 0 0 0 1.112-1.357 10.001 10.001 0 0 0 .682-1.128 10.001 10.001 0 0 0 .563-1.315 10.001 10.001 0 0 0 .357-1.305 10.001 10.001 0 0 0 .18-1.367 10.001 10.001 0 0 0 .039-.602v-22.115l36.146 3.737a10.001 10.001 0 0 0 10.974-8.919l6.477-62.724a10 10 0 0 0-19.893-2.055l-5.448 52.773-28.255-2.919V160.755a10.001 10.001 0 0 0-10-10H441.38l-9.88-73.023a10.001 10.001 0 0 0-11.253-8.568L261.279 90.695l7.201-69.719L651.388 60.55l-39.49 382.43a10 10 0 1 0 19.893 2.055l40.516-392.375a10.001 10.001 0 0 0-8.917-10.974L260.586.055a10.001 10.001 0 0 0-1.307-.049zm153.742 90.318l8.177 60.432H157.664a10.001 10.001 0 0 0-10 10v76.138a10.001 10.001 0 0 0 10.26 9.997l.115-.005a10 10 0 0 0 9.737-10.258 10 10 0 0 0-.112-.25v-65.622h384.948v385.138a10 10 0 0 0 0 .128v23.138h-73.573a10.001 10.001 0 0 0-10 10v73.508H167.664V290.498a10 10 0 0 0 .112-.273 10 10 0 0 0-9.802-9.917 10.001 10.001 0 0 0-10.31 9.909v332.451l-50.146 6.792-65.966-487.464 219.651-29.753a10 10 0 0 0 .346-.047l161.471-21.872zm76.018 508.836h49.417l-49.417 49.378v-49.378z" />
                    </svg>
                    <span className="mr-3 bg-gray-200 px-2 rounded-md ">
                        {label}
                        {required && <span className="text-red-500 mr-1">*</span>}
                    </span>
                </div>
                <div className="flex text-sm">
                    <p className="pr-1 mb-2">{dragDropLabel}</p>
                </div>
                <p className="text-xs text-gray-500">{subLabel}</p>
            </label>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            {selectedFiles.length > 0 && (

                <div className="mt-4 space-y-2">
                    {selectedFiles.map((file, index) => {
                        const isImage = file.type.startsWith("image/");
                        return (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-2 border border-gray-300 rounded-md"
                            >


                                {isImage ? (
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        className="w-8 h-8 object-cover rounded"
                                    />
                                ) : (
                                    <svg
                                        className="mx-auto h-8 w-8 fill-gray-600"
                                        viewBox="0 0 682.667 682.667"
                                    >
                                        <path
                                            d="M259.279.005a10.001 10.001 0 0 0-9.667 8.969l-8.724 84.484-221.927 30.06a10.001 10.001 0 0 0-8.568 11.25l68.648 507.284a10.001 10.001 0 0 0 11.253 8.568l57.37-7.768v29.815a10.001 10.001 0 0 0 10 10h321.375a10.001 10.001 0 0 0 .544-.036 10.001 10.001 0 0 0 1.318-.161 10.001 10.001 0 0 0 1.307-.341 10.001 10.001 0 0 0 1.32-.549 10.001 10.001 0 0 0 1.234-.734 10.001 10.001 0 0 0 1.344-1.104l83.573-83.508a10.001 10.001 0 0 0 1.112-1.357 10.001 10.001 0 0 0 .682-1.128 10.001 10.001 0 0 0 .563-1.315 10.001 10.001 0 0 0 .357-1.305 10.001 10.001 0 0 0 .18-1.367 10.001 10.001 0 0 0 .039-.602v-22.115l36.146 3.737a10.001 10.001 0 0 0 10.974-8.919l6.477-62.724a10 10 0 0 0-19.893-2.055l-5.448 52.773-28.255-2.919V160.755a10.001 10.001 0 0 0-10-10H441.38l-9.88-73.023a10.001 10.001 0 0 0-11.253-8.568L261.279 90.695l7.201-69.719L651.388 60.55l-39.49 382.43a10 10 0 1 0 19.893 2.055l40.516-392.375a10.001 10.001 0 0 0-8.917-10.974L260.586.055a10.001 10.001 0 0 0-1.307-.049zm153.742 90.318l8.177 60.432H157.664a10.001 10.001 0 0 0-10 10v76.138a10.001 10.001 0 0 0 10.26 9.997l.115-.005a10 10 0 0 0 9.737-10.258 10 10 0 0 0-.112-.25v-65.622h384.948v385.138a10 10 0 0 0 0 .128v23.138h-73.573a10.001 10.001 0 0 0-10 10v73.508H167.664V290.498a10 10 0 0 0 .112-.273 10 10 0 0 0-9.802-9.917 10.001 10.001 0 0 0-10.31 9.909v332.451l-50.146 6.792-65.966-487.464 219.651-29.753a10 10 0 0 0 .346-.047l161.471-21.872zm76.018 508.836h49.417l-49.417 49.378v-49.378z" />
                                    </svg>
                                )}
                                <span className="flex-1 text-xs truncate">{file.name}</span>
                                <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="text-red-500 cursor-pointer"
                                >
                                    <Trash2 />
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
