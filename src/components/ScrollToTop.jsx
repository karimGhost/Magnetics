"use client";
import React,{ useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react'; // Optional, if using lucide icons

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        
        className="fixed bottom-4 ScrollToTop right-4 z-50 p-3 rounded-full  text-white shadow-lg  transition"
      >
        <ArrowUp className="w-5 h-5" /> {/* Optional icon */}
      </button>
    )
  );
};

export default ScrollToTop;
