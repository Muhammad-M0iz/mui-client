"use client";

import { DownloadsSection } from "@/lib/types";
import { getStrapiMedia } from "@/lib/api";
import { getTranslation } from "@/lib/translations";

export default function Downloads({
  data,
  locale = "ur",
}: {
  data: DownloadsSection;
  locale?: string;
}) {
  const t = (key: any) => getTranslation(locale, key);
  const isRTL = locale === "ur";

  return (
    <section className="max-w-4xl mx-auto">
      <div className="text-center mb-12 relative">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
          {isRTL ? "نصابی و حوالہ جاتی کتب" : "Curriculum and Reference Books"}
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg">
          {isRTL
            ? "براہ کرم ڈاؤن لوڈ کرنے کے لیے نیچے دیے گئے لنکس پر کلک کریں۔"
            : "Please click on the links below to download."}
        </p>
      </div>

      <div className="bg-white dark:bg-[#1f2937] rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          <span>{isRTL ? "فائل کا نام" : "File Name"}</span>
          <span>{isRTL ? "عمل" : "Action"}</span>
        </div>
        <ul className="divide-y divide-gray-100 dark:divide-gray-700">
          {data.downloads.map((item) => {
            const fileUrl = getStrapiMedia(item.download.url);
            const isPdf = item.download.ext === ".pdf";

            return (
              <li
                key={item.id}
                className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <a
                  href={fileUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        isPdf
                          ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                          : "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      }`}
                    >
                      <span className="material-symbols-outlined">
                        {isPdf ? "picture_as_pdf" : "description"}
                      </span>
                    </div>
                    <span className="text-lg text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors pt-2">
                      {item.title}
                    </span>
                  </div>
                  <span className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                    <span className="material-symbols-outlined text-sm">
                      download
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
