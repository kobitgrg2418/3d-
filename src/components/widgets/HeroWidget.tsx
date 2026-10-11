"use client";

import { WidgetContent } from "@/types/widget";

interface HeroWidgetProps {
  content: WidgetContent;
  styles?: Record<string, any>;
}

export default function HeroWidget({ content, styles = {} }: HeroWidgetProps) {
  const title = content.title || "";
  const subtitle = content.subtitle || "";
  const description = content.description || "";
  const buttonText = content.buttonText || "";
  const buttonLink = content.buttonLink || "#";

  const defaultStyles = {
    container: "relative h-screen flex items-center justify-center px-6",
    title: "text-[clamp(2rem,5vw,5rem)] font-extralight uppercase leading-[1.1] text-white tracking-tight",
    subtitle: "text-xl text-white/80 mb-4",
    description: "text-white/60 text-lg mb-8",
    button: "px-8 py-3 bg-white text-black rounded-full hover:bg-white/90 transition-colors",
  };

  const mergedStyles = { ...defaultStyles, ...styles };

  return (
    <div className={mergedStyles.container}>
      <div className="text-center max-w-4xl">
        {subtitle && (
          <p className={mergedStyles.subtitle}>{subtitle}</p>
        )}
        {title && (
          <h1 className={mergedStyles.title}>{title}</h1>
        )}
        {description && (
          <p className={mergedStyles.description}>{description}</p>
        )}
        {buttonText && (
          <a
            href={buttonLink}
            className={mergedStyles.button}
          >
            {buttonText}
          </a>
        )}
      </div>
    </div>
  );
}
