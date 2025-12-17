import { getFooterData } from "@/lib/api";
import Image from "next/image";
import { cookies } from "next/headers";

// Icons
const FacebookIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const XIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

export default async function Footer() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "ur";
  const footerData = await getFooterData(locale);

  if (!footerData) {
    return null;
  }

  return (
    <footer className="bg-[#2d2d2d] text-gray-300 mt-20 pt-16 pb-8 border-t-4 border-primary" dir={locale === "ur" ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-4">
          {/* Logo Section - Right Extreme */}
          <div className="flex flex-col items-start justify-start lg:w-auto">
            <div className="relative w-48 h-48">
              <Image
                src="/logoMa.png"
                alt="Majma Ul Uloom Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-start lg:w-1/4">
            <h4 className="text-white text-xl font-bold mb-6 border-b border-gray-600 pb-2 inline-block">
              رابطہ
            </h4>
            <p className="text-sm mb-4 leading-relaxed text-gray-400">
              {footerData.info.address}
            </p>
            <a
              href={`mailto:${footerData.info.email}`}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              {footerData.info.email}
            </a>
          </div>

          {/* Phone Numbers Section */}
          <div className="flex flex-col items-start lg:w-1/3">
            <h4 className="text-white text-xl font-bold mb-6 border-b border-gray-600 pb-2 inline-block">
              فون نمبرز
            </h4>
            <ul className="space-y-4 text-sm w-full">
              {footerData.numbers.map((num) => (
                <li
                  key={num.id}
                  className="flex justify-between items-center border-b border-gray-700/50 pb-2 last:border-0 border-dashed"
                >
                  <span className="text-gray-400">{num.title}</span>
                  <span className="font-mono text-gray-300 text-lg" dir="ltr">
                    {num.phone_number}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links Section - Left Extreme */}
          <div className="flex flex-col items-start lg:w-auto">
            <h4 className="text-white text-xl font-bold mb-6 border-b border-gray-600 pb-2 inline-block">
              Follow Us
            </h4>
            <div className="flex gap-3 mb-6">
              {footerData.links.map((link) => {
                const title = link.title.toLowerCase();
                let Icon = null;
                let bgClass = "bg-gray-600 hover:bg-gray-500";

                if (title === "youtube") {
                  Icon = YouTubeIcon;
                  bgClass = "bg-red-600 hover:bg-red-700";
                } else if (title === "facebook") {
                  Icon = FacebookIcon;
                  bgClass = "bg-blue-600 hover:bg-blue-700";
                } else if (title === "x" || title === "twitter") {
                  Icon = XIcon;
                  bgClass = "bg-black hover:bg-gray-900 border border-gray-700";
                }

                return (
                  <a
                    key={link.id}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all transform hover:-translate-y-1 shadow-lg ${bgClass}`}
                    aria-label={link.title}
                  >
                    {Icon ? (
                      <Icon />
                    ) : (
                      <span className="text-xs font-bold">
                        {link.title.substring(0, 2)}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
            <a
              href="https://www.majmaululoom.edu.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors group"
            >
              <span className="material-symbols-outlined group-hover:animate-spin-slow">
                language
              </span>
              <span className="text-sm">www.majmaululoom.edu.pk</span>
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-xs text-gray-500">
          <p>{footerData.copyright_text}</p>
        </div>
      </div>
    </footer>
  );
}   