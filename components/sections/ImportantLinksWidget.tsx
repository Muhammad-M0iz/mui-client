import { ImportantLinksWidgetSection } from "@/lib/types";

export default function ImportantLinksWidget({
  data,
}: {
  data: ImportantLinksWidgetSection;
}) {
  return (
    <div className="bg-background-light dark:bg-gray-800 rounded-xl p-6 h-full border border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="flex items-center gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <span className="material-symbols-outlined text-primary">campaign</span>
        <h3 className="text-lg font-bold">Important Links</h3>
      </div>
      <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
        {data.Links.map((link) => (
          <a
            key={link.id}
            className="group flex items-start gap-3 p-3 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-sm"
            href={link.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="size-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">
                link
              </span>
            </div>
            <div>
              <h4 className="text-sm font-semibold group-hover:text-primary transition-colors">
                {link.title}
              </h4>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
