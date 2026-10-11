"use client";

import { WidgetContent } from "@/types/widget";

interface CTAWidgetProps {
  content: WidgetContent;
  styles?: Record<string, any>;
}

export default function CTAWidget({ content, styles = {} }: CTAWidgetProps) {
  const title = content.title || "";
  const description = content.description || "";
  const buttonText = content.buttonText || "";
  const buttonLink = content.buttonLink || "#";

  const defaultStyles = {
    container: "py-20 px-6 bg-gray-900 text-white",
    inner: "max-w-4xl mx-auto text-center",
    title: "text-4xl font-bold mb-4",
    description: "text-xl text-gray-300 mb-8",
    button: "px-8 py-3 bg-white text-black rounded-full hover:bg-white/90 transition-colors inline-block",
  };

  const mergedStyles = { ...defaultStyles, ...styles };

  return (
    <div className={mergedStyles.container}>
      <div className={mergedStyles.inner}>
        {title && (
          <h2 className={mergedStyles.title}>{title}</h2>
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
