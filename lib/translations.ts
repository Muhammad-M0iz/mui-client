export const translations = {
  en: {
    announcements: "Announcements",
    publications: "Publications & Resources",
    facebook_visit: "Visit our Facebook page",
    read_more: "Read More",
    featured: "Featured",
    read_full_story: "Read Full Story",
    official_page: "Official Page",
    follow_facebook: "Follow us on Facebook",
    like_page: "Like Page",
    no_image: "No image available",
    page_not_available: "The requested page is not available in this language.",
  },
  ur: {
    announcements: "اعلانات",
    publications: "مطبوعات اور وسائل",
    facebook_visit: "ہمارا فیس بک پیج وزٹ کریں",
    read_more: "مزید پڑھیں",
    featured: "نمایاں",
    read_full_story: "پوری کہانی پڑھیں",
    official_page: "آفیشل پیج",
    follow_facebook: "ہمیں فیس بک پر فالو کریں",
    like_page: "پیج لائک کریں",
    no_image: "کوئی تصویر دستیاب نہیں",
    page_not_available: "مطلوبہ صفحہ اس زبان میں دستیاب نہیں ہے۔",
  },
};

export type Locale = "en" | "ur";

export function getTranslation(locale: string, key: keyof typeof translations.en) {
  const lang = (locale === "ur" ? "ur" : "en") as Locale;
  return translations[lang][key] || translations["en"][key];
}
