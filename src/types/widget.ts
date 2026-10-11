export interface Widget {
  _id: string;
  type: 'hero' | 'gallery' | 'text' | 'cta' | 'image' | 'video' | 'custom' | 'design-card';
  name: string;
  content: Record<string, any>;
  layout: Record<string, any>;
  styles: Record<string, any>;
  order: number;
  page: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WidgetContent {
  title?: string;
  subtitle?: string;
  description?: string;
  images?: string[];
  buttonText?: string;
  buttonLink?: string;
  videoUrl?: string;
  richText?: string;
}
