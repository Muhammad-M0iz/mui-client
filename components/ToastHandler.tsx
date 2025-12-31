"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastHandler({ locale }: { locale: string }) {
  return <ToastContainer rtl={locale === "ur"} />;
}
