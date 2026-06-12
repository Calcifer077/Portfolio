import type { Metadata } from "next";
import { Outfit, DM_Sans, Fira_Code } from "next/font/google";
import "./globals.css";

import Navbar from "@/app/_components/layout/Navbar";
import Footer from "@/app/_components/layout/Footer";
import { cn } from "@/lib/utils";

// ─── Font Pairing: Clean & Minimal ───────────────────────────────────────────
//
// Outfit     → headings. Geometric, confident, Raycast-adjacent.
// DM Sans    → body. Optically balanced, extremely readable. Very Notion.
// Fira Code  → mono labels. Quieter than JetBrains, ligature-friendly.

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit", // consumed by font-heading in globals.css
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans", // consumed by font-body in globals.css
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code", // consumed by font-label-mono in globals.css
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Full Stack Developer",
  },
  description:
    "Full-stack developer crafting high-performance web applications with precision and care.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "dark",
        outfit.variable,
        dmSans.variable,
        firaCode.variable,
      )}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('darkMode');
                  if (saved === 'true') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={cn(
          "bg-bg-deep text-text-primary",
          "overflow-x-hidden",
          "antialiased",
          "font-body",
        )}
      >
        <Navbar />
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 pt-32 mx-auto w-full max-w-250 px-6">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
