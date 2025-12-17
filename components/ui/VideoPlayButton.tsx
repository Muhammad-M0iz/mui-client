"use client";

import { useRef } from "react";

export default function VideoPlayButton() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const isPlaying = useRef(false);

  const handlePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying.current) {
      videoRef.current.pause();
      isPlaying.current = false;
    } else {
      videoRef.current.play();
      isPlaying.current = true;
    }

    updateButtonIcon();
  };

  const updateButtonIcon = () => {
    const icon = buttonRef.current?.querySelector("span");
    if (!icon) return;

    if (isPlaying.current) {
      icon.textContent = "pause";
    } else {
      icon.textContent = "play_arrow";
    }
  };

  const handleVideoEnd = () => {
    isPlaying.current = false;
    updateButtonIcon();
  };

  return {
    handlePlayPause,
    handleVideoEnd,
    buttonRef,
    videoRef,
  };
}
