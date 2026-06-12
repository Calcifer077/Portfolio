### 1. Imports

- `'use client'` → because we use react hooks like `useState` and `useEffect`.

- **Next.js Navigation**

```tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
```

`Link` → used for client-side navigations. Used for switching between pages.
`usePathname` -> returns current route. Used for styling of active route.

- **utility imports**

```tsx
import { cn } from "@/lib/utils";
```

Used for class merging.

- **Theme hook**

```tsx
import { useTheme } from "@/app/_hooks/useTheme";

const { darkMode, toggle } = useTheme();

darkMode; // state, boolean
toggle(); // swtich themes
```

### 2. Navigation configuration

```tsx
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];
```

Instead of creating each nav link again and again, we just created in a central place and mapped over it.

```tsx
{
  navLinks.map(({ label, href }) => {
    const isActive = pathname === href;
    return (
      <Link
        key={href}
        href={href}
        className={cn(
          "relative font-mono text-sm transition-colors duration-200 group",
          isActive ? "text-primary" : "text-text-muted hover:text-text-primary",
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
  });
}
```

### 3. Component state

```tsx
const [scrolled, setScrolled] = useState(false);
```

Tracks whether the user have scrolled enough, it is used to switch between mobile and desktop layout.

```tsx
const [mobileOpen, setMobileOpen] = useState(false);
```

It tracks mobile menu visibility.

### 4. Scroll detection effect

```tsx
useEffect(() => {
  const handleScroll = () => {
    // Disable scroll animation on mobile
    if (window.innerWidth < 768) {
      setScrolled(false);
      return;
    }

    setScrolled(window.scrollY > 100);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

Above effect runs once when component is mounted and it registers a even listener.

```tsx
window.addEventListener("scroll", handleScroll, { passive: true });
```

When the component unmounts, we run a clean up function:

```tsx
return () => window.removeEventListener("scroll", handleScroll);
```

What the effect does it checks if the user have scrolled enough `100px`, than it sets `setScrolled` state to `true`. This state is used to switch between styles of navbar. We have a guard clause which states that `setScrolled` will remain `false` when the width is less than `768`, meaning mobile layout.

### 5. Body scroll lock

```tsx
useEffect(() => {
  document.body.style.overflow = mobileOpen ? "hidden" : "";
  return () => {
    document.body.style.overflow = "";
  };
}, [mobileOpen]);
```

This effect make sure that when hamburger icon is open, background won't scroll.

### 6. Main navbar wrapper

Its basic styling just tells that it is `fixed` on the top `top-0 left-0 right-0 z-50`.

`pointer-events-none` means that the parent will ignore clicks, but the header receives clicks with `pointer-events-auto`.

There is also animation for scroll effect:

```tsx
scrolled
    ? [
	    "mt-3",
        "rounded-full",
        "bg-surface/90 backdrop-blur-xl shadow-lg shadow-black/10",
        "max-w-fit",
    ]
    : [
	    "mt-0",
        "rounded-none",
        "bg-surface/60 backdrop-blur-md",
        "w-full max-w-full",
    ],
```

The main navbar is only visible on desktop which is ensured by `hidden md:flex`. Inside this container we have rendered `nav links` described above. So if the parent is not visible (which is not visible in desktop mode) these will also be not visible.

The reverse is true for mobile menu, `md:hidden` they will not be visible after `md`.

Mobile menu slides in and out from and to left using `mobileOpen ? "translate-x-0" : "-translate-x-full"`.

There is a simple staggered animation for the mobile overlay:

```tsx
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
```

For each click on mobile nav links we close the menu overlay, `onClick={() => setMobileOpen(false)}`.

The theme toggle button is differentiated from both, doesn't come inside any of them and displayed on the far right.
