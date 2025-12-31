"use client";

import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

interface ToastTriggerProps {
  message: string;
  id: string;
  fallbackLocale?: string;
}

export default function ToastTrigger({ message, id, fallbackLocale }: ToastTriggerProps) {
  const notified = useRef(false);

  useEffect(() => {
    if (!notified.current) {
      toast.error(message, {
        toastId: id, // Prevent duplicate toasts for the same slug
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      if (fallbackLocale) {
        document.cookie = `locale=${fallbackLocale}; path=/; max-age=31536000`;
      }

      notified.current = true;
    }
  }, [message, id, fallbackLocale]);

  return null;
}
