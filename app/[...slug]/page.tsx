import { getPageData } from "@/lib/api";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Department from "@/components/sections/Department";
import FAQs from "@/components/sections/FAQs";
import Members from "@/components/sections/Members";
import Downloads from "@/components/sections/Downloads";
import Content from "@/components/sections/Content";
import List from "@/components/sections/List";
import Table from "@/components/sections/Table";
import Grid from "@/components/sections/Grid";
import {
  DepartmentSection,
  FAQsSection,
  MembersSection,
  DownloadsSection,
  ContentSection,
  ListSection,
  TableSection,
  GridSection,
} from "@/lib/types";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";

import { getTranslation } from "@/lib/translations";
import ToastTrigger from "@/components/ToastTrigger";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug: slugArray } = await params;

  // Use the last segment of the slug array for the API call.
  const effectiveSlug = slugArray[slugArray.length - 1];

  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "ur";
  
  let pageData = await getPageData(effectiveSlug, locale);
  let isFallback = false;
  let displayLocale = locale;

  // If content is missing in the current locale
  if (!pageData) {
    const otherLocale = locale === "ur" ? "en" : "ur";
    const fallbackData = await getPageData(effectiveSlug, otherLocale);

    if (fallbackData) {
      // Use the fallback data (from the other language)
      pageData = fallbackData;
      isFallback = true;
      displayLocale = otherLocale; // Use the locale of the actual content found
    } else {
      // If it doesn't exist in any language, show 404
      notFound();
    }
  }

  const dir = displayLocale === "ur" ? "rtl" : "ltr";

  return (
    <div
      dir={dir}
      className="flex flex-col min-h-screen overflow-x-hidden bg-background-light dark:bg-background-dark text-[#0d121b] dark:text-white font-display"
    >
      {isFallback && (
        <ToastTrigger 
          message={getTranslation(locale, "page_not_available" as any)} 
          id={effectiveSlug}
          fallbackLocale={displayLocale}
        />
      )}
      <Header locale={displayLocale} />

      <main className="flex-1 container mx-auto px-4 py-12 space-y-20">
        {pageData.section.map((section, index) => {
          switch (section.__component) {
            case "page.department":
              return (
                <Department
                  key={`${section.__component}-${index}`}
                  data={section as DepartmentSection}
                />
              );
            case "page.fa-qs":
              return (
                <FAQs
                  key={`${section.__component}-${index}`}
                  data={section as FAQsSection}
                />
              );
            case "page.members":
              return (
                <Members
                  key={`${section.__component}-${index}`}
                  data={section as MembersSection}
                />
              );
            case "page.downloads":
              return (
                <Downloads
                  key={`${section.__component}-${index}`}
                  data={section as DownloadsSection}
                  locale={displayLocale}
                />
              );
            case "page.content":
              return (
                <Content
                  key={`${section.__component}-${index}`}
                  data={section as ContentSection}
                />
              );
            case "page.list":
              return (
                <List
                  key={`${section.__component}-${index}`}
                  data={section as ListSection}
                />
              );
            case "page.table":
              return (
                <Table
                  key={`${section.__component}-${index}`}
                  data={section as TableSection}
                  locale={displayLocale}
                />
              );
            case "page.grid":
              return (
                <Grid
                  key={`${section.__component}-${index}`}
                  data={section as GridSection}
                  locale={displayLocale}
                />
              );
            default:
              return null;
          }
        })}
      </main>

      <Footer />
    </div>
  );
}
