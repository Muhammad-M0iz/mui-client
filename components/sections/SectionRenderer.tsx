import { HomePageSection } from "@/lib/types";
import HeroVideo from "./HeroVideo";
import ImportantLinksWidget from "./ImportantLinksWidget";
import Announcements from "./Announcements";
import Booklet from "./Booklet";
import VideoGrid from "./VideoGrid";
import Poster from "./Poster";
import Activities from "./Activities";

export default function SectionRenderer({
  section,
}: {
  section: HomePageSection;
}) {
  switch (section.__component) {
    case "home.hero-video":
      return <HeroVideo data={section} />;
    case "home.important-links-widget":
      return <ImportantLinksWidget data={section} />;
    case "home.announcements":
      return <Announcements data={section} />;
    case "home.booklet":
      return <Booklet data={section} />;
    case "home.video-grid":
      return <VideoGrid data={section} />;
    case "home.poster":
      return <Poster data={section} />;
    case "home.activities":
      return <Activities data={section} />;
    default:
      return null;
  }
}
