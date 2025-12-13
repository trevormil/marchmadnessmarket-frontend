# March Madness Market

A modern fantasy sports market platform for the NCAA March Madness tournament.

## Tech Stack

-   **Runtime**: Bun
-   **Framework**: React 18 + TypeScript
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS (Slate Design System)
-   **State Management**: Redux Toolkit
-   **Routing**: React Router v6
-   **Backend**: Firebase

## Getting Started

### Prerequisites

-   [Bun](https://bun.sh) installed

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Project Structure

```
src/
├── components/        # React components
│   ├── pages/        # Page components
│   └── ui/           # UI components
├── constants/         # Constants and routes
├── redux/            # Redux store, actions, reducers
├── helpers/          # Utility functions
└── main.tsx          # Entry point
```

## Design System

This project uses a minimal, slate-inspired design system. See [DESIGN_SPEC.md](./DESIGN_SPEC.md) for details.

## Migration

See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for information about the recent stack upgrade.

## Development

The project uses:

-   TypeScript for type safety
-   ESLint for code quality
-   Vite for fast development
-   Bun for package management

## License

Private project
