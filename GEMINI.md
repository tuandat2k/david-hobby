# Gemini CLI Project Mandates - David Hobby

This document provides foundational context and instructions for Gemini CLI when working on the David Hobby project. These mandates take precedence over general defaults.

## Project Context
David Hobby is a web application built with Next.js (App Router) and React 19, focusing on a product showcase or e-commerce experience. It features multi-language support (Vietnamese and English) and uses a modular component architecture.

## Technical Stack
- **Framework:** Next.js 16.2.4 (App Router)
- **Library:** React 19.2.4
- **Language:** TypeScript
- **Styling:** CSS Modules (`.module.css`)
- **Localization:** i18n implementation using middleware and dynamic JSON dictionaries.
- **Data Source:** Static JSON (`src/data/products.json`)

## Architecture & Conventions

### 1. File Structure
- `src/app/`: Contains the App Router routes and global styles.
- `src/app/[lang]/`: Dynamic route for localization.
- `src/components/`: Reusable UI components.
- `src/dictionaries/`: JSON translation files.
- `src/data/`: Data storage (JSON).

### 2. Styling Standards
- Prefer **CSS Modules** for component-specific styles to avoid global namespace pollution.
- Use the `container` class (defined in `globals.css`) for consistent page centering.
- Follow the existing naming convention for style objects: `import styles from './ComponentName.module.css'`.

### 3. Localization (i18n)
- The application uses a `[lang]` segment in the URL.
- Supported locales: `vi` (default), `en`.
- Use `getDictionary(lang)` from `@/app/dictionaries` to fetch translations in server components.
- Pass `lang` and `dict` props to components that require localized text.

### 4. Components
- Favor Functional Components with TypeScript interfaces for props.
- Keep components small and focused.
- Place styles, components, and tests (if any) in a modular fashion.

## Workflow Mandates
- **Analysis First:** Before making changes, always check for existing patterns in similar components or pages.
- **Type Safety:** Maintain strict TypeScript typing. Avoid using `any` unless absolutely necessary.
- **Surgical Updates:** When modifying styles or logic, ensure no regressions in other locales or responsive layouts.
- **Validation:** Always verify changes by checking both `vi` and `en` routes if they involve UI text.

## Commands
- **Development:** `npm run dev`
- **Build:** `npm run build`
- **Linting:** `npm run lint`
