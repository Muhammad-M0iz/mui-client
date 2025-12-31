import React from "react";
import Image from "next/image";
import { GridSection } from "@/lib/types";

interface GridProps {
  data: GridSection;
  locale?: string;
}

export default function Grid({ data, locale = "ur" }: GridProps) {
  const { Heading, Columns, Cards } = data;
  const isRtl = locale === "ur";

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1338";

  const getGridCols = (cols: string) => {
    switch (cols) {
      case "one":
        return "grid-cols-1";
      case "two":
        return "grid-cols-1 md:grid-cols-2";
      case "three":
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case "four":
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-3";
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto py-12" dir={isRtl ? "rtl" : "ltr"}>
      {Heading && (
        <h2 className={`text-3xl font-bold mb-10 text-primary dark:text-white border-primary ${
          isRtl ? "border-r-4 pr-4" : "border-l-4 pl-4"
        }`}>
          {Heading}
        </h2>
      )}
      <div className={`grid gap-8 ${getGridCols(Columns)}`}>
        {Cards.map((card) => (
          <div
            key={card.id}
            className="group bg-white dark:bg-[#1a2230] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center"
          >
            {card.icon && (
              <div className="relative w-20 h-20 mb-6 rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800/50 p-2 group-hover:scale-110 transition-transform duration-300">
                <Image
                  src={`${STRAPI_URL}${card.icon.url}`}
                  alt={card.title}
                  fill
                  className="object-contain p-2"
                />
              </div>
            )}
            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-primary transition-colors">
              {card.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
              {card.Description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
