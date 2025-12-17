"use client";

import { DepartmentSection } from "@/lib/types";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { getStrapiMedia } from "@/lib/api";
import Image from "next/image";

export default function Department({ data }: { data: DepartmentSection }) {
  const { department } = data;
  const imageUrl = getStrapiMedia(department.image?.url);

  return (
    <div className="flex flex-col gap-20 py-12">
      {/* Intro Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 order-1 lg:order-1">
          <div className="relative group">
            <div className="absolute -inset-2 bg-primary/20 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative rounded-2xl shadow-2xl w-full h-[400px] overflow-hidden bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={department.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-gray-400 dark:text-gray-500 text-lg font-medium">
                  {department.name} Image
                </span>
              )}
            </div>
            <div className="absolute bottom-6 right-6 bg-white/90 dark:bg-black/80 backdrop-blur-sm p-4 rounded-xl shadow-lg max-w-xs hidden md:block">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">
                  school
                </span>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white text-sm">
                    {department.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    نظم و نسق اور معیاری تعلیم
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 order-2 lg:order-2 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold w-fit">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            تعارف
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            {department.name} کا تعارف
          </h1>
          <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300 text-justify leading-loose font-display">
             <BlocksRenderer content={department.department_details} />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white dark:bg-[#1a2230] rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="text-center mb-12">
          <span className="text-primary font-bold tracking-wider text-sm uppercase">
            خدمات اور ذمہ داریاں
          </span>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {department.name} کا دائرہ کار
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-sm leading-relaxed font-display">
            {department.intro}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {department.department_services.map((service) => (
            <div
              key={service.id}
              className="group p-6 rounded-2xl bg-gray-50 dark:bg-background-dark hover:bg-primary/5 dark:hover:bg-primary/10 transition duration-300 border border-transparent hover:border-primary/20"
            >
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-surface-dark shadow-sm flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">verified</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                {service.service}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
