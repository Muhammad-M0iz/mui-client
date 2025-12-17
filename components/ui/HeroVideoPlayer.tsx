"use client";

import { useState, useRef } from "react";
import ReactPlayer from "react-player";
import Image from "next/image";
import { getStrapiMedia } from "@/lib/api";

export default function HeroVideoPlayer({
  videoUrl,
  title,
  thumbnailUrl,
}: {
  videoUrl: string;
  title: string;
  thumbnailUrl?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const playerRef = useRef<ReactPlayer>(null);

  const handlePlayClick = () => {
    setIsPlaying(true);
    setShowOverlay(false);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setShowOverlay(true);
  };

  const thumbnailSrc = thumbnailUrl ? getStrapiMedia(thumbnailUrl) : null;

  return (
    <div className="relative w-full h-full bg-gray-900">
      {/* Thumbnail Background */}
      {showOverlay && thumbnailSrc && (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={thumbnailSrc}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Video Player */}
      {isPlaying && (
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          playing={isPlaying}
          muted={isMuted}
          controls={true}
          width="100%"
          height="100%"
          onEnded={handleVideoEnded}
          config={{
            file: {
              attributes: {
                style: {
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                },
              },
            },
          }}
        />
      )}

      {/* Overlay with Play Button */}
      {showOverlay && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group transition-opacity duration-300 hover:bg-black/40">
          <button
            onClick={handlePlayClick}
            className="size-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 hover:bg-white/30 hover:scale-110 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/60"
            aria-label="Play video"
          >
            <span className="material-symbols-outlined text-white text-4xl ml-1">
              play_arrow
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
