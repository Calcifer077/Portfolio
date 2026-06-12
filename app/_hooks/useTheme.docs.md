## `useTheme`

A custom hook that manages dark mode state, persists preference to `localStorage`, and syncs it with the DOM.

### Initial State

```ts
const [darkMode, setDarkMode] = useState(() => {
  if (typeof window === "undefined") {
    return false;
  }
  return localStorage.getItem("darkMode") === "true";
});
```

Instead of a plain value, `useState` receives a **lazy initializer** — a function that runs once on mount to compute the initial value. This is done instead of `useState(localStorage.getItem(...))` because that would run on every render, which is wasteful.

#### `typeof window === "undefined"`

In Next.js, components can run on the server (SSR) before they reach the browser. `localStorage` is a browser-only API — it doesn't exist on the server. Calling it server-side would throw a `ReferenceError`. This check returns `false` as a safe fallback when there's no window.

#### `=== "true"`

`localStorage` only stores strings. So when we previously saved `true` (a boolean), it became `"true"` (a string). Comparing with `=== "true"` converts it back to a boolean correctly. Without this, it would always return the string `"true"` which is always truthy.

### Side Effect

```ts
useEffect(() => {
  document.documentElement.classList.toggle("dark", darkMode);
  localStorage.setItem("darkMode", String(darkMode));
}, [darkMode]);
```

Runs whenever `darkMode` changes. It does two things:

**1. Toggles the `dark` class on `<html>`**

`document.documentElement` refers to the root `<html>` element. Tailwind's dark mode (when set to `class` strategy in config) works by checking if `dark` class is present on `<html>`. `classList.toggle("dark", darkMode)` adds the class when `darkMode` is `true`, removes it when `false` — the second argument acts as a force flag.

**2. Persists to `localStorage`**

Saves the current preference so it survives page refresh. `String(darkMode)` converts the boolean to `"true"` or `"false"` since localStorage only accepts strings.

### Return Value

```ts
return {
  darkMode, // current boolean state — use to render sun/moon icon etc.
  toggle: () => setDarkMode((d) => !d), // call this on button click
};
```

`toggle` uses a **functional update** `(d) => !d` instead of `setDarkMode(!darkMode)`. This ensures it always flips the _latest_ state value, not a stale closure capture — safer in cases where multiple updates could queue up.

### `"use client"`

This directive is required because the hook uses `useState`, `useEffect`, and browser APIs (`localStorage`, `document`). None of these are available in React Server Components.

---

Above approach has a limitation. This hook has a known **flash of unstyled content (FOUC)** issue — on first load, the page might briefly render in light mode before JS runs and applies the saved preference. The common fix is a blocking `<script>` in `<head>` that applies the class before React hydrates. Worth documenting as a known limitation if you ever revisit it.

We can resolve it by updating `layout.tsx`:

```tsx
// app/layout.tsx

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
      <body>{children}</body>
    </html>
  );
}
```

**Why this works:**

- This `<script>` is **blocking** — the browser runs it before painting anything. So by the time the user sees a single pixel, the `dark` class is already on `<html>`.
- Your `useTheme` hook still does its job managing state — this script is just an early patch for that first paint.

**Why the IIFE `(function() { ... })()`:**
Wraps the code in an immediately invoked function to avoid polluting the global scope with the `saved` variable.

**Why `try/catch`:**
`localStorage` can throw in some browsers when cookies/storage are blocked (e.g. private mode in some browsers, or strict privacy settings). The empty catch silently ignores that and just defaults to light mode.

**Why `suppressHydrationWarning` on `<html>`:**
React compares the server-rendered HTML with what it hydrates on the client. Since the server doesn't know the user's theme preference, there will be a mismatch on the `class` attribute of `<html>`. This prop tells React to ignore that one mismatch and not throw a warning.
