# Intermediate React v6 Examples

Course notes and small example projects from **Intermediate React, v6: RSCs, Hooks, & Performance** by Brian Holt.

This repo tracks my progress through the course while I build small examples by hand to better understand modern React rendering patterns, including client-side React, static site generation, server-side rendering, hydration, and React Server Components.

## Course Links

- Frontend Masters course: https://frontendmasters.com/courses/intermediate-react-v6/
- Course site / notes: https://intermediate-react-v6.holt.courses/

## Examples

- `ssg/` — static site generation from scratch using React and Node
- `ssr/` — server-side rendering from scratch using React, Fastify, Vite, and hydration
- `no-framework-RSC/` — React Server Components without a framework, using Webpack, Babel, Fastify, React Flight, and a SQLite notes database

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

## Key Concepts Covered

- Rendering React without JSX using `createElement`
- Static site generation using `renderToStaticMarkup`
- Server-side rendering using `renderToString`
- Hydration with `hydrateRoot`
- Client-only browser entry files
- Server/client component boundaries
- The `"use client"` directive
- React Server Components as server-rendered UI
- React Flight payloads
- Streaming RSC output with `renderToPipeableStream`
- Webpack/Babel setup for a no-framework RSC example
- Using Fastify to serve static assets and RSC responses
- Reading data from a SQLite database inside a Server Component

## Notes

These examples are intentionally small and educational. The goal is not to build production-ready frameworks by hand, but to understand the lower-level mechanics that tools like Next.js, Astro, and other React frameworks handle automatically.
