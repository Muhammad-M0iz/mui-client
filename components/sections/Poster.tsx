import { PosterSection } from "@/lib/types";
import { getStrapiMedia } from "@/lib/api";
import Image from "next/image";
import { getTranslation } from "@/lib/translations";

export default function Poster({
  data,
  locale = "ur",
}: {
  data: PosterSection;
  locale?: string;
}) {
  const imageUrl = getStrapiMedia(data.image.images.url);
  const t = (key: any) => getTranslation(locale, key);

  return (
    <section className="px-6 lg:px-40 py-16 bg-background-light dark:bg-background-dark border-y border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {t("facebook_visit")}
        </h2>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="relative w-full max-w-md mx-auto aspect-[1/1.414] rounded-xl overflow-hidden shadow-sm group">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={data.image.title || "Poster"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <span className="text-gray-400">{t("no_image")}</span>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-[#1a2230] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-full min-h-[600px] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#1877F2] text-3xl">
                social_leaderboard
              </span>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">
                  {t("official_page")}
                </h4>
                <p className="text-xs text-gray-500">{t("follow_facebook")}</p>
              </div>
            </div>
            <a
              href="https://www.facebook.com/muiedu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-1 rounded text-gray-600 dark:text-gray-300 transition-colors"
            >
              {t("like_page")}
            </a>
          </div>
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fmuiedu&tabs=timeline&width=500&height=800&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              width="100%"
              height="100%"
              style={{ border: "none", overflow: "hidden", minHeight: "100%" }}
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}