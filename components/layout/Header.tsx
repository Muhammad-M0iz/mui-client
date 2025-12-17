import { getNavigation } from "@/lib/api";
import Navigation from "./Navigation";
import Image from "next/image";
import LocaleSwitcher from "./LocaleSwitcher";
import { cookies } from "next/headers";

export default async function Header() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "ur";
  const dir = locale === "ur" ? "rtl" : "ltr";
  const navigationItems = await getNavigation(locale);

  return (
    <header className="bg-white dark:bg-[#1a2230] shadow-sm border-b border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400 gap-4">
        <div className="flex items-center gap-6">
          <LocaleSwitcher />
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">
              phone
            </span>
            <div className="flex flex-col text-xs leading-tight">
              <span>0313-6122229</span>
              <span>0315-6122229</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">
              email
            </span>
            <div className="flex flex-col text-xs leading-tight">
              <span>info@mui.edu.pk</span>
              <span>majmaedu3@gmail.com</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-center md:text-right">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">
              location_on
            </span>
            <span className="text-xs">
              احسن آباد، اسکیم 33، کراچی، پاکستان
            </span>
          </div>
          <div className="relative h-12 w-48 hidden md:block">
            <Image
              src="/logoMa.png"
              alt="Majma Ul Uloom Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
      <Navigation items={navigationItems} dir={dir} />
    </header>
  );
}
