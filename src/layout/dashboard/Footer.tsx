import FormToast from "../../baseComponents/Toast";
import {useToastStore } from "../../libs/store";
import { toastActions } from "../../libs/store/toastActions";
import packageJson from '../../../package.json';

export default function Footer() {
  const { toast } = useToastStore();

  return (
    <>
      <footer className="text-xs text-gray-500 px-4 py-2 flex justify-between bg-white rounded-lg mb-4 ml-4 dark:bg-slate-800 dark:text-white">
        <span>نسخه {packageJson.version}</span>
        <span>شنبه 16/10/1403</span>

        {toast && (
          <div className="fixed z-50">
            <FormToast
              message={toast.message}
              type={toast.type}
              duration={toast.duration || 5000}
              onClose={() => toastActions.hideToast()}
            />
          </div>
        )}
      </footer>
    </>
  );
}
