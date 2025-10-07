import { useTranslation } from "react-i18next";
import { X } from "lucide-react";


type PromisorModalProps = {
    isOpen: boolean;
    close: () => void;
    main: React.ReactNode;
    header?: React.ReactNode;
    footerButtons?: React.ReactNode;
    isRTL?: boolean
};

export default function ModalTemplate({ isOpen, close, main, footerButtons, isRTL }: PromisorModalProps) {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div
                className={`bg-white rounded-lg shadow-xl max-w-2xl w-full h-[90vh] flex flex-col ${isRTL ? 'rtl' : 'ltr'}`}>
                {/* Header */}
                <div
                    className={`flex justify-between items-center p-6 border-b border-gray-200 flex-shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <h2 className={`text-xl font-semibold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {t('ModalPreview')}
                    </h2>
                    <button
                        onClick={close}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">{main}</div>

                {/* Footer */}
                <div className="flex justify-between items-center p-6 border-t border-gray-200 flex-shrink-0">
                    {footerButtons && <div className="flex gap-2 justify-end">{footerButtons}</div>}
                </div>


            </div>
        </div>
    );
}
