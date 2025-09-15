# Sophie's CRM Design Guidelines

## Design Approach
**Design System Approach** - Utility-focused design system optimized for professional productivity. Using Material Design principles with modern minimalist adaptations, emphasizing clarity, efficiency, and premium feel for business users managing client relationships.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Light mode: 240 5% 98% (warm white background), 240 10% 15% (charcoal text)
- Dark mode: 240 10% 8% (deep charcoal background), 240 5% 95% (warm white text)

**Accent Colors:**
- Primary brand: 220 100% 65% (sophisticated blue for actions)
- Success indicators: 150 60% 50% (refined green for positive states)
- Warning states: 35 80% 55% (warm amber for pending items)
- Critical alerts: 0 70% 55% (muted red for urgent items)

### B. Typography
- **Primary Font**: Inter via Google Fonts CDN
- **Hierarchy**:
  - Page headers: 700 weight, 28px-36px
  - Section titles: 600 weight, 20px-24px
  - Body text: 400 weight, 16px base
  - Form labels: 500 weight, 14px
  - Metadata: 400 weight, 13px with reduced opacity

### C. Layout System
**Spacing Primitives**: Tailwind units of 3, 6, 8, and 12 for generous, premium spacing
- Compact elements: p-3, m-3 for tight layouts
- Standard components: p-6, m-6 for comfortable breathing room
- Section separation: p-8, m-8 for clear hierarchy
- Page-level margins: p-12, m-12 for premium whitespace

### D. Component Library

**Navigation:**
- Clean top navigation with Sophie's CRM wordmark
- Subtle tab navigation: Dashboard, Clients, Leads, Reports
- User profile dropdown in top-right corner

**Client Management:**
- Minimal client cards with generous padding
- Key information hierarchy: Name, Company, Deal Value, Status
- Subtle shadow and rounded corners for premium feel
- Clean table view with alternating row backgrounds

**Forms:**
- Floating label inputs with subtle animations
- Grouped fieldsets: Contact Details, Business Info, Deal Information
- Date/time pickers with calendar integration
- Rich text editor for notes with minimal toolbar

**Data Visualization:**
- Clean progress bars for deal stages
- Subtle color-coded status indicators
- Minimal dashboard charts with plenty of whitespace
- Typography-focused data display over heavy graphics

**Search & Filtering:**
- Prominent search bar with subtle focus states
- Collapsible filter panel with clean checkboxes
- Sort dropdown with clear typography hierarchy

### E. Interaction Design
- Subtle hover states with gentle color transitions
- Minimal loading states with clean spinners
- Toast notifications with premium styling
- Modal dialogs with backdrop blur effects

## Premium Minimal Focus
Sophie's CRM emphasizes:
- **Generous Whitespace**: Ample breathing room throughout interface
- **Typography Hierarchy**: Clear information architecture through font weights
- **Subtle Interactions**: Refined micro-interactions without distraction
- **Professional Aesthetics**: Clean, trustworthy appearance for business contexts
- **Focused Workflows**: Logical grouping minimizing cognitive load

## Images
No hero images needed. This is a productivity-focused application where large imagery would detract from the clean, data-centric workflow. Use Heroicons exclusively for consistency with the minimal, professional aesthetic. Any placeholder content should use subtle geometric patterns or solid color blocks rather than photography.