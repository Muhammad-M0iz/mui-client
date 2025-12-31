"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useTransition } from "react";

export default function LocaleSwitcher({ currentLocale }: { currentLocale?: string }) {
  const router = useRouter();
  const [locale, setLocale] = useState(currentLocale || "ur");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (currentLocale) {
      setLocale(currentLocale);
    } else {
      const match = document.cookie.match(new RegExp("(^| )locale=([^;]+)"));
      if (match) {
        setLocale(match[2]);
      }
    }
  }, [currentLocale]);

  const switchLocale = (newLocale: string) => {
    // Always set the cookie and refresh, even if the visual locale is the same.
    // This handles the case where we are in fallback mode (visual=ur, cookie=en)
    // and the user clicks "ur" to confirm they want Urdu preference.
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`; // 1 year
    
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className={`flex gap-2 text-sm ${isPending ? "opacity-70 pointer-events-none" : ""}`}>
      <button
        onClick={() => switchLocale("ur")}
        disabled={isPending}
        className={`px-2 py-1 rounded transition-colors ${
          locale === "ur" ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        اردو
      </button>
      <button
        onClick={() => switchLocale("en")}
        disabled={isPending}
        className={`px-2 py-1 rounded transition-colors ${
          locale === "en" ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        English
      </button>
    </div>
  );
}
