"use client";

import { ContentSection } from "@/lib/types";
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";
import Link from "next/link";
import { type ReactNode } from "react";

const isExternalUrl = (url?: string | null) => !!url && /^https?:\/\//i.test(url);

export default function Content({ data }: { data: ContentSection }) {
  if (!data.Content) return null;

  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <div className="prose prose-lg dark:prose-invert max-w-none 
        text-gray-800 dark:text-gray-200 leading-relaxed font-display text-justify
        prose-headings:font-display prose-headings:font-bold
        prose-p:leading-relaxed
        prose-strong:text-primary
        prose-img:rounded-2xl
        prose-ul:list-none prose-ol:list-none">
        <BlocksRenderer 
          content={data.Content as BlocksContent} 
          blocks={{
            paragraph: ({ children }: { children?: ReactNode }) => (
              <p className="mb-6 leading-relaxed">{children}</p>
            ),
            heading: ({ children, level }: { children?: ReactNode; level: number }) => {
              switch (level) {
                case 1: return (
                  <div className="relative mb-8 group">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white pr-4">{children}</h1>
                    <div className="h-1.5 w-24 bg-primary mt-3 rounded-full transition-all group-hover:w-36"></div>
                  </div>
                );
                case 2: return (
                  <div className="flex items-center gap-4 mb-6 mt-12 group">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white whitespace-nowrap border-r-4 border-primary pr-4">{children}</h2>
                    <div className="h-px grow bg-linear-to-l from-primary/40 to-transparent"></div>
                  </div>
                );
                case 3: return (
                  <h3 className="text-2xl font-bold text-primary mb-4 mt-8 flex items-center gap-3">
                    <span className="w-2 h-8 bg-primary/20 rounded-full border-r-4 border-primary"></span>
                    {children}
                  </h3>
                );
                default: return <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 mt-6">{children}</h4>;
              }
            },
            list: ({ children, format }: { children?: ReactNode; format?: 'ordered' | 'unordered' }) => 
              format === 'ordered' ? (
                <ol className="mb-8 pr-4 space-y-4 [counter-reset:section]">{children}</ol>
              ) : (
                <ul className="mb-8 pr-2 space-y-4">{children}</ul>
              ),
            'list-item': ({ children }: { children?: ReactNode }) => (
              <li className="flex gap-4 items-start group">
                <div className="shrink-0 mt-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                </div>
                <div className="leading-relaxed pt-1">{children}</div>
              </li>
            ),
            link: ({ children, url }: { children?: ReactNode; url: string }) => {
              if (!url) return <>{children}</>;
              return (
                <Link 
                  href={url} 
                  className="inline-flex items-center gap-1 text-primary font-bold border-b-2 border-primary/20 hover:border-primary transition-all"
                  {...(isExternalUrl(url) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {children}
                  <span className="material-symbols-outlined text-[14px]">north_east</span>
                </Link>
              );
            },
            quote: ({ children }: { children?: ReactNode }) => (
              <div className="relative my-10 pr-10 pl-6 py-8 bg-primary/5 rounded-2xl border-r-4 border-primary overflow-hidden">
                <span className="absolute top-2 right-2 text-6xl text-primary/20 font-serif">&quot;</span>
                <div className="relative z-10 italic text-xl text-gray-800 dark:text-gray-200 leading-relaxed">
                  {children}
                </div>
              </div>
            ),
            code: ({ plainText }: { plainText?: string }) => (
              <pre className="bg-gray-900 text-gray-100 p-6 rounded-2xl overflow-x-auto my-8 shadow-inner font-mono text-sm border border-white/10 dir-ltr text-left">
                <code>{plainText}</code>
              </pre>
            ),
          }}
          modifiers={{
            bold: ({ children }: { children?: ReactNode }) => (
              <strong className="font-bold text-primary bg-primary/5 px-1 rounded-sm">{children}</strong>
            ),
            italic: ({ children }: { children?: ReactNode }) => (
              <em className="italic text-gray-700 dark:text-gray-300 border-b border-primary/30">{children}</em>
            ),
          }}
        />
      </div>
    </section>
  );
}
