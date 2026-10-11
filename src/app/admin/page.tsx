"use client";

import { useState, useEffect } from "react";
import { Widget } from "@/lib/api";
import { getWidgets, createWidget, updateWidget, deleteWidget, reorderWidgets } from "@/lib/api";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableWidget({ widget, onEdit, onDelete }: { widget: Widget; onEdit: (w: Widget) => void; onDelete: (id: string) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: widget._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-lg shadow-md p-6 cursor-move hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-gray-400">:::</span>
            <h3 className="text-xl font-semibold">{widget.name}</h3>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
              {widget.type}
            </span>
          </div>
          <p className="text-gray-600 text-sm">
            Page: {widget.page} | Order: {widget.order}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(widget); }}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(widget._id); }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingWidget, setEditingWidget] = useState<Widget | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState('home');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    loadWidgets();
  }, [selectedPage]);

  const loadWidgets = async () => {
    try {
      const data = await getWidgets(selectedPage);
      setWidgets(data);
    } catch (error) {
      console.error('Failed to load widgets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingWidget({
      _id: '',
      type: 'text',
      name: 'New Widget',
      content: {},
      layout: {},
      styles: {},
      order: widgets.length,
      page: selectedPage,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setIsModalOpen(true);
  };

  const handleEdit = (widget: Widget) => {
    setEditingWidget(widget);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this widget?')) return;
    try {
      await deleteWidget(id);
      await loadWidgets();
    } catch (error) {
      console.error('Failed to delete widget:', error);
    }
  };

  const handleSave = async () => {
    if (!editingWidget) return;

    try {
      if (editingWidget._id) {
        await updateWidget(editingWidget._id, editingWidget);
      } else {
        await createWidget(editingWidget);
      }
      setIsModalOpen(false);
      setEditingWidget(null);
      await loadWidgets();
    } catch (error) {
      console.error('Failed to save widget:', error);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = widgets.findIndex((w) => w._id === active.id);
      const newIndex = widgets.findIndex((w) => w._id === over.id);

      const newWidgets = arrayMove(widgets, oldIndex, newIndex);
      setWidgets(newWidgets);

      try {
        await reorderWidgets(newWidgets);
      } catch (error) {
        console.error('Failed to reorder widgets:', error);
        await loadWidgets();
      }
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Widget CMS</h1>
          <div className="flex gap-4">
            <select
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="home">Home</option>
              <option value="room">Room</option>
              <option value="design-idea">Design Idea</option>
              <option value="about">About</option>
              <option value="contact">Contact</option>
            </select>
            <button
              onClick={handleCreate}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Widget
            </button>
          </div>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={widgets.map(w => w._id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {widgets.map((widget) => (
                <SortableWidget
                  key={widget._id}
                  widget={widget}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {widgets.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl">No widgets found. Create your first widget!</p>
          </div>
        )}
      </div>

      {isModalOpen && editingWidget && (
        <WidgetModal
          widget={editingWidget}
          onSave={handleSave}
          onClose={() => {
            setIsModalOpen(false);
            setEditingWidget(null);
          }}
        />
      )}
    </div>
  );
}

interface WidgetModalProps {
  widget: Widget;
  onSave: () => void;
  onClose: () => void;
}

function WidgetModal({ widget, onSave, onClose }: WidgetModalProps) {
  const [formData, setFormData] = useState<Widget>(widget);

  const handleChange = (field: keyof Widget, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContentChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      content: { ...prev.content, [field]: value }
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {widget._id ? 'Edit Widget' : 'Create Widget'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Widget Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Widget Type</label>
            <select
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="hero">Hero</option>
              <option value="gallery">Gallery</option>
              <option value="text">Text</option>
              <option value="cta">CTA</option>
              <option value="design-card">Design Card</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Page</label>
            <input
              type="text"
              value={formData.page}
              onChange={(e) => handleChange('page', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Content</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={formData.content.title || ''}
                  onChange={(e) => handleContentChange('title', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subtitle</label>
                <input
                  type="text"
                  value={formData.content.subtitle || ''}
                  onChange={(e) => handleContentChange('subtitle', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.content.description || ''}
                  onChange={(e) => handleContentChange('description', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                />
              </div>

              {formData.type === 'text' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Rich Text Content</label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={formData.content.richText || ''}
                    onChange={(event: any, editor: any) => {
                      handleContentChange('richText', editor.getData());
                    }}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Button Text</label>
                <input
                  type="text"
                  value={formData.content.buttonText || ''}
                  onChange={(e) => handleContentChange('buttonText', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Button Link</label>
                <input
                  type="text"
                  value={formData.content.buttonLink || ''}
                  onChange={(e) => handleContentChange('buttonLink', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {formData.type === 'gallery' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Images (comma-separated URLs)</label>
                  <textarea
                    value={(formData.content.images || []).join(', ')}
                    onChange={(e) => handleContentChange('images', e.target.value.split(',').map(s => s.trim()))}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                    placeholder="image1.jpg, image2.jpg, image3.jpg"
                  />
                </div>
              )}

              {formData.type === 'design-card' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Design Cards (JSON format)</label>
                  <textarea
                    value={JSON.stringify(formData.content.cards || [], null, 2)}
                    onChange={(e) => {
                      try {
                        handleContentChange('cards', JSON.parse(e.target.value));
                      } catch (err) {
                        // Invalid JSON, don't update
                      }
                    }}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-48 font-mono text-sm"
                    placeholder='[
  {
    "title": "Modern Living Room",
    "description": "Sleek and contemporary design",
    "image": "https://example.com/image1.jpg"
  }
]'
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Format: Array of objects with title, description, and image fields
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              onClick={onClose}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Widget
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
