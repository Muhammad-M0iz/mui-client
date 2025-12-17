"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function LocaleSwitcher() {
  const router = useRouter();
  const [locale, setLocale] = useState("ur");

  useEffect(() => {
    const match = document.cookie.match(new RegExp("(^| )locale=([^;]+)"));
    if (match) {
      setLocale(match[2]);
    }
  }, []);

  const switchLocale = (newLocale: string) => {
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`; // 1 year
    setLocale(newLocale);
    router.refresh();
  };

  return (
    <div className="flex gap-2 text-sm">
      <button
        onClick={() => switchLocale("ur")}
        className={`px-2 py-1 rounded ${
          locale === "ur" ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
        }`}
      >
        اردو
      </button>
      <button
        onClick={() => switchLocale("en")}
        className={`px-2 py-1 rounded ${
          locale === "en" ? "bg-primary text-white" : "bg-gray-200 text-gray-700"
        }`}
      >
        English
      </button>
    </div>
  );
}
