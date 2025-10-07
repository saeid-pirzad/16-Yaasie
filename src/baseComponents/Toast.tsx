import {useEffect, useState, useRef} from 'react'
import {CheckCircle, XCircle, AlertTriangle, Info, X} from 'lucide-react'

interface ToastProps {
    id: number;
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
    duration?: number
    onClose: (id: number) => void;
}

const Toast = ({id, message, type, duration = 5000, onClose}: ToastProps) => {
    const [isVisible, setIsVisible] = useState(false)

    const onCloseRef = useRef(onClose);
    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
        const enterTimer = requestAnimationFrame(() => setIsVisible(true));
        const exitTimer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => onCloseRef.current(id), 300);
        }, duration);

        return () => {
            cancelAnimationFrame(enterTimer);
            clearTimeout(exitTimer);
        };
    }, [])

    const getTypeStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-teal-100/50 text-teal-600 border-teal-500 '
            case 'error':
                return 'bg-red-100/50 text-red-600'
            case 'warning':
                return 'bg-yellow-100/50 text-yellow-600'
            case 'info':
                return 'bg-blue-100/50 text-blue-600'
            default:
                return 'bg-gray-100/50 text-gray-600'
        }
    }

    const getIcon = () => {
        const iconClass = "h-5 w-5"
        switch (type) {
            case 'success':
                return <CheckCircle className={`${iconClass} text-teal-600`}/>
            case 'error':
                return <XCircle className={`${iconClass} text-red-600`}/>
            case 'warning':
                return <AlertTriangle className={`${iconClass} text-yellow-600`}/>
            case 'info':
                return <Info className={`${iconClass} text-blue-600`}/>
            default:
                return <Info className={`${iconClass} text-gray-600`}/>
        }
    }

    return (
        <div
            className={`rounded-lg transition-all duration-300 ease-in-out transform my-2 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.2)]
                 ${
                isVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
            } ${getTypeStyles()}`}
        >
            <div className="flex items-center p-4">
                {getIcon()}
                <div className="mx-1 flex-1">
                    <p className="text-sm font-bold">{message}</p>
                </div>
                <button
                    onClick={() => {
                        setIsVisible(false)
                        setTimeout(() => onClose(id), 300);
                    }}
                    className="inline-flex text-gray-600 hover:text-gray-400 transition ease-in-out duration-150 cursor-pointer opacity-60"
                >
                    <X className="h-5 w-5"/>
                </button>
            </div>
        </div>
    )
}

export default Toast