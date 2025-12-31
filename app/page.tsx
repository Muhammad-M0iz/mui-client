import { getHomePageData } from "@/lib/api";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroVideo from "@/components/sections/HeroVideo";
import ImportantLinksWidget from "@/components/sections/ImportantLinksWidget";
import Booklet from "@/components/sections/Booklet";
import Announcements from "@/components/sections/Announcements";
import VideoGrid from "@/components/sections/VideoGrid";
import Poster from "@/components/sections/Poster";
import Activities from "@/components/sections/Activities";
import { getTranslation } from "@/lib/translations";
import {
  HeroVideoSection,
  ImportantLinksWidgetSection,
  BookletSection,
  AnnouncementsSection,
  VideoGridSection,
  PosterSection,
  ActivitiesSection,
} from "@/lib/types";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "ur";
  const homeData = await getHomePageData(locale);
  const t = (key: any) => getTranslation(locale, key);

  if (!homeData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Failed to load content.</p>
      </div>
    );
  }

  const heroSection = homeData.sections.find(
    (s) => s.__component === "home.hero-video"
  ) as HeroVideoSection | undefined;

  const linksSection = homeData.sections.find(
    (s) => s.__component === "home.important-links-widget"
  ) as ImportantLinksWidgetSection | undefined;

  const bookletSection = homeData.sections.find(
    (s) => s.__component === "home.booklet"
  ) as BookletSection | undefined;

  const announcementsSection = homeData.sections.find(
    (s) => s.__component === "home.announcements"
  ) as AnnouncementsSection | undefined;

  const videoGridSection = homeData.sections.find(
    (s) => s.__component === "home.video-grid"
  ) as VideoGridSection | undefined;

  const posterSection = homeData.sections.find(
    (s) => s.__component === "home.poster"
  ) as PosterSection | undefined;

  const activitiesSection = homeData.sections.find(
    (s) => s.__component === "home.activities"
  ) as ActivitiesSection | undefined;

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-background-light dark:bg-background-dark text-[#0d121b] dark:text-white font-display">
      <Header locale={locale} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 lg:px-40 py-12 bg-white dark:bg-[#1a2230]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 flex flex-col gap-6">
              {heroSection && <HeroVideo data={heroSection} />}
            </div>
            <div className="lg:col-span-4 flex flex-col h-full">
              {linksSection && <ImportantLinksWidget data={linksSection} />}
            </div>
          </div>
        </section>

        {/* Publications & Campus Highlights Section */}
        <section className="px-6 lg:px-40 py-16 bg-background-light dark:bg-background-dark">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white border-l-4 border-primary pl-3">
                  {t("publications")}
                </h3>
              </div>
              {bookletSection && <Booklet data={bookletSection} />}
            </div>
            <div className="flex flex-col gap-6">
              {announcementsSection && (
                <Announcements data={announcementsSection} locale={locale} />
              )}
            </div>
          </div>
        </section>

        {/* Knowledge Hub (Video Grid) */}
        {videoGridSection && <VideoGrid data={videoGridSection} />}

        {/* Poster Section */}
        {posterSection && <Poster data={posterSection} locale={locale} />}

        {/* Upcoming Events (Activities) */}
        {activitiesSection && (
          <Activities data={activitiesSection} locale={locale} />
        )}
      </main>

      <Footer />
    </div>
  );
}
