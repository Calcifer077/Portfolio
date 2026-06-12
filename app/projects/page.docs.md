**`ProjectsPage`** is made up of four different components:

- `ImageCarousel`
- `AccordionItem`
- `FeaturedCard`
- `GridCard`

## 1. `ImageCarousel`

Will show images as a gallery with options to go back and forth. This going back and forth is achieved by below two functions:

```ts
const [current, setCurrent] = useState(0);

// Modulous is done so that we don't go out of bounds
const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
const next = () => setCurrent((c) => (c + 1) % images.length);
```

It will only show these controls when there is more than one image.

```ts
{/* Controls — only show if multiple images */}
  {images.length > 1 && (
	//...
	...//
  )}
```

#### `AnimatePresence`

We have used `<AnimatePresence mode='wait'>`. `<AnimatePresence>` is used to make exit animations. `mode='wait'` means that it ensures sequential animations by forcing entering components to pause their animations until the exiting components have completely finished their exit animations. It is necessary because without it, the old image and new image could animate simultaneously, causing a visual overlap/flash. The animation is simple. Initially they are invisible and scaled out `initial={{ opacity: 0, scale: 1.04 }}`, once they enter view `animate={{ opacity: 1, scale: 1 }}` and when they exit `exit={{ opacity: 0, scale: 0.97 }}`. Duration is 0.4 `transition={{ duration: 0.4, ease: "easeInOut" }}`.

#### `grayscale group-hover:grayscale-0`

By default they are greyed out, but when they are hovered they will show their colours in 700ms `duration-700`.

#### `md:min-h-0`

By default, flex and grid items have an implicit minimum height of `auto` (`min-height: auto`) in CSS. This means a child element inside a flexbox or grid layout cannot shrink smaller than its content. This default behaviour frequently prevents content from scrolling properly and causes layout boxes to burst or overflow their boundaries. Applying `min-h-0` overrides this default setting, allowing the container to shrink down to zero height if necessary.

For buttons(going back and forth for images) we have centred them using `top-1/2 -translate-y-1/2`. They are also invisible and become visible after hovering `opacity-0 group-hover:opacity-100`.

### `Image` component

**`ImageCarousel`** uses `Image` component from `next` to render images and as we have also used images from unsplash, we had to specify them in `next.config.ts`.

### Usage:

#### Import:

```tsx
import Image from "next/image";
```

#### Use in a component:

```tsx
{
  /* Image */
}
<div className="relative aspect-video overflow-hidden bg-bg-deep">
  <Image
    src={project.images[0]}
    alt={project.title}
    fill={true}
    className="w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-105 transition-all duration-700"
  />
</div>;
```

Here, as we don't know the height and width of the image, we have used `fill={true}`. It will make sure that the image will expand to the size of the parent element. For this to work, you the parent must be `relative`.

#### Configuration in `next.config.ts`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
```

Above we have given path of unsplash, from where the images will come.

## 2. `AccordionItem`

By default first item is opened. `const [open, setOpen] = useState(index === 0);`.
We toggle the open item by `onClick={() => setOpen((o) => !o)}`. If it is open, close it else open it.

#### `aria-expanded={open}`

It is a dynamic state attribute used in JavaScript frameworks (like React) to make web interfaces accessible to users of assistive technologies. It tells screen readers whether an interactive element (such as a button or menu) is currently expanded or collapsed.

##### `rotate-180`

The `Chevron` button will rotate once the item it is associated with is opened.

#### `<AnimatePresence initial={false}>`

It means that don't run the initial animation for components that are already present when AnimatePresence first mounts. It is used in our accordion item. The first item is bydefault open, so there won't be any animation for it (no initial animation, exit animation will still work), but any other accordion item will be animated.

## 3. `FeaturedCard`

It merges `ImageCaraousel`, `AccordionItem` and description of the project.

#### In animation `viewport={{ once: true, margin: "-60px" }}`

It means that animation will only run once. `margin:'-60px'` means that the animation (first time) will be triggered some point earlier, before the element fully enters the viewport. A positive value would have delayed it.

## 4. `GridCard`

The smaller projects down at the bottom.

#### `shrink-0`

We have used above class for arrows. It is a utility class used to prevent a flex item from shrinking when the parent container runs out of horizontal or vertical space. Say the project name is too big, if we were not to use `shrink-0` the arrow would become small, but now it won't due to above class.

#### `flex-wrap`

It breaks flex items into multiple lines when space runs out.

## `ProjectsPage`

It wraps all the above components and add filters on top of it.

```ts
type Category = "all" | "systems" | "backend" | "fullstack" | "ml";
```

The user can select from any of the above categories and the projects will be shown according to that.
