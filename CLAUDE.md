# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RISE Developer Toolkit - A Next.js 15 documentation portal for RISE Chain's developer APIs, featuring interactive demos and code examples for Shred API (real-time transaction data), Fast VRF (10-100ms verifiable randomness), and Time Oracle (millisecond precision timestamps).

## Common Commands

```bash
# Development
npm run dev       # Start development server with Turbopack on http://localhost:3000

# Production
npm run build     # Build for production
npm run start     # Start production server

# Code Quality
npm run lint      # Run ESLint
```

## Architecture & Key Patterns

### Tech Stack
- **Framework**: Next.js 15.3.2 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS + Framer Motion animations
- **Components**: Radix UI primitives

### Project Structure
```
src/
├── app/          # Next.js pages - each API has its own section
│   ├── [api]/    # shred-api, fast-vrf, time-oracle
│   │   ├── api-docs/
│   │   ├── code-examples/
│   │   └── explainer/
├── components/
│   ├── layout/   # Navigation components
│   ├── sections/ # Page sections (Hero, Features)
│   ├── templates/# Reusable page templates
│   └── ui/       # Base UI components
├── data/         # Static content and navigation
└── lib/          # API utilities and helpers
```

### Development Patterns

1. **Component Guidelines**:
   - Mark client components with `'use client'`
   - Use TypeScript interfaces for all props
   - Follow existing component structure in respective directories

2. **Styling**:
   - Use Tailwind utilities following the custom theme (primary, neon, surface colors)
   - Animations use Framer Motion - see ShredsAnimation.tsx for patterns
   - Dark theme optimized - use surface-* colors for backgrounds

3. **API Integration**:
   - WebSocket examples in lib/websocket.ts
   - API demos in components/ui/ApiDemo.tsx
   - Code examples stored in data/api-examples.ts

4. **Navigation**:
   - Navigation structure defined in data/navigation.ts
   - Side navigation auto-generated from this data
   - Add new pages by updating navigation.ts

## Important Files

- `tailwind.config.js` - Custom theme colors and animations
- `data/navigation.ts` - Site navigation structure
- `components/templates/` - Reusable page templates for consistent layout
- `components/ui/CodeBlock.tsx` - Syntax highlighted code display

## When Adding Features

1. **New API Section**: Copy existing API folder structure (e.g., shred-api/)
2. **New Components**: Follow existing patterns in components/ directory
3. **Code Examples**: Add to data/api-examples.ts with proper language tags
4. **Navigation**: Update data/navigation.ts to include new pages

## TypeScript Path Alias

Use `@/` for imports from src directory:
```typescript
import { Component } from '@/components/ui/Component'
```