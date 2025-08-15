// components/GoogleAd.jsx
'use client';

import { useEffect } from 'react';

export default function GoogleAd() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <ins className="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-client="ca-pub-1948682636540486"
         data-ad-slot="2569180712"
         data-ad-format="auto"
         data-full-width-responsive="true" />
  );
}
