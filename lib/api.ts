import { HomePageData, PageData, StrapiResponse, NavigationItem, FooterData } from "./types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1338";

export async function getHomePageData(locale: string = "ur"): Promise<HomePageData | null> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/home-page?populate=deep&locale=${locale}`, {
      next: { revalidate: 60 }, // Incremental Static Regeneration (ISR) every 60 seconds
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch home page data: ${res.statusText}`);
    }

    const json: StrapiResponse<HomePageData> = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching home page data:", error);
    return null;
  }
}

export async function getPageData(slug: string, locale: string = "ur"): Promise<PageData | null> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/pages?filters[link][$eq]=${slug}&populate=deep&locale=${locale}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch page data: ${res.statusText}`);
    }

    const json: StrapiResponse<PageData[]> = await res.json();
    if (json.data && json.data.length > 0) {
      return json.data[0];
    }
    return null;
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
}

export async function getNavigation(locale: string = "ur"): Promise<NavigationItem[]> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/navigation/render/navigation?type=TREE&locale=${locale}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch navigation: ${res.statusText}`);
    }

    const json: NavigationItem[] = await res.json();
    return json;
  } catch (error) {
    console.error("Error fetching navigation:", error);
    return [];
  }
}

export async function getFooterData(locale: string = "ur"): Promise<FooterData | null> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/footer?populate=*&locale=${locale}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch footer data: ${res.statusText}`);
    }

    const json: StrapiResponse<FooterData> = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return null;
  }
}

export function getStrapiMedia(url: string | null) {
  if (url == null) {
    return null;
  }

  // Return the full URL if the media is hosted on an external provider
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }

  // Otherwise prepend the URL path with the Strapi URL
  return `${STRAPI_URL}${url}`;
}
