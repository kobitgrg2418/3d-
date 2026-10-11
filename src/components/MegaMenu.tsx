"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface MegaMenuColumn {
  heading: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

interface MegaMenuPanel {
  description_heading: string;
  description_text: string;
  card_label: string;
  card_title: string;
  card_subtitle: string;
  card_href: string;
  card_image: string;
}

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  label: string;
  columns?: MegaMenuColumn[];
  panel?: MegaMenuPanel;
}

export default function MegaMenu({ isOpen, onClose, label, columns = [], panel }: MegaMenuProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  if (!columns || columns.length === 0) return null;

  return (
    <div
      className={`absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-200 transition-all duration-300 z-50 ${
        visible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columns */}
          {columns.map((column, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
                {column.heading}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 hover:underline transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Panel with Image Card */}
          {panel && (
            <div className="md:col-span-1 bg-gray-50 p-6 rounded-sm border-2 border-gray-200">
              {panel.description_heading && (
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-3">
                  {panel.description_heading}
                </h3>
              )}
              {panel.description_text && (
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {panel.description_text}
                </p>
              )}

              {/* Boxy Image Card Design */}
              {panel.card_image && (
                <div className="relative bg-white border-4 border-gray-400 rounded-none overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden border-b-4 border-gray-400">
                    <img
                      src={panel.card_image}
                      alt={panel.card_title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />

                    {/* Overlay Content */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      {/* Badge */}
                      {panel.card_label && (
                        <div className="inline-block bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-none mb-3 uppercase tracking-wider border-2 border-orange-600">
                          {panel.card_label}
                        </div>
                      )}

                      {/* Title */}
                      {panel.card_title && (
                        <h4 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide leading-tight">
                          {panel.card_title}
                        </h4>
                      )}

                      {/* Subtitle */}
                      {panel.card_subtitle && (
                        <p className="text-sm text-white/90 mb-4 leading-relaxed">
                          {panel.card_subtitle}
                        </p>
                      )}

                      {/* Link */}
                      {panel.card_href && (
                        <a
                          href={panel.card_href}
                          className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-orange-400 transition-colors uppercase tracking-wider"
                        >
                          <span>View details</span>
                          <ChevronDown size={16} className="rotate-[-90deg]" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
