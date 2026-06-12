# Resume Page Documentation

## Overview

This feature provides an in-browser PDF resume viewer along with a downloadable PDF file. It is built using **Next.js**, **React PDF**, and **dynamic imports** to ensure proper client-side rendering.

The implementation consists of two files:

1. **PDFViewer.tsx** – Responsible for rendering the PDF document.
2. **page.tsx (Resume Page)** – Displays the page heading, download button, and embeds the PDF viewer.

---

# PDFViewer Component

## Purpose

The `PDFViewer` component renders the first page of a PDF document and automatically adjusts its width based on the user's screen size.

## Dependencies

```tsx
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
```

Additional styles required by React PDF:

```tsx
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
```

---

## PDF Worker Configuration

```tsx
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
```

### Why?

React PDF relies on PDF.js, which requires a web worker to parse PDF files efficiently without blocking the UI.

---

## Props

### `PDFViewerProps`

```tsx
interface PDFViewerProps {
  pdfUrl: string;
}
```

| Property | Type   | Description                                |
| -------- | ------ | ------------------------------------------ |
| pdfUrl   | string | Path or URL of the PDF document to display |

---

## State Management

### Number of Pages

```tsx
const [numPages, setNumPages] = useState<number | null>(null);
```

Stores the total number of pages in the PDF.

### Page Width

```tsx
const [pageWidth, setPageWidth] = useState(800);
```

Controls the width of the rendered PDF page.

---

## Responsive Width Handling

```tsx
useEffect(() => {
  const updateWidth = () => {
    const width = Math.min(window.innerWidth - 32, 900);
    setPageWidth(width);
  };

  updateWidth();
  window.addEventListener("resize", updateWidth);

  return () => window.removeEventListener("resize", updateWidth);
}, []);
```

### Behavior

- Calculates the available screen width.
- Maintains a maximum width of **900px**.
- Adds a **32px margin** for smaller screens.
- Updates automatically when the browser window is resized.
- Cleans up event listeners on component unmount.

---

## PDF Load Success Handler

```tsx
function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
  setNumPages(numPages);
}
```

### Purpose

Captures metadata after the PDF loads successfully and stores the total page count.

---

## Rendering

```tsx
<Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
  <Page pageNumber={1} width={pageWidth} renderTextLayer={false} />
</Document>
```

### Features

- Loads a PDF from the provided URL.
- Renders the first page only.
- Adjusts page width dynamically.
- Disables the text layer for cleaner rendering and improved performance.

---

# Resume Page

## Purpose

The Resume page provides:

1. A page title.
2. A PDF download button.
3. An embedded PDF preview.

---

## Dynamic Import

```tsx
const PDFViewer = dynamic(() => import("@/app/resume/PDFViewer"), {
  ssr: false,
  loading: () => <p>Loading PDF viewer...</p>,
});
```

### Why Dynamic Import?

React PDF depends on browser APIs such as `window`, which are unavailable during server-side rendering.

Using:

```tsx
ssr: false;
```

ensures the component only loads on the client side.

### Loading State

Displays:

```tsx
Loading PDF viewer...
```

while the component is being loaded.

---

## Page Header

```tsx
<h2>Resume</h2>
```

### Purpose

Displays the page title with responsive typography using Tailwind CSS utility classes.

---

## Download Button

```tsx
<a href="/Resume.pdf" download="Resume.pdf">
```

### Features

- Downloads the resume directly.
- Uses the browser's native download behaviour.
- Saves the file as:

```text
Resume.pdf
```

---

### Button Styling

```tsx
<Button variant="default">
  <MdOutlineFileDownload />
  Download PDF
</Button>
```

Features:

- Download icon.
- Responsive width.
- Hover effects.
- Active click animation.
- Accessible button styling.

---

## PDF Viewer Container

```tsx
<div className="w-full flex justify-center border mb-8">
  <PDFViewer pdfUrl="/Resume.pdf" />
</div>
```

### Purpose

- Centers the PDF viewer.
- Adds a border around the preview.
- Provides spacing below the viewer.

---

# User Flow

1. User navigates to the Resume page.
2. The page title and download button are displayed.
3. The PDF viewer loads dynamically on the client.
4. The first page of the resume is rendered.
5. The viewer resizes automatically based on screen size.
6. Clicking **Download PDF** downloads the complete resume.

---

# Key Features

- Client-side PDF rendering using React PDF.
- Dynamic imports to avoid SSR issues.
- Responsive PDF preview.
- Direct PDF download functionality.
- Tailwind CSS-based responsive design.
- Automatic resize handling.
- Clean and simple user experience.

---

# File Structure

```text
app/
└── resume/
    ├── page.tsx
    ├── PDFViewer.tsx
    └── Resume.pdf
```

### Responsibilities

| File          | Responsibility                                  |
| ------------- | ----------------------------------------------- |
| PDFViewer.tsx | Handles PDF rendering and responsiveness        |
| page.tsx      | Provides page layout and download functionality |
| Resume.pdf    | Resume document displayed and downloaded        |

This separation keeps rendering logic isolated from page-level UI concerns, making the codebase easier to maintain and extend.
