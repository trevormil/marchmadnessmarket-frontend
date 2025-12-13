# Migration Guide: Modern Stack Upgrade

## Overview

This project has been upgraded from:

-   **React 17** → **React 18**
-   **JavaScript** → **TypeScript**
-   **Create React App** → **Vite**
-   **npm/node** → **Bun**
-   **React Router v5** → **React Router v6**
-   **Redux** → **Redux Toolkit**
-   **Material-UI** → **Pure Tailwind CSS (Slate Design System)**

## New Stack

### Build Tools

-   **Bun**: Fast JavaScript runtime and package manager
-   **Vite**: Next-generation build tool
-   **TypeScript**: Type-safe development
-   **Tailwind CSS 3.4+**: Modern utility-first CSS

### Dependencies

-   React 18.3.1
-   React Router 6.26.1
-   Redux Toolkit 2.2.7
-   Axios 1.7.7
-   Firebase 11.1.0

## Installation

```bash
# Install Bun (if not already installed)
curl -fsSL https://bun.sh/install | bash

# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build
```

## Key Changes

### 1. File Structure

-   All `.js` files → `.tsx` or `.ts`
-   `src/index.js` → `src/main.tsx`
-   `src/app.js` → `src/App.tsx`
-   Components use PascalCase: `navigation.js` → `Navigation.tsx`

### 2. React Router v6

-   `<Route component={...}>` → `<Route element={...} />`
-   `<Redirect>` → `<Navigate>`
-   `useHistory()` → `useNavigate()`
-   `withRouter` → Hooks (`useLocation`, `useParams`)

### 3. Redux Toolkit

-   `createStore` → `configureStore`
-   Manual action creators → Redux Toolkit slices (recommended)
-   TypeScript types: `RootState`, `AppDispatch`

### 4. TypeScript

-   Add type annotations to all components
-   Use interfaces for props
-   Type Redux state and actions

### 5. Design System (Slate-like)

-   Minimal borders (`border-border/40`)
-   Subtle backgrounds (`bg-background/80`)
-   Refined spacing (consistent gaps)
-   Less gradients, more solid colors
-   Clean typography with proper hierarchy

## Remaining Work

### Files to Convert

1. Redux reducers → TypeScript
2. Redux actions → TypeScript
3. All page components → TypeScript
4. Utility functions → TypeScript
5. Constants → TypeScript

### Design Updates Needed

1. Update all components to use slate design tokens
2. Replace gradient backgrounds with subtle borders
3. Refine spacing and typography
4. Add consistent hover states
5. Implement proper focus states

## Design Principles (Slate-like)

### Colors

-   Use CSS variables: `hsl(var(--background))`
-   Subtle borders: `border-border/40`
-   Muted text: `text-muted-foreground`
-   Minimal backgrounds: `bg-card/50`

### Spacing

-   Consistent gaps: `gap-1`, `gap-2`, `gap-3`
-   Padding: `px-3 py-1.5` (refined)
-   Margins: Minimal, use gaps instead

### Typography

-   Base: `text-sm`, `text-base`
-   Weights: `font-medium`, `font-semibold`
-   Hierarchy: Clear size differences

### Borders & Shadows

-   Subtle: `border-border/50`
-   Minimal shadows: Avoid heavy shadows
-   Rounded: `rounded-md` (consistent)

## Next Steps

1. Convert remaining components to TypeScript
2. Update Redux to use Redux Toolkit slices
3. Apply slate design system throughout
4. Add proper error boundaries
5. Implement loading states
6. Add unit tests
