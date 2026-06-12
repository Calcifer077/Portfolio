// components/layout/Footer.tsx
import Link from "next/link";

const links = [
  { href: "https://github.com/Calcifer077/", label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/mahesh-nashier-b05691249/",
    label: "LinkedIn",
  },
  { href: "https://x.com/nash54644", label: "Twitter" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-border-subtle bg-bg-deep py-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 max-w-container mx-auto">
        <span className="font-display font-bold text-text-primary tracking-tighter md:flex-1">
          mahesh.dev
        </span>

        <div className="flex gap-6 md:flex-1 md:justify-center">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-text-muted hover:text-primary transition-colors uppercase tracking-wider"
            >
              {link.label}
            </a>
          ))}
        </div>

        <p className="font-mono text-xs text-text-muted md:flex-1 md:text-right">
          © {new Date().getFullYear()} Mahesh. Built with precision.
        </p>
      </div>
    </footer>
  );
}
