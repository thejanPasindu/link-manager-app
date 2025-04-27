# Best Practices for Next.js, React, Tailwind CSS

## Application Structure

### Project Organization
```
src/
├── components/
│   ├── ui/              # Reusable UI components (e.g., Button, Card)
│   └── features/        # Feature-specific components
├── app/ (or pages/)     # Next.js routing (depending on router choice)
├── hooks/               # Custom React hooks
├── context/             # Context providers (or state management)
├── utils/               # Utility functions and helpers
├── styles/              # Global styles and Tailwind customizations
├── lib/                 # External services, API clients
└── assets/              # Static assets like images, fonts
```

### Feature Organization (for larger applications)
```
src/
├── features/
│   ├── auth/
│   │   ├── components/  # React components specific to auth
│   │   ├── context/     # Auth-specific context/store
│   │   └── utils/       # Auth-specific utilities
│   └── products/
│       ├── components/
│       └── context/
├── shared/              # Shared components, context, utilities
│   ├── components/
│   └── utils/
└── app/ (or pages/)     # Next.js routes using feature components
```

## Component Creation Guidelines

### When to Create a New Component
- Create a new component when:
  - UI element is reused in multiple places
  - Section exceeds 100 lines of code
  - Section has distinct responsibility
  - Complex logic (more than 3 state variables or hooks)
  - Interaction pattern (modal, dropdown, form stepper)

### When NOT to Create a New Component
- Avoid components that:
  - Are used once and are very simple (< 50 lines)
  - Are too granular (single styled button without special behavior)
  - Break apart components unnecessarily

### Component Types
- **Server Components (Next.js App Router)**
  - Default components; use for static rendering and server-side data fetching.
- **Client Components**
  - Add `'use client'` directive when you need state, effects, or interactivity.

## State Management Best Practices

### Store Organization
- Use Context API or third-party libraries (Zustand, Redux Toolkit) depending on complexity.
- Group stores or contexts by feature.

### Keep Stores Simple
- Focus on a single responsibility per context/store.
- Derive computed values inside selectors/hooks.
- Separate UI state (modals, loading) from domain state (user, products).

### Store Actions Pattern
```javascript
// userContext.js
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${id}`);
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
```

## Markup and Tailwind CSS Guidelines

### Keep Markup Simple
- Max nesting depth: 3-4 levels
- Avoid deeply nested ternaries or conditionals
- Use semantic HTML (`<section>`, `<article>`, `<header>`, etc.)

### Tailwind Best Practices
- Use utility classes directly in JSX.
- Extract reusable UI patterns into components.
- Use `@apply` sparingly for highly reused patterns.
- Define consistent design tokens (colors, spacing, typography) in `tailwind.config.js`.

### Component Composition Example
```jsx
// Bad: Overly nested
<div className="p-4 border rounded-lg shadow-md">
  <div className="flex flex-col space-y-4">
    <div className="bg-gray-100 p-3 rounded">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">{title}</h3>
        {isEditable && (
          <div className="flex space-x-2">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        )}
      </div>
    </div>
  </div>
</div>

// Good: Flatter with components
<Card>
  <CardHeader title={title} actions={isEditable && <ActionButtons />} />
</Card>
```

## Next.js Data Fetching Best Practices

### Use the right data fetching method:
- `getStaticProps` / `getStaticPaths` (Pages Router) for static generation.
- `generateMetadata` / `fetch()` inside Server Components (App Router).
- `getServerSideProps` for dynamic SSR pages.
- `fetch` directly in server components without `useEffect` when possible.

### Client-Side Fetching
- Use `useSWR` or `react-query` for client-side data fetching and caching.
- Example with SWR:
```javascript
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(res => res.json());

export function useUser(id) {
  const { data, error } = useSWR(`/api/users/${id}`, fetcher);
  return { user: data, isLoading: !error && !data, isError: error };
}
```

## Code Elegance Guidelines

### Simplicity Principles
- Functions: under 20 lines
- Components: under 150 lines
- Props: under 7 props ideally
- Destructure props for cleaner code
- Group related state logically
- Components only know what they need

### Performance Considerations
- Code splitting: `dynamic()` import heavy components
- Image optimization: use Next.js `<Image />`
- Use memoization (`useMemo`, `React.memo`) where necessary
- Lazy load heavy components
- API routes or server actions for backend tasks

### Code Organization
- Default export for main component
- Named exports for utility functions/hooks
- Group hooks/state declarations at the top
- Event handlers separate from JSX

---

> **Note:** In Next.js, there's no need for client directives like `client:load`, `client:idle`, etc. Instead, carefully decide if a file/component should be a server component or client component by adding `'use client'` at the top.

> **Folder convention tip:** Stick with `src/` for everything including `app/` if you are using the App Router. This keeps your project clean and scalable.

