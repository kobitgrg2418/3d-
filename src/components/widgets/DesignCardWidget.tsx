"use client";

import { WidgetContent } from "@/types/widget";
import Image from "next/image";

interface DesignCardWidgetProps {
  content: WidgetContent;
  styles?: Record<string, any>;
}

export default function DesignCardWidget({ content, styles = {} }: DesignCardWidgetProps) {
  const title = content.title || "";
  const description = content.description || "";
  const cards = content.cards || [];

  const defaultStyles = {
    container: "py-16 px-6",
    title: "text-3xl font-bold mb-8 text-center",
    grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
    card: "bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow",
    image: "relative aspect-video",
    cardContent: "p-6",
    cardTitle: "text-xl font-semibold mb-2",
    cardDescription: "text-gray-600 text-sm",
  };

  const mergedStyles = { ...defaultStyles, ...styles };

  return (
    <div className={mergedStyles.container}>
      {title && (
        <h2 className={mergedStyles.title}>{title}</h2>
      )}
      <div className={mergedStyles.grid}>
        {cards.map((card: any, index: number) => (
          <div key={index} className={mergedStyles.card}>
            {card.image && (
              <div className={mergedStyles.image}>
                <Image
                  src={card.image}
                  alt={card.title || `Design ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className={mergedStyles.cardContent}>
              {card.title && (
                <h3 className={mergedStyles.cardTitle}>{card.title}</h3>
              )}
              {card.description && (
                <p className={mergedStyles.cardDescription}>{card.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
