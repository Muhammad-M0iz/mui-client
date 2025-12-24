export interface StrapiImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: {
    large?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    thumbnail?: StrapiImageFormat;
  } | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiVideo {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: any | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface HeroVideoSection {
  __component: "home.hero-video";
  id: number;
  video: {
    id: number;
    documentId: string;
    title: string;
    Video: StrapiVideo;
    /** Optional thumbnail image for the video (may be provided by Strapi) */
    thumbnail?: StrapiImage;
  };
}

export interface ImportantLink {
  id: number;
  title: string;
  link: string;
}

export interface ImportantLinksWidgetSection {
  __component: "home.important-links-widget";
  id: number;
  Links: ImportantLink[];
}

export interface AnnouncementItem {
  id: number;
  documentId: string;
  title: string;
  link: string;
  image: StrapiImage[];
}

export interface AnnouncementsSection {
  __component: "home.announcements";
  id: number;
  announcements: AnnouncementItem[];
}

export interface BookletSection {
  __component: "home.booklet";
  id: number;
  title: string;
  link: string;
  image: StrapiImage;
}

export interface VideoGridItem {
  id: number;
  documentId: string;
  title: string;
  Video: StrapiVideo;
}

export interface VideoGridSection {
  __component: "home.video-grid";
  id: number;
  title: string;
  videos: VideoGridItem[];
}

export interface PosterSection {
  __component: "home.poster";
  id: number;
  image: {
    id: number;
    documentId: string;
    title: string;
    images: StrapiImage;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface ActivityLink {
  id: number;
  title: string | null;
  link: string;
}

export interface ActivityItem {
  id: number;
  documentId: string;
  title: string;
  Image: StrapiImage;
  link: ActivityLink;
}

export interface ActivitiesSection {
  __component: "home.activities";
  id: number;
  title: string;
  activities: ActivityItem[];
}

export type HomePageSection =
  | HeroVideoSection
  | ImportantLinksWidgetSection
  | AnnouncementsSection
  | BookletSection
  | VideoGridSection
  | PosterSection
  | ActivitiesSection;

export interface HomePageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  sections: HomePageSection[];
}

export interface StrapiResponse<T> {
  data: T;
  meta: any;
}

export interface DepartmentService {
  id: number;
  service: string;
}

export interface Department {
  id: number;
  documentId: string;
  name: string;
  department_details: any[];
  intro: string;
  department_services: DepartmentService[];
  image: StrapiImage;
}

export interface DepartmentSection {
  __component: "page.department";
  id: number;
  department: Department;
}

export interface FAQ {
  id: number;
  question: string;
  answer: any[];
}

export interface FAQsSection {
  __component: "page.fa-qs";
  id: number;
  FAQs: FAQ[];
}

export interface Qualification {
  id: number;
  title: string;
}

export interface BoardMember {
  id: number;
  documentId: string;
  name_ur: string;
  name_en: string;
  designation_ur: string;
  designation_en: string;
  image: StrapiImage;
  qualifications: Qualification[];
}

export interface MembersSection {
  __component: "page.members";
  id: number;
  board_members: BoardMember[];
}

export interface ContentSection {
  __component: "page.content";
  id: number;
  Content: any[];
}

export interface ListItem {
  id: number;
  title: string;
}

export interface ListSection {
  __component: "page.list";
  id: number;
  Heading: string;
  List: ListItem[];
}

export type PageSection = DepartmentSection | FAQsSection | MembersSection | DownloadsSection | ContentSection | ListSection;

export interface PageData {
  id: number;
  documentId: string;
  title: string;
  link: string;
  section: PageSection[];
}

export interface NavigationItem {
  id: number;
  title: string;
  path: string;
  items: NavigationItem[];
  downloadUrl?: string;
}

export interface FooterLink {
  id: number;
  title: string;
  link: string;
}

export interface FooterNumber {
  id: number;
  title: string;
  phone_number: string;
}

export interface FooterInfo {
  id: number;
  email: string;
  number: number;
  address: string;
}

export interface FooterData {
  id: number;
  documentId: string;
  copyright_text: string;
  links: FooterLink[];
  numbers: FooterNumber[];
  info: FooterInfo;
}

export interface DownloadFile {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: any | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface DownloadItem {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  download: DownloadFile;
}

export interface DownloadsSection {
  __component: "page.downloads";
  id: number;
  downloads: DownloadItem[];
}
