
import { useEffect, useState } from "react";

export default function Footer() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };


  return (
    <>
      <footer className="text-xs text-gray-500 px-4 py-2 flex justify-between bg-white rounded-lg mb-4 ml-4 dark:bg-slate-800 dark:text-white">
        <button
          onClick={toggleTheme}
          className="px-4 py-1 text-sm rounded bg-gray-200 dark:bg-gray-700 dark:text-white transition"
        >
          {isDark ? "روشن" : "تاریک"}
        </button>
      </footer>
    </>
  );
}
