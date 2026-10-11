"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const links = ["FLEET", "EXPERIENCE", "SERVICES", "ABOUT", "CONTACT"];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black transition-opacity duration-500 ease-in-out ${
        visible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className={`h-full flex flex-col justify-center items-center transition-transform duration-500 ease-out ${
          visible ? "translate-y-0" : "translate-y-8"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-8 sm:top-12 right-6 sm:right-8 w-[40px] h-[40px] rounded-full border border-white/30 flex items-center justify-center hover:border-white transition-colors"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={18} className="text-white" />
        </button>

        {/* Links */}
        <div className="flex flex-col items-center">
          {links.map((link, index) => (
            <a
              key={link}
              href="#"
              className="px-8 sm:px-12 py-3 text-2xl sm:text-3xl font-light tracking-wide uppercase text-white/60 hover:text-white transition-colors"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: visible ? `${index * 60}ms` : "0ms",
                transition: "all 500ms cubic-bezier(0.4,0,0.2,1)",
              }}
              onClick={onClose}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-8 px-8 sm:px-12">
          <a
            href="#"
            className="text-xs tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors"
            onClick={onClose}
          >
            BOOK NOW
          </a>
          <a
            href="#"
            className="text-xs tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors"
            onClick={onClose}
          >
            CONTACT
          </a>
        </div>
      </div>
    </div>
  );
}
