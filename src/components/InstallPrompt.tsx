"use client";
import { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isin, setisin] = useState(false);

  const isInStandaloneMode = () =>
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true;
useEffect(() => {
  console.log("Checking install prompt readiness");

  if (isInStandaloneMode()) {
    console.log("App is in standalone mode");
    setisin(true);
    return;
  }

  const dismissed = localStorage.getItem("install-dismissed");
  if (dismissed === "true") {
    console.log("User previously dismissed install");
    return;
  }

  const handler = (e: any) => {
    console.log("✅ beforeinstallprompt event fired");
    e.preventDefault();
    setDeferredPrompt(e);
    setShowInstall(true);
  };

  window.addEventListener("beforeinstallprompt", handler);
  return () => window.removeEventListener("beforeinstallprompt", handler);
}, []);
const handleInstall = async () => {
  console.log("Install button clicked");
  if (!deferredPrompt) {
    console.log("❌ No deferredPrompt available");
    return;
  }

  deferredPrompt.prompt();

  const result = await deferredPrompt.userChoice;
  console.log("User choice result:", result);

  if (result.outcome === "accepted") {
    console.log("✅ User accepted the install prompt");
    localStorage.setItem("mobile", "true");
  } else {
    console.log("❌ User dismissed the install prompt");
    localStorage.setItem("install-dismissed", "true");
  }

  setDeferredPrompt(null);
  setShowInstall(false);
};

  // if (!showInstall) return null;

  return (

    <>
     { isin
    
  ?
<></>

:

    <button
      onClick={handleInstall}
      style={{zIndex:"99"}}
      className="fixed  bottom-4 right-4 p-3 rounded-lg bg-black text-white shadow-xl"
    >
      Add to Home Screen
    </button>

   }
    </>
  
  );
}