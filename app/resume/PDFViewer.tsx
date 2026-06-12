"use client";

import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  pdfUrl: string;
}

export default function PDFViewer({ pdfUrl }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageWidth, setPageWidth] = useState(800);

  useEffect(() => {
    const updateWidth = () => {
      const width = Math.min(window.innerWidth - 32, 900);
      setPageWidth(width);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="w-full flex justify-center">
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        className="flex justify-center"
      >
        <Page pageNumber={1} width={pageWidth} renderTextLayer={false} />
      </Document>
    </div>
  );
}
