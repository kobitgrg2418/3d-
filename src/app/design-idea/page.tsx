"use client";

import { useEffect, useState } from "react";
import { Widget } from "@/lib/api";
import { getWidgets } from "@/lib/api";
import WidgetRenderer from "@/components/widgets/WidgetRenderer";

export default function DesignIdeaPage() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWidgets();
  }, []);

  const loadWidgets = async () => {
    try {
      const data = await getWidgets('design-idea');
      setWidgets(data);
    } catch (error) {
      console.error('Failed to load widgets:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {widgets.length === 0 ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Design Ideas</h1>
            <p className="text-gray-600">
              No widgets configured for this page. Add widgets via the CMS admin panel.
            </p>
          </div>
        </div>
      ) : (
        widgets.map((widget) => (
          <WidgetRenderer key={widget._id} widget={widget} />
        ))
      )}
    </div>
  );
}
