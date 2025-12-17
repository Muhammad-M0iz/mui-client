import { getPageData } from "@/lib/api";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Department from "@/components/sections/Department";
import FAQs from "@/components/sections/FAQs";
import Members from "@/components/sections/Members";
import { DepartmentSection, FAQsSection, MembersSection } from "@/lib/types";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "ur";
  const pageData = await getPageData(slug, locale);

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
            default:
              return null;
          }
        })}
      </main>

      <Footer />
    </div>
  );
}
