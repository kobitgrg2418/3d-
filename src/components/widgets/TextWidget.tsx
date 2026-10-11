"use client";

import { WidgetContent } from "@/types/widget";

interface TextWidgetProps {
  content: WidgetContent;
  styles?: Record<string, any>;
}

export default function TextWidget({ content, styles = {} }: TextWidgetProps) {
  const title = content.title || "";
  const richText = content.richText || "";

  const defaultStyles = {
    container: "py-16 px-6 max-w-4xl mx-auto",
    title: "text-3xl font-bold mb-6",
    content: "prose prose-lg text-gray-700",
  };

  const mergedStyles = { ...defaultStyles, ...styles };

  return (
    <div className={mergedStyles.container}>
      {title && (
        <h2 className={mergedStyles.title}>{title}</h2>
      )}
      {richText && (
        <div
          className={mergedStyles.content}
          dangerouslySetInnerHTML={{ __html: richText }}
        />
      )}
    </div>
  );
}
