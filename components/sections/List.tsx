"use client";

import { ListSection } from "@/lib/types";

export default function List({ data }: { data: ListSection }) {
  return (
    <section className="max-w-4xl mx-auto py-8">
      {data.Heading && (
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white border-r-4 border-primary pr-4 font-display">
          {data.Heading}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.List.map((item) => (
          <div 
            key={item.id}
            className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-gray-700 hover:border-primary/30 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-xl">person</span>
            </div>
            <span className="text-lg font-medium text-gray-800 dark:text-gray-200 font-display">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
