"use client";
import { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);

  const isInStandaloneMode = () =>
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true;

  useEffect(() => {
    if (isInStandaloneMode()) return; // Don't show if already installed

    const dismissed = localStorage.getItem("install-dismissed");
    if (dismissed === "true") return;

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to install prompt: ${outcome}`);
      if (outcome === "accepted") {
        localStorage.setItem("mobile", "true");
      } else {
        localStorage.setItem("install-dismissed", "true");
      }
      setDeferredPrompt(null);
      setShowInstall(false);
    }
  };

  if (!showInstall) return null;

  return (
    <button
      onClick={handleInstall}
      className="fixed bottom-4 right-4 p-3 rounded-lg bg-black text-white shadow-xl"
    >
      Add to Home Screen
    </button>
  );
}
