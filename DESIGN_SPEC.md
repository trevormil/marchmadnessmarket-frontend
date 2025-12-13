# March Madness Market - Figma Design System

## Overview

Design system based on the Figma design "Modern March Madness Landing Page". This system emphasizes a dark, modern aesthetic with dynamic gradients, glassmorphism effects, and smooth animations.

## Design Philosophy

1. **Dark First**: Deep slate-950 backgrounds with subtle gradients
2. **Dynamic Gradients**: Radial gradients for depth and visual interest
3. **Glassmorphism**: Backdrop blur effects for modern UI elements
4. **Smooth Animations**: Motion/react for polished interactions
5. **Bold Typography**: Large, impactful text with gradient accents
6. **Interactive Elements**: Hover states, transitions, and micro-interactions

## Color Palette

### Primary Colors

-   **Blue-500**: `#3b82f6` - Primary brand color
-   **Blue-600**: `#2563eb` - Hover states, buttons
-   **Blue-400**: `#60a5fa` - Accents, highlights
-   **Blue-300**: `#93c5fd` - Light accents
-   **Blue-900**: `#1e3a8a` - Dark backgrounds, shadows

### Accent Colors

-   **Orange-400**: `#fb923c` - Secondary accent
-   **Orange-500**: `#f97316` - Highlights
-   **Orange-600**: `#ea580c` - Hover states
-   **Orange-900**: `#7c2d12` - Dark accents

### Neutral Colors

-   **Slate-950**: `#020617` - Primary background
-   **Slate-900**: `#0f172a` - Card backgrounds
-   **Slate-800**: `#1e293b` - Borders, dividers
-   **Slate-700**: `#334155` - Subtle borders
-   **Slate-600**: `#475569` - Muted text
-   **Slate-500**: `#64748b` - Secondary text
-   **Slate-400**: `#94a3b8` - Tertiary text
-   **Slate-300**: `#cbd5e1` - Light text

### Status Colors

-   **Green-500**: `#22c55e` - Success, active states
-   **Purple-500**: `#a855f7` - Special accents

## Typography

### Font Family

-   **Primary**: Inter (300, 400, 500, 600, 700, 900)
-   **Monospace**: JetBrains Mono, Fira Code (for calculations, code)

### Scale

-   **7xl**: `4.5rem` (72px) - Hero headlines
-   **5xl**: `3rem` (48px) - Large displays
-   **4xl**: `2.25rem` (36px) - Section titles
-   **3xl**: `1.875rem` (30px) - Subsection titles
-   **2xl**: `1.5rem` (24px) - Card titles
-   **xl**: `1.25rem` (20px) - Body large
-   **lg**: `1.125rem` (18px) - Body
-   **base**: `1rem` (16px) - Default
-   **sm**: `0.875rem` (14px) - Small text
-   **xs**: `0.75rem` (12px) - Labels, metadata
-   **[10px]**: `0.625rem` - Tiny labels

### Weights

-   **Black**: 900 - Hero text
-   **Bold**: 700 - Headings
-   **Semibold**: 600 - Subheadings, emphasis
-   **Medium**: 500 - Body emphasis
-   **Normal**: 400 - Body text

### Tracking

-   **Tighter**: `-0.05em` - Large displays
-   **Tight**: `-0.025em` - Headlines
-   **Wider**: `0.05em` - Uppercase labels
-   **Widest**: `0.1em` - Badges, tags

## Spacing

### Container

-   **Max Width**: `container` (responsive: 40rem → 96rem)
-   **Padding**: `px-4` (mobile) → `px-6` (desktop)
-   **Gap**: `gap-12` (large sections), `gap-8` (standard), `gap-6` (cards), `gap-4` (elements), `gap-2` (tight)

### Component Spacing

-   **Hero**: `pt-16` (account for navbar), `pb-16`
-   **Cards**: `p-6` (standard), `p-8` (spacious)
-   **Buttons**: `px-8 py-4` (large), `px-4 py-2` (default)
-   **Badges**: `px-4 py-1.5`

## Backgrounds

### Hero Background

```css
/* Base */
bg-slate-950

/* Radial Gradients */
bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]
from-blue-900/20 via-slate-950 to-slate-950

bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))]
from-orange-900/10 via-slate-950 to-slate-950

/* Grid Pattern */
backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)'
backgroundSize: '50px 50px'
```

### Card Backgrounds

-   **Standard**: `bg-slate-900/80` with `backdrop-blur-xl`
-   **Header**: `bg-slate-950/50`
-   **Content Area**: `bg-slate-950/50`
-   **Borders**: `border-slate-800` or `border-white/5`

## Components

### Buttons

#### Primary (Gradient)

```tsx
className="bg-gradient-to-r from-blue-600 to-blue-500
           hover:from-blue-500 hover:to-blue-400
           text-white border-0
           shadow-lg shadow-blue-900/20
           h-14 px-8 text-lg font-semibold rounded-xl"
```

#### Secondary (Outline)

```tsx
className="border-slate-800 bg-slate-900/50
           text-slate-300 hover:text-white hover:bg-slate-800
           h-14 px-8 text-lg rounded-xl backdrop-blur-sm"
```

### Cards

#### Protocol Calculator Card

```tsx
className="bg-slate-900/80 border-slate-800
           backdrop-blur-xl shadow-2xl
           overflow-hidden rounded-3xl"
```

#### Card Header

```tsx
className = 'bg-slate-950/50 p-6 border-b border-white/5';
```

#### Card Content

```tsx
className = 'p-8 space-y-8';
```

### Badges

#### Market Status Badge

```tsx
className="border-white/10 bg-slate-900/50
           text-slate-300 backdrop-blur-xl
           px-4 py-1.5 text-sm uppercase tracking-widest"
```

### Sliders

#### Track

```tsx
className = 'bg-muted relative grow overflow-hidden rounded-full h-4';
```

#### Range

```tsx
className = 'bg-primary absolute h-full';
```

#### Thumb

```tsx
className="block h-5 w-5 rounded-full border-2 border-primary
           bg-background ring-offset-background
           focus-visible:ring-2 focus-visible:ring-ring"
```

## Effects & Animations

### Motion Animations

-   **Fade In**: `opacity: 0 → 1`, `scale: 0.9 → 1`
-   **Slide Up**: `y: 20 → 0`, `opacity: 0 → 1`
-   **Slide In**: `x: 20 → 0`, `opacity: 0 → 1`
-   **Duration**: `0.5s` (standard), `0.6s` (delayed), `0.2s` (fast)
-   **Delays**: `0.1s`, `0.2s`, `0.3s` (staggered)

### Hover Effects

-   **Buttons**: Gradient shift, scale transform
-   **Cards**: Subtle lift, border glow
-   **Links**: Color transition

### Glow Effects

-   **Behind Cards**: `bg-blue-500/20 rounded-full blur-[100px]`
-   **Badge Glow**: `bg-gradient-to-r from-blue-600 to-orange-600 rounded-full blur opacity-25`

### Pulse Animations

-   **Status Indicator**: `animate-pulse` on green dot
-   **Live Badge**: `animate-ping` on blue dot

## Layout Patterns

### Hero Section

-   **Container**: `container mx-auto px-4`
-   **Grid**: `grid lg:grid-cols-2 gap-12 items-center`
-   **Min Height**: `min-h-screen`
-   **Padding Top**: `pt-16` (navbar offset)

### Two Column Layout

-   **Left**: Content, branding, CTAs
-   **Right**: Interactive calculator, visual elements

## Interactive Elements

### Protocol Calculator

-   **Real-time Updates**: Sliders update payout instantly
-   **Visual Feedback**: Animated number changes
-   **Contextual Insights**: Dynamic text based on seed/wins
-   **Live Indicator**: Pulsing dot with "LIVE CALCULATION"

### Market Status Badge

-   **Animated Pulse**: Green dot indicator
-   **Gradient Glow**: Hover effect with gradient blur
-   **Backdrop Blur**: Glassmorphism effect

## Shadows

-   **Card Shadow**: `shadow-2xl`
-   **Button Shadow**: `shadow-lg shadow-blue-900/20`
-   **Inner Shadow**: `shadow-inner` (for logo container)

## Borders

-   **Standard**: `border-slate-800`
-   **Subtle**: `border-white/5` or `border-white/10`
-   **Radius**: `rounded-3xl` (cards), `rounded-xl` (buttons), `rounded-md` (inputs)

## Responsive Breakpoints

-   **sm**: 640px
-   **md**: 768px
-   **lg**: 1024px
-   **xl**: 1280px
-   **2xl**: 1536px

## Key Design Elements

### 1. Hero Headline

-   Large, bold text with gradient accent
-   "Trade the Tournament" with blue gradient
-   Tracking-tight for impact

### 2. Market Status

-   Animated badge with pulse effect
-   Green dot indicator
-   Gradient glow on hover

### 3. Protocol Calculator

-   Interactive sliders
-   Real-time calculation display
-   Contextual market insights
-   Live calculation indicator

### 4. Background Layers

-   Multiple radial gradients
-   Subtle grid pattern overlay
-   Depth through layering

### 5. Social Proof

-   Icon + text combinations
-   Muted colors with accent icons
-   Horizontal layout with dividers

## Implementation Notes

### Dependencies

-   `motion/react` - Animations
-   `lucide-react` - Icons
-   `@radix-ui/react-slider` - Slider component
-   `class-variance-authority` - Component variants
-   `tailwind-merge` - Class merging utility

### Performance

-   Use `motion` for animations (optimized)
-   Lazy load heavy components
-   Optimize images
-   Use CSS gradients over images where possible

## Migration Checklist

-   [x] Extract Figma design
-   [x] Create UI components (Button, Card, Slider, Badge)
-   [x] Implement Hero section
-   [ ] Update Navigation to match design
-   [ ] Update all pages to use new design system
-   [ ] Apply animations throughout
-   [ ] Update color scheme globally
-   [ ] Refine spacing and typography
-   [ ] Add hover states everywhere
-   [ ] Implement glassmorphism effects
