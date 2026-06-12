"use client";

import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { MdOutlineFileDownload } from "react-icons/md";

const PDFViewer = dynamic(() => import("@/app/resume/PDFViewer"), {
  ssr: false,
  loading: () => <p>Loading PDF viewer...</p>,
});

export default function Home() {
  return (
    <main className="w-full px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h2 className="text-center md:text-left font-display font-bold text-4xl md:text-6xl text-text-primary tracking-tighter">
          Resume
        </h2>

        <a href="/Resume.pdf" download="Resume.pdf">
          <Button
            variant="default"
            className="w-full md:w-auto flex items-center justify-center gap-2 py-3 bg-brand-primary text-brand-on-primary font-mono text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <MdOutlineFileDownload />
            Download PDF
          </Button>
        </a>
      </div>

      <div className="w-full flex justify-center border mb-8">
        <PDFViewer pdfUrl="/Resume.pdf" />
      </div>
    </main>
  );
}
