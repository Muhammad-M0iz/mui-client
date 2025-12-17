"use client";

import { MembersSection } from "@/lib/types";
import { getStrapiMedia } from "@/lib/api";
import Image from "next/image";

export default function Members({ data }: { data: MembersSection }) {
  const { board_members } = data;

  // Assuming the order is fixed: 1st is President, 2nd is Vice President, rest are members
  // If not, we might need to filter by designation or add a field in Strapi
  const president = board_members[0];
  const vicePresident = board_members[1];
  const otherMembers = board_members.slice(2);

  return (
    <div className="py-12 md:py-16">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold text-primary drop-shadow-sm">
          تعارف اراکین شوریٰ مجمع العلوم الاسلامیہ
        </h1>
        <div className="h-1 w-32 mx-auto bg-primary rounded-full opacity-60"></div>
        <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider border-b-2 border-dashed border-gray-300 dark:border-gray-700 pb-2 inline-block">
          Governing Body of Board of Islamic Sciences, Pakistan
        </h2>
      </div>

      {/* President */}
      {president && (
        <div className="flex justify-center mb-20">
          <div className="w-full max-w-2xl bg-white dark:bg-[#262626] rounded-2xl shadow-sm dark:shadow-none dark:border dark:border-gray-700 overflow-hidden transform hover:-translate-y-1 transition duration-300">
            <div className="flex flex-col items-center p-8 md:p-10 relative">
              <div className="absolute top-0 w-full h-32 bg-gradient-to from-primary/10 to-transparent"></div>
              <div className="relative z-10 w-64 h-64 md:w-72 md:h-72 mb-6 rounded-full border-4 border-primary p-1 shadow-lg bg-white dark:bg-gray-800">
                {president.image && (
                  <Image
                    src={getStrapiMedia(president.image.url) || ""}
                    alt={president.name_en}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover rounded-full"
                  />
                )}
              </div>
              <h3 className="text-3xl font-bold text-[#0e7490] dark:text-sky-400 mb-1 text-center">
                {president.name_ur}
              </h3>
              <p className="text-lg font-semibold text-gray-500 dark:text-gray-400 mb-2 border-b border-primary/30 pb-1">
                {president.name_en}
              </p>
              <div className="text-center space-y-1 mb-6">
                <p className="text-2xl text-primary">{president.designation_ur}</p>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  {president.designation_en}
                </p>
              </div>
              <ul className="w-full space-y-2 text-right pr-4 border-r-2 border-primary/20">
                {president.qualifications.map((qual) => (
                  <li
                    key={qual.id}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm"
                  >
                    <span className="material-symbols-outlined text-primary text-base">
                      star
                    </span>
                    {qual.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Vice President */}
      {vicePresident && (
        <div className="flex justify-center mb-20">
          <div className="w-full max-w-xl bg-white dark:bg-[#262626] rounded-2xl shadow-sm dark:shadow-none dark:border dark:border-gray-700 overflow-hidden transform hover:-translate-y-1 transition duration-300">
            <div className="flex flex-col items-center p-8 relative">
              <div className="absolute top-0 w-full h-24 bg-gradient-to from-gray-100 dark:from-gray-800 to-transparent"></div>
              <div className="relative z-10 w-56 h-56 mb-5 rounded-full border-4 border-gray-300 dark:border-gray-600 p-1 shadow-md bg-white dark:bg-gray-800">
                {vicePresident.image && (
                  <Image
                    src={getStrapiMedia(vicePresident.image.url) || ""}
                    alt={vicePresident.name_en}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover rounded-full"
                  />
                )}
              </div>
              <h3 className="text-2xl font-bold text-[#0e7490] dark:text-sky-400 mb-1 text-center">
                {vicePresident.name_ur}
              </h3>
              <p className="text-base font-semibold text-gray-500 dark:text-gray-400 mb-2 border-b border-primary/30 pb-1">
                {vicePresident.name_en}
              </p>
              <div className="text-center space-y-1 mb-6">
                <p className="text-xl text-primary">
                  {vicePresident.designation_ur}
                </p>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  {vicePresident.designation_en}
                </p>
              </div>
              <ul className="w-full max-w-sm mx-auto space-y-2 text-right pr-4 border-r-2 border-gray-300 dark:border-gray-600">
                {vicePresident.qualifications.map((qual) => (
                  <li
                    key={qual.id}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm"
                  >
                    <span className="material-symbols-outlined text-[#0e7490] dark:text-sky-500 text-base">
                      verified
                    </span>
                    {qual.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Other Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {otherMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white dark:bg-[#262626] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center hover:shadow-lg transition duration-300 group"
          >
            <div className="w-40 h-40 mb-4 rounded-full overflow-hidden border-2 border-primary/50 group-hover:border-primary transition">
              {member.image && (
                <Image
                  src={getStrapiMedia(member.image.url) || ""}
                  alt={member.name_en}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <h3 className="text-xl font-bold text-[#0e7490] dark:text-sky-400 mb-1">
              {member.name_ur}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {member.name_en}
            </p>
            <div className="text-center mb-4">
              <p className="text-lg text-primary">{member.designation_ur}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
                {member.designation_en}
              </p>
            </div>
            <div className="w-full border-t border-gray-100 dark:border-gray-700 pt-4">
              <ul className="space-y-1">
                {member.qualifications.map((qual) => (
                  <li
                    key={qual.id}
                    className="flex items-center justify-start gap-2 text-gray-600 dark:text-gray-300 text-xs"
                  >
                    <span className="material-symbols-outlined text-primary text-sm">
                      check_circle
                    </span>
                    {qual.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
