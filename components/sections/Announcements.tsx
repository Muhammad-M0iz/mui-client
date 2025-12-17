"use client";

import { useState, useEffect } from "react";
import { AnnouncementsSection } from "@/lib/types";
import { getStrapiMedia } from "@/lib/api";
import Image from "next/image";
import { getTranslation } from "@/lib/translations";

export default function Announcements({
  data,
  locale = "ur",
}: {
  data: AnnouncementsSection;
  locale?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = (key: any) => getTranslation(locale, key);
  const isRTL = locale === "ur";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.announcements.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [data.announcements.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % data.announcements.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + data.announcements.length) % data.announcements.length
    );
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white border-l-4 border-primary pl-3">
          {t("announcements")}
        </h3>
        <div className="flex gap-2" dir="ltr">
          <button
            onClick={isRTL ? nextSlide : prevSlide}
            className="size-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_back
            </span>
          </button>
          <button
            onClick={isRTL ? prevSlide : nextSlide}
            className="size-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      <div className="relative w-full max-w-md mx-auto aspect-[1/1.414] rounded-xl overflow-hidden shadow-lg group bg-white dark:bg-gray-800">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          dir={isRTL ? "rtl" : "ltr"}
          style={{
            transform: `translateX(${isRTL ? "" : "-"}${currentIndex * 100}%)`,
          }}
        >
          {data.announcements.map((announcement) => {
            const imageUrl =
              announcement.image && announcement.image.length > 0
                ? getStrapiMedia(announcement.image[0].url)
                : null;

            return (
              <div
                key={announcement.id}
                className="min-w-full h-full relative"
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={announcement.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-400">{t("no_image")}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                  <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded w-fit mb-2">
                    {t("featured")}
                  </span>
                  <h4 className="text-white text-xl font-bold line-clamp-2">
                    {announcement.title}
                  </h4>
                  <a
                    href={announcement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-white text-sm font-medium underline underline-offset-4 decoration-primary hover:text-primary transition-colors w-fit"
                  >
                    {t("read_full_story")}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
