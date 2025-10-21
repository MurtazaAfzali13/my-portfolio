"use client";

import { useEffect, useState } from "react";

export default function TypewriterText({ text = "Murtaza", speed = 150 }) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDeleting && index < text.length) {
        // حرف‌به‌حرف اضافه کن
        setDisplayText(text.slice(0, index + 1));
        setIndex(index + 1);
      } else if (isDeleting && index > 0) {
        // حرف‌به‌حرف حذف کن
        setDisplayText(text.slice(0, index - 1));
        setIndex(index - 1);
      } else if (index === text.length && !isDeleting) {
        // وقتی کامل شد، یه مکث و بعد حذف کن
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (index === 0 && isDeleting) {
        // وقتی پاک شد دوباره بنویس
        setIsDeleting(false);
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timer);
  }, [index, isDeleting, text, speed]);

  return (
    <span className="text-yellow-300 font-semibold typewriter">
      {displayText}
      <span className="border-r-2 border-yellow-300 animate-pulse ml-1"></span>
    </span>
  );
}
