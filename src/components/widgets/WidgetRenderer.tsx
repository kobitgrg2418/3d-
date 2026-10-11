"use client";

import { Widget } from "@/types/widget";
import GalleryWidget from "./GalleryWidget";
import HeroWidget from "./HeroWidget";
import TextWidget from "./TextWidget";
import CTAWidget from "./CTAWidget";
import DesignCardWidget from "./DesignCardWidget";

interface WidgetRendererProps {
  widget: Widget;
}

export default function WidgetRenderer({ widget }: WidgetRendererProps) {
  const { type, content, styles } = widget;

  switch (type) {
    case 'gallery':
      return <GalleryWidget content={content} styles={styles} />;
    case 'hero':
      return <HeroWidget content={content} styles={styles} />;
    case 'text':
      return <TextWidget content={content} styles={styles} />;
    case 'cta':
      return <CTAWidget content={content} styles={styles} />;
    case 'design-card':
      return <DesignCardWidget content={content} styles={styles} />;
    case 'image':
      return (
        <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">Image Widget</p>
        </div>
      );
    case 'video':
      return (
        <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">Video Widget</p>
        </div>
      );
    case 'custom':
      return (
        <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">Custom Widget</p>
        </div>
      );
    default:
      return (
        <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">Unknown Widget Type: {type}</p>
        </div>
      );
  }
}
