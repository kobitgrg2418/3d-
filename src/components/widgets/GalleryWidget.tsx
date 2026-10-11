"use client";

import { WidgetContent } from "@/types/widget";
import Image from "next/image";

interface GalleryWidgetProps {
  content: WidgetContent;
  styles?: Record<string, any>;
}

export default function GalleryWidget({ content, styles = {} }: GalleryWidgetProps) {
  const images = content.images || [];
  const title = content.title || "";
  const description = content.description || "";

  const defaultStyles = {
    container: "py-16 px-6",
    title: "text-3xl font-bold mb-4",
    description: "text-gray-600 mb-8",
    grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
    image: "relative aspect-square rounded-lg overflow-hidden",
  };

  const mergedStyles = { ...defaultStyles, ...styles };

  return (
    <div className={mergedStyles.container}>
      {title && (
        <h2 className={mergedStyles.title}>{title}</h2>
      )}
      {description && (
        <p className={mergedStyles.description}>{description}</p>
      )}
      <div className={mergedStyles.grid}>
        {images.map((image, index) => (
          <div key={index} className={mergedStyles.image}>
            <Image
              src={image}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
