"use client";

import { useState } from "react";
import { FAQsSection } from "@/lib/types";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function FAQs({ data }: { data: FAQsSection }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          سوالات و جوابات
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          الحاق کے عمل سے متعلق اکثر پوچھے گئے سوالات
        </p>
      </div>
      <div className="space-y-4">
        {data.FAQs.map((faq, index) => (
          <div
            key={faq.id}
            className="bg-white dark:bg-[#1a2230] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between p-5 text-right focus:outline-none group"
            >
              <span className="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary transition">
                {faq.question}
              </span>
              <span
                className={`material-symbols-outlined text-gray-400 group-hover:text-primary transition transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                expand_more
              </span>
            </button>
            <div
              className={`px-5 pb-5 text-gray-600 dark:text-gray-300 text-sm leading-loose ${
                openIndex === index ? "block" : "hidden"
              }`}
            >
              <div className="prose prose-sm dark:prose-invert max-w-none font-display">
                <BlocksRenderer content={faq.answer} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
