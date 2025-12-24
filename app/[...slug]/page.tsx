import { getPageData } from "@/lib/api";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Department from "@/components/sections/Department";
import FAQs from "@/components/sections/FAQs";
import Members from "@/components/sections/Members";
import Downloads from "@/components/sections/Downloads";
import Content from "@/components/sections/Content";
import List from "@/components/sections/List";
import {
  DepartmentSection,
  FAQsSection,
  MembersSection,
  DownloadsSection,
  ContentSection,
  ListSection,
} from "@/lib/types";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

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
  const pageData = await getPageData(effectiveSlug, locale);

  if (!pageData) {
    notFound();
  }

  return (
    <div
      className="flex flex-col min-h-screen overflow-x-hidden bg-background-light dark:bg-background-dark text-[#0d121b] dark:text-white font-display"
    >
      <Header />

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
                  locale={locale}
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
            default:
              return null;
          }
        })}
      </main>

      <Footer />
    </div>
  );
}
