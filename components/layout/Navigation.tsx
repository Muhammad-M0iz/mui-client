"use client";

import { NavigationItem } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";

export default function Navigation({
  items,
  dir = "rtl",
}: {
  items: NavigationItem[];
  dir?: "rtl" | "ltr";
}) {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  return (
    <nav className="bg-primary text-white py-3 shadow-md" dir={dir}>
      <div className="container mx-auto px-4">
        <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          {items.map((item) => (
            <li
              key={item.id}
              className="relative group"
              onMouseEnter={() => setOpenDropdown(item.id)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.path}
                className="hover:text-gray-200 transition flex items-center gap-1"
              >
                {item.title}
                {item.items.length > 0 && <span>▾</span>}
              </Link>

              {item.items.length > 0 && openDropdown === item.id && (
                <ul
                  className={`absolute top-full ${
                    dir === "rtl" ? "right-0" : "left-0"
                  } bg-white text-gray-800 shadow-lg rounded-lg py-2 min-w-[200px] z-50 border border-gray-100`}
                >
                  {item.items.map((subItem) => (
                    <li key={subItem.id}>
                      <Link
                        href={subItem.downloadUrl || subItem.path}
                        target={subItem.downloadUrl ? "_blank" : "_self"}
                        className={`block px-4 py-2 hover:bg-gray-50 hover:text-primary transition ${
                          dir === "rtl" ? "text-right" : "text-left"
                        }`}
                      >
                        {subItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
