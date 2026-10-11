"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface StaggerProps {
  children: ReactNode;
  delay: number;
  opacity: number;
}

export function Stagger({ children, delay, opacity }: StaggerProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && opacity > 0.3 && !visible) {
      const timer = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(timer);
    } else if (opacity <= 0.3 && visible) {
      setVisible(false);
    }
  }, [opacity, delay, visible, mounted]);

  return (
    <div
      ref={ref}
      className="transition-all duration-[800ms]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
        transitionDelay: visible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
