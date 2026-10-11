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
          ? "border-orange-500 bg-orange-50"
          : "border-gray-200 bg-white hover:border-orange-300"
      }`}
    >
      {IconComponent && (
        <div className="mb-4">
          <IconComponent
            size={32}
            className={`${
              isActive ? "text-orange-500" : "text-gray-600"
            }`}
          />
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
