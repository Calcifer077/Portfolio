"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, X, Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTheme } from "@/app/_hooks/useTheme";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
  { label: "Resume", href: "/resume" },
];

export default function Navbar() {
  const { darkMode, toggle } = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll when mobile menu is open (pure DOM side-effect, no setState)
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop / Scrolled Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <header
          className={cn(
            "pointer-events-auto transition-all duration-500 ease-in-out border border-border-subtle",

            "mt-0",
            "rounded-none",
            "bg-surface/60 backdrop-blur-md",
            "w-full max-w-full",
          )}
          role="banner"
        >
          <div
            className={cn(
              "relative flex items-center justify-center transition-all duration-500 ease-in-out",
              "h-16 px-8",
            )}
          >
            {/* Desktop nav links — hidden on mobile */}
            <nav
              className="hidden md:flex items-center gap-8"
              aria-label="Main navigation"
            >
              {navLinks.map(({ label, href }) => {
                const isActive = pathname === href;

                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "relative font-mono text-sm transition-colors duration-200 group",
                      isActive
                        ? "text-primary"
                        : "text-text-muted hover:text-text-primary",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {label}
                    {/* Animated underline */}
                    <span
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-px bg-primary transition-all duration-300",
                        isActive ? "w-full" : "w-0 group-hover:w-full",
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Mobile hamburger — visible only on mobile */}
            <button
              className={cn(
                "absolute left-4 md:hidden flex items-center justify-center w-8 h-8 rounded-md",
                "text-text-muted hover:text-text-primary hover:bg-surface-raised",
                "transition-colors duration-200",
              )}
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </header>
      </div>

      {/* Theme Toggle — always visible, never inside hamburger */}
      <div className="fixed top-4 right-4 z-9999 pointer-events-auto">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          className={cn(
            "rounded-full w-9 h-9",
            "border border-border-subtle",
            "bg-surface/80 backdrop-blur-md",
            "hover:bg-surface-raised",
            "shadow-sm shadow-black/5",
            "transition-all duration-200",
          )}
        >
          {darkMode ? (
            <Sun className="h-4 w-4 text-text-muted hover:text-text-primary transition-colors" />
          ) : (
            <Moon className="h-4 w-4 text-text-muted hover:text-text-primary transition-colors" />
          )}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed inset-0 z-9998 md:hidden",
          "transition-all duration-300 ease-in-out",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-black/40 backdrop-blur-sm",
            "transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        {/* Slide-in panel */}
        <div
          className={cn(
            "absolute top-0 left-0 bottom-0 w-72 max-w-[85vw]",
            "bg-surface border-r border-border-subtle",
            "flex flex-col",
            "shadow-2xl shadow-black/20",
            "transition-transform duration-300 ease-in-out",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between px-6 h-16 border-b border-border-subtle shrink-0">
            <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
              Menu
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-md",
                "text-text-muted hover:text-text-primary hover:bg-surface-raised",
                "transition-colors duration-200",
              )}
              aria-label="Close navigation menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Nav links */}
          <nav
            className="flex flex-col px-4 pt-6 pb-8 gap-1"
            aria-label="Mobile navigation"
          >
            {navLinks.map(({ label, href }, index) => {
              const isActive = pathname === href;

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg",
                    "font-mono text-sm transition-all duration-200",
                    "group",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-text-muted hover:text-text-primary hover:bg-surface-raised",
                  )}
                  aria-current={isActive ? "page" : undefined}
                  style={{
                    transitionDelay: mobileOpen
                      ? `${index * 40 + 80}ms`
                      : "0ms",
                    transform: mobileOpen
                      ? "translateX(0)"
                      : "translateX(-8px)",
                    opacity: mobileOpen ? 1 : 0,
                    transition: `transform 300ms ease, opacity 300ms ease, color 200ms, background-color 200ms`,
                  }}
                >
                  {/* Active indicator dot */}
                  <span
                    className={cn(
                      "w-1 h-1 rounded-full shrink-0 transition-all duration-200",
                      isActive
                        ? "bg-primary"
                        : "bg-transparent group-hover:bg-text-muted/40",
                    )}
                  />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
