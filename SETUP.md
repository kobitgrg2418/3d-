# Widget CMS Setup Instructions

## Overview

This is a complete widget-based CMS system that allows you to:
- Create reusable widgets (Hero, Gallery, Text, CTA, etc.)
- Manage widgets from a backend API
- Edit content with CKEditor
- Drag-and-drop to reorder widgets
- Assign widgets to different pages (home, room, about, contact)
- Reuse widgets across multiple pages

## Backend Setup

1. Navigate to the backend directory:
```bash
cd ../backend
```

2. Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/widget-cms
```

3. Install dependencies (already done):
```bash
npm install
```

4. Ensure MongoDB is running on your system (localhost:27017)

5. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

## Frontend Setup

1. Create a `.env.local` file in the frontend directory:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

2. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

### Access the CMS Admin Panel
Navigate to `http://localhost:3000/admin` to manage widgets.

### Create Widgets
1. Select a page from the dropdown (Home, Room, Design Idea, About, Contact)
2. Click "Add Widget" button
3. Fill in widget details:
   - Widget Name
   - Widget Type (hero, gallery, text, cta, image, video, custom)
   - Page assignment
   - Content fields (title, description, images, etc.)
4. Click "Save Widget"

### Edit Widgets
1. Click the "Edit" button on any widget
2. Modify the content as needed
3. Click "Save Widget"

### Reorder Widgets
Drag and drop widgets in the admin panel to change their order. The new order is automatically saved to the database.

### Delete Widgets
Click the "Delete" button on any widget to remove it.

### View Widgets on Pages
- Navigate to `/room` to see widgets assigned to the 'room' page
- Navigate to `/design-idea` to see widgets assigned to the 'design-idea' page
- Navigate to `/admin` to manage all widgets
- Widgets are dynamically loaded based on the page parameter

## Widget Types

- **Hero**: Full-screen hero section with title, subtitle, description, and CTA button
- **Gallery**: Image gallery with responsive grid layout (comma-separated image URLs)
- **Text**: Rich text content with CKEditor integration
- **CTA**: Call-to-action section with background color and button
- **Design Card**: Grid of design cards with images, titles, and descriptions (JSON format)
- **Image**: Single image widget (placeholder)
- **Video**: Video widget (placeholder)
- **Custom**: Custom widget placeholder for future extensions

## API Endpoints

- `GET /api/widgets?page={page}` - Get all widgets for a page
- `GET /api/widgets/:id` - Get a single widget
- `POST /api/widgets` - Create a new widget
- `PUT /api/widgets/:id` - Update a widget
- `DELETE /api/widgets/:id` - Delete a widget
- `PUT /api/widgets/reorder` - Reorder widgets
- `POST /api/upload` - Upload files (images)

## Database Schema

Widgets are stored in MongoDB with the following structure:
- `type`: Widget type (hero, gallery, text, cta, design-card, image, video, custom)
- `name`: Widget name for identification
- `content`: Widget content (flexible schema with title, description, images, cards, etc.)
- `layout`: Layout configuration (flexible)
- `styles`: Custom styles (flexible)
- `order`: Display order (integer)
- `page`: Page assignment (string: 'home', 'room', 'design-idea', etc.)
- `isActive`: Active status (boolean)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## File Structure

### Backend
```
backend/
├── server.js          # Express server with API endpoints
├── package.json       # Dependencies
├── .env              # Environment variables
└── uploads/          # Uploaded files directory
```

### Frontend
```
frontend/
├── src/
│   ├── app/
│   │   ├── admin/page.tsx        # CMS admin interface
│   │   ├── room/page.tsx         # Room page with widgets
│   │   └── design-idea/page.tsx  # Design Idea page with widgets
│   ├── components/
│   │   ├── widgets/
│   │   │   ├── GalleryWidget.tsx
│   │   │   ├── HeroWidget.tsx
│   │   │   ├── TextWidget.tsx
│   │   │   ├── CTAWidget.tsx
│   │   │   ├── DesignCardWidget.tsx
│   │   │   └── WidgetRenderer.tsx
│   │   └── ImageUpload.tsx
│   ├── lib/
│   │   └── api.ts               # API utility functions
│   └── types/
│       └── widget.ts            # TypeScript types
└── SETUP.md
```

## Extending the System

### Adding New Widget Types

1. Create a new widget component in `src/components/widgets/`
2. Add the widget type to the TypeScript enum in `src/types/widget.ts`
3. Add the widget type to the select dropdown in `src/app/admin/page.tsx`
4. Add a case in `WidgetRenderer.tsx` to render the new widget type

### Adding Custom Styles

Each widget supports a `styles` object that can be used to override default styling. Edit the widget component to merge custom styles with defaults.

## Troubleshooting

- **Backend not connecting**: Ensure MongoDB is running and the MONGODB_URI is correct
- **Frontend not loading widgets**: Check that NEXT_PUBLIC_API_URL is set correctly and backend is running
- **CKEditor not working**: Ensure the package is installed and imported correctly
- **Drag and drop not working**: Check that @dnd-kit packages are installed
