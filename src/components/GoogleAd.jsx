// components/GoogleAd.jsx
'use client';

import { useEffect } from 'react';

export default function GoogleAd() {
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }, 500); // small delay so script loads

    return () => clearTimeout(timer);
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-1948682636540486"
      data-ad-slot="2569180712" // 👈 slot from AdSense dashboard
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

