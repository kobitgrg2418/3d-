const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Widget {
  _id: string;
  type: string;
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

export async function getWidgets(page?: string): Promise<Widget[]> {
  const url = page
    ? `${API_BASE_URL}/widgets?page=${encodeURIComponent(page)}`
    : `${API_BASE_URL}/widgets`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch widgets');
  }
  return response.json();
}

export async function getWidget(id: string): Promise<Widget> {
  const response = await fetch(`${API_BASE_URL}/widgets/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch widget');
  }
  return response.json();
}

export async function createWidget(widget: Partial<Widget>): Promise<Widget> {
  const response = await fetch(`${API_BASE_URL}/widgets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(widget),
  });
  if (!response.ok) {
    throw new Error('Failed to create widget');
  }
  return response.json();
}

export async function updateWidget(id: string, widget: Partial<Widget>): Promise<Widget> {
  const response = await fetch(`${API_BASE_URL}/widgets/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(widget),
  });
  if (!response.ok) {
    throw new Error('Failed to update widget');
  }
  return response.json();
}

export async function deleteWidget(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/widgets/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete widget');
  }
}

export async function reorderWidgets(widgets: Widget[]): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/widgets/reorder`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ widgets }),
  });
  if (!response.ok) {
    throw new Error('Failed to reorder widgets');
  }
}

export async function uploadFile(file: File): Promise<{ filename: string; url: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to upload file');
  }
  return response.json();
}
