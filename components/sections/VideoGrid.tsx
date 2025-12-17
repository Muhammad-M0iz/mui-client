import { VideoGridSection } from "@/lib/types";
import { getStrapiMedia } from "@/lib/api";

export default function VideoGrid({ data }: { data: VideoGridSection }) {
  return (
    <section className="px-6 lg:px-40 py-16 bg-white dark:bg-[#1a2230]">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {data.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.videos.map((videoItem) => {
            const videoUrl = getStrapiMedia(videoItem.Video.url);
            return (
              <div
                key={videoItem.id}
                className="group bg-background-light dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-video overflow-hidden bg-black">
                  {videoUrl && (
                    <video
                      src={videoUrl}
                      controls
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                    {videoItem.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
