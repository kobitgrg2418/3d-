"use client";

import * as Icons from "lucide-react";

interface ServiceStepCardProps {
  title: string;
  description: string;
  icon?: string;
  isActive?: boolean;
}

export default function ServiceStepCard({ title, description, icon, isActive }: ServiceStepCardProps) {
  // Dynamically get the icon component from Lucide
  const IconComponent = icon ? (Icons as any)[icon] : null;

  return (
    <div
      className={`p-6 rounded-lg border-2 transition-all duration-300 ${
        isActive
          ? "border-orange bg-grey-100"
          : "border-grey-300 bg-white hover:border-orange"
      }`}
    >
      {IconComponent && (
        <div className="mb-4">
          <IconComponent
            size={32}
            className={`${
              isActive ? "text-orange" : "text-grey-600"
            }`}
          />
        </div>
      )}
      <h3 className="text-lg font-semibold text-black mb-2">{title}</h3>
      <p className="text-sm text-grey-600 leading-relaxed">{description}</p>
    </div>
  );
}
