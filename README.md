# Intermediate React v6 Examples

Course notes and small example projects from **Intermediate React, v6: RSCs, Hooks, & Performance** by Brian Holt.

This repo tracks my progress through the course while I build small examples by hand to better understand modern React rendering patterns, including client-side React, static site generation, server-side rendering, hydration, React Server Components, framework-supported RSC patterns in Next.js, and React performance optimization patterns.

## Course Links

- Frontend Masters course: https://frontendmasters.com/courses/intermediate-react-v6/
- Course site / notes: https://intermediate-react-v6.holt.courses/

## Examples

- `ssg/` — static site generation from scratch using React and Node
- `ssr/` — server-side rendering from scratch using React, Fastify, Vite, and hydration
- `no-framework-RSC/` — React Server Components without a framework, using Webpack, Babel, Fastify, React Flight, and a SQLite notes database
- `next/my-super-cool-note-app/` — Next.js App Router example using React Server Components, Client Components, Server Actions, form submissions, polling, and SQLite
- `perf/` — performance-focused React example using a markdown previewer to explore unnecessary re-renders, `memo`, `useMemo`, and `useCallback`
- `transitions/` — scoreboard example using `useTransition` to keep the UI responsive during async score updates
- `optimistic/` — optimistic UI example using `useOptimistic` for temporary UI updates while POST requests complete
- `deferred/` — image filter example using `useDeferredValue` to defer expensive visual updates while keeping slider input responsive

## Progress

### Completed so far

1. Welcome
   - Intro
   - My Setup
   - React 19

2. React Render Modes
   - Client-Side React
   - Static Site Generation
   - Server-Side Rendering

3. RSCs without a Framework
   - Intro to React Server Components
   - RSC Dependencies
   - Server and Client Components
   - The RSC Server

4. RSCs with Next.js
   - Next.js App Router file-based routing
   - Server Components by default
   - Client Components with `"use client"`
   - Server Actions with `"use server"`
   - Form submissions without manually writing API routes
   - Combining Server Components and Client Components
   - Passing server-fetched initial data into Client Components
   - Polling from a Client Component using a server function
   - Passing pre-rendered Server Components as `children` into Client Components
   - Reading from and writing to a SQLite database in server-side code

5. Performance
   - Building a deliberately slow markdown previewer
   - Identifying unnecessary child re-renders
   - Using `memo` to skip re-renders when props are unchanged
   - Using `useMemo` to stabilize object/value references
   - Using `useCallback` to stabilize function references
   - Understanding why object and function references fail `===` checks across renders
   - Understanding when memoization is useful and when it adds unnecessary complexity
   - Brief introduction to React Compiler as future-facing automatic memoization tooling

6. Transitions
   - Building a scoreboard app with an intentionally slow API
   - Comparing blocking loading state with transition-based updates
   - Understanding why disabling UI during loading can create a poor user experience
   - Using `useTransition` to keep the UI responsive during async updates
   - Using `isPending` from `useTransition` to show loading feedback
   - Using `startTransition` to mark non-urgent updates as interruptible
   - Understanding how transitions help React prioritize newer user interactions over slower pending updates

7. Optimistic Values
   - Building a deep thoughts app with delayed POST requests
   - Understanding optimistic UI as temporary UI before server confirmation
   - Using `useOptimistic` to show pending user-created data immediately
   - Wrapping optimistic updates in `startTransition`
   - Handling successful server responses by replacing optimistic state with confirmed state
   - Understanding rollback behavior when an optimistic request fails

8. Deferred Values
   - Building an image filter app with slider-controlled CSS filters
   - Using `useDeferredValue` to create lower-priority versions of fast-changing values
   - Comparing immediate slider values with deferred values
   - Showing an updating state when current and deferred values differ
   - Deferring expensive image updates while keeping form controls responsive
   - Combining `useDeferredValue` with `memo` to reduce unnecessary expensive renders

## Key Concepts Covered

- Rendering React without JSX using `createElement`
- Static site generation using `renderToStaticMarkup`
- Server-side rendering using `renderToString`
- Hydration with `hydrateRoot`
- Client-only browser entry files
- Server/client component boundaries
- The `"use client"` directive
- The `"use server"` directive
- React Server Components as server-rendered UI
- React Flight payloads
- Streaming RSC output with `renderToPipeableStream`
- Webpack/Babel setup for a no-framework RSC example
- Using Fastify to serve static assets and RSC responses
- Reading data from a SQLite database inside a Server Component
- Next.js App Router routing with `app/`, `page.js`, and route folders
- Server Components as the default component type in the App Router
- Using Client Components for state, effects, polling, and browser interactivity
- Passing initial server-fetched data into Client Components
- Using Server Actions as form handlers
- Working with `FormData` in a Server Action
- Updating SQLite data from a Server Action
- Using `redirect()` after a server-side mutation
- Understanding the limits of passing Server Components into Client Components
- Creating artificial render jank to study performance bottlenecks
- Understanding parent re-renders and child component re-renders
- Using `memo` to memoize an expensive child component
- Using `useMemo` for stable object/value references
- Using `useCallback` for stable function references
- Understanding primitive values vs object/function reference equality
- Understanding why memoization should be used selectively, not by default
- React Compiler as a tool for automatic memoization and optimization
- Using `useTransition` to mark non-urgent updates as interruptible
- Using `isPending` to show feedback during transition updates
- Understanding React’s scheduler and how it prioritizes urgent user interactions
- Using `useOptimistic` to show temporary UI before a server response completes
- Understanding optimistic UI rollback when server mutations fail
- Using `useDeferredValue` to defer expensive UI updates
- Understanding the difference between immediate state and deferred values
- Using CSS `filter` to apply visual image effects without changing original image data

## Notes

These examples are intentionally small and educational. The goal is not to build production-ready frameworks by hand, but to understand the lower-level mechanics that tools like Next.js, Astro, and other React frameworks handle automatically.

The Next.js example builds on the lower-level RSC examples by showing how a framework handles routing, server rendering, server/client component boundaries, form actions, and database access with much less manual setup.

The performance examples focus on React’s render behavior and show why memoization tools like `memo`, `useMemo`, and `useCallback` are useful in specific cases, especially when a child component is expensive to re-render.

The transitions, optimistic values, and deferred values examples build on those performance concepts by showing how React can keep user interfaces responsive during slower async work, temporary optimistic updates, and expensive visual rendering.
