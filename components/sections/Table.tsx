import React from "react";
import { TableSection } from "@/lib/types";

interface TableProps {
  data: TableSection;
  locale?: string;
}

export default function Table({ data, locale = "ur" }: TableProps) {
  const { title, Table: tableData } = data;
  const isRtl = locale === "ur";

  if (!tableData || !tableData.columns || !tableData.rows) {
    return null;
  }

  return (
    <section className="w-full max-w-7xl mx-auto py-8" dir={isRtl ? "rtl" : "ltr"}>
      {title && (
        <h2 className={`text-2xl font-bold mb-6 text-primary dark:text-white border-primary ${
          isRtl ? "border-r-4 pr-4" : "border-l-4 pl-4"
        }`}>
          {title}
        </h2>
      )}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <table className={`w-full border-collapse ${isRtl ? "text-right" : "text-left"}`}>
          <thead>
            <tr className="bg-gray-50 dark:bg-[#1a2230] border-b border-gray-200 dark:border-gray-800">
              {tableData.columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-sm font-bold text-gray-700 dark:text-gray-200"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
