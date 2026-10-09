"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const FlippingText = ({
  texts,
  interval = 3000,
  className,
}: {
  texts: string[];
  interval?: number;
  className?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const widest = texts.reduce((a, b) => (a.length >= b.length ? a : b));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return (
    <span className={`relative inline-block ${className}`}>
      <span aria-hidden className="invisible whitespace-nowrap">
        {widest}
      </span>
      <AnimatePresence initial={false}>
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-0 whitespace-nowrap"
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default FlippingText;
