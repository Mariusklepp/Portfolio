# Portfolio

A personal portfolio website built with React, Vite, and Tailwind CSS.

## Tech Stack

- **React 19** with TypeScript
- **Vite** for development and bundling
- **React Router** for client-side routing
- **Tailwind CSS v4** for styling
- **Iconify** for icons
- Deployed on **Vercel**

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Build for production into `dist/`    |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |

## Project Structure

```
src/
├── components/   Reusable UI components (Navbar, Button, ProjectCard, ...)
├── pages/        Route pages (Home, About, Projects, Project, Contact)
├── data/         Project and content data
├── hooks/        Custom React hooks
├── assets/       Images and static assets
└── App.tsx       App shell and routing
```

## Deployment

The site is deployed on Vercel. Pushes to `main` trigger automatic production deployments.
