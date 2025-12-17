import { HeroVideoSection } from "@/lib/types";
import { getStrapiMedia } from "@/lib/api";
import HeroVideoPlayer from "@/components/ui/HeroVideoPlayer";

export default function HeroVideo({ data }: { data: HeroVideoSection }) {
  const videoUrl = getStrapiMedia(data.video.Video.url);
  const thumbnailUrl = data.video.thumbnail?.url;

  return (
    <section className="relative w-full aspect-video md:aspect-auto md:h-[500px] overflow-hidden bg-gray-900">
      {videoUrl ? (
        <HeroVideoPlayer videoUrl={videoUrl} title={data.video.title} thumbnailUrl={thumbnailUrl} />
      ) : (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-white">
          Video not available
        </div>
      )}
    </section>
  );
}
