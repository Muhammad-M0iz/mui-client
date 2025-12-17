import { BookletSection } from "@/lib/types";
import { getStrapiMedia } from "@/lib/api";
import Image from "next/image";

export default function Booklet({ data }: { data: BookletSection }) {
  const imageUrl = getStrapiMedia(data.image.url);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col gap-6 items-center text-center hover:shadow-md transition-all h-full justify-center max-w-md mx-auto w-full aspect-[1/1.414]">
      <div className="w-48 sm:w-64 shrink-0 shadow-lg rounded-lg overflow-hidden border border-gray-100 dark:border-gray-600 group cursor-pointer aspect-2/3 relative">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={data.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-col gap-4 w-full items-center">
        <div>
          <span className="inline-block px-2 py-1 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider mb-2">
            Featured
          </span>
          <h4 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
            {data.title}
          </h4>
        </div>
        <a
          href={data.link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 w-fit"
        >
          <span className="material-symbols-outlined text-[20px]">
            download
          </span>
          Download PDF
        </a>
      </div>
    </div>
  );
}
