# Frontend Styling Guide

## Stack

| Tool | Usage |
|---|---|
| Tailwind CSS 4 | Primary styling — utility classes for layout, spacing, colors, responsive design |
| CSS Modules (`.module.css`) | Component-scoped styles when Tailwind utilities are insufficient |
| Sass (`.module.scss`) | Complex component styles requiring nesting, variables, or mixins |
| `tailwind-merge` | Merging conditional Tailwind classes without conflicts |
| `classnames` | Combining CSS Module classes conditionally |

## Tailwind CSS 4

Tailwind is imported in `app/styles/tailwind.css`:

```css
@import "tailwindcss";
```

Global resets and base styles are in `app/styles/index.scss` and `app/styles/_additional_reset.scss`.

## CSS Modules

Used for component-specific styles that go beyond Tailwind utilities. Files are co-located with their components:

```
entities/Message/ui/MessageBubble/
├── MessageBubble.tsx
└── MessageBubble.module.css
```

Import pattern:

```tsx
import styles from './MessageBubble.module.css';
```

## When to Use What

| Scenario | Approach |
|---|---|
| Layout, spacing, responsive | Tailwind utility classes |
| Complex animations or pseudo-elements | CSS Modules (`.module.css`) |
| Styles needing Sass features (nesting, mixins) | Sass Modules (`.module.scss`) |
| Conditional class merging | `tailwind-merge` for Tailwind, `classnames` for CSS Modules |
