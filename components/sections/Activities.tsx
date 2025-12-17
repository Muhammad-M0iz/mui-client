import { ActivitiesSection } from "@/lib/types";
import { getStrapiMedia } from "@/lib/api";
import Image from "next/image";
import { getTranslation } from "@/lib/translations";

export default function Activities({
  data,
  locale = "ur",
}: {
  data: ActivitiesSection;
  locale?: string;
}) {
  const t = (key: any) => getTranslation(locale, key);

  return (
    <section className="px-6 lg:px-40 py-16 bg-white dark:bg-[#1a2230]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {data.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.activities.map((activity) => {
            const imageUrl = getStrapiMedia(activity.Image.url);
            return (
              <div
                key={activity.id}
                className="flex flex-col gap-3 group w-full"
              >
                <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-gray-100">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={activity.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors text-lg truncate">
                    {activity.title}
                  </h4>
                  <a
                    className="text-xs font-bold text-primary uppercase tracking-wide hover:underline"
                    href={activity.link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("read_more")}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
