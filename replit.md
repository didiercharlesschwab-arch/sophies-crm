# Sophie's CRM

## Overview

Sophie's CRM is a professional client relationship management system designed for managing leads, payments, scheduling, and commissions. Built with React and TypeScript on the frontend and Express.js on the backend, it provides a clean, modern interface for tracking client information, deal progress, and financial data. The application emphasizes productivity and clarity with a sophisticated design system optimized for professional use.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible components
- **Styling**: Tailwind CSS with custom design tokens following Material Design principles
- **State Management**: TanStack React Query for server state management with local state handled by React hooks
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful API structure with `/api` prefix for all endpoints
- **Development**: Hot reloading with Vite middleware integration
- **Storage Interface**: Abstracted storage layer with in-memory implementation (MemStorage) for development

### Data Management
- **Database**: PostgreSQL configured through Drizzle ORM
- **Schema**: Type-safe database schema with Zod validation
- **Migrations**: Drizzle Kit for database migrations and schema management
- **Client Data Model**: Comprehensive client records including contact details, billing information, deal tracking, and commission scheduling

### Design System
- **Typography**: Inter font from Google Fonts CDN
- **Color Palette**: Sophisticated neutral base with blue primary accent, supporting both light and dark themes
- **Component Library**: Custom design tokens with Tailwind utilities for spacing (3, 6, 8, 12 unit system)
- **Layout**: Card-based interface with generous whitespace and premium visual hierarchy
- **Responsive Design**: Mobile-first approach with tablet and desktop breakpoints

### Authentication & Security
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **Data Validation**: Zod schemas for runtime type checking and validation
- **Error Handling**: Centralized error handling with proper HTTP status codes

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection for serverless environments
- **drizzle-orm**: Type-safe database ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management and caching
- **react-hook-form**: Form state management with validation
- **@hookform/resolvers**: Integration layer for Zod validation with React Hook Form

### UI Framework
- **@radix-ui/***: Comprehensive set of accessible UI primitives including dialogs, dropdowns, navigation, and form controls
- **class-variance-authority**: Type-safe variant API for component styling
- **tailwindcss**: Utility-first CSS framework for responsive design
- **lucide-react**: Modern icon library for consistent iconography

### Development Tools
- **typescript**: Static type checking and enhanced developer experience
- **vite**: Fast build tool with hot module replacement
- **esbuild**: Fast JavaScript bundler for production builds
- **tsx**: TypeScript execution environment for development server

### Utility Libraries
- **date-fns**: Date manipulation and formatting utilities
- **clsx**: Conditional className utility for dynamic styling
- **cmdk**: Command palette component for enhanced navigation
- **nanoid**: Secure URL-friendly unique ID generator