# CRM Design Guidelines

## Design Approach
**Design System Approach** - Using a utility-focused design system for a productivity application that prioritizes efficiency and data management. This CRM is primarily information-dense with structured content requiring clear hierarchy and consistent patterns.

**Selected System**: Material Design principles with modern adaptations for professional business tools, emphasizing clarity, efficiency, and data organization.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Light mode: 236 100% 94% (soft blue-gray background), 220 13% 18% (dark text)
- Dark mode: 222 84% 5% (deep charcoal background), 210 40% 98% (light text)

**Accent Colors:**
- Success/positive actions: 142 71% 45% (professional green)
- Warning/pending items: 38 92% 50% (amber for dates/reminders)
- Critical/overdue: 0 84% 60% (red for urgent items)

### B. Typography
- **Primary Font**: Inter via Google Fonts CDN
- **Hierarchy**: 
  - Headers: 600 weight, sizes 24px-32px
  - Body text: 400 weight, 16px base
  - Form labels: 500 weight, 14px
  - Data values: 400 weight, 15px

### C. Layout System
**Spacing Primitives**: Tailwind units of 2, 4, 6, and 8 for consistent rhythm
- Tight spacing: p-2, m-2 for compact data rows
- Standard spacing: p-4, m-4 for form elements
- Generous spacing: p-6, m-6 for section separation
- Large spacing: p-8, m-8 for page-level margins

### D. Component Library

**Navigation**: 
- Top navigation bar with CRM logo/title and user profile
- Simple tab-based navigation: "All Clients", "Add Client", "Dashboard"

**Forms**:
- Clean input fields with floating labels
- Grouped sections: Contact Info, Financial Details, Scheduling, Notes
- Date pickers for scheduling fields
- Currency inputs with proper formatting
- Large textarea for notes section

**Data Display**:
- Card-based client list with key information preview
- Table view option for dense data scanning
- Status indicators for payment/commission dates
- Quick action buttons for edit/contact/view details

**Client Cards**:
- Header with client name and company
- Key metrics: Amount Paid, Next Payment, Next Contact Date
- Visual indicators for overdue dates or pending actions
- Expandable notes preview

**Search & Filtering**:
- Global search bar for client names/emails
- Filter options: Payment status, Contact due dates, Commission dates
- Sort options: Alphabetical, Payment amount, Next contact date

### E. Data Visualization
- Simple progress indicators for deal stages
- Color-coded date indicators (green=upcoming, amber=due soon, red=overdue)
- Clean typography hierarchy for financial data
- Minimal charts for dashboard overview (total revenue, client count)

## Professional Business Tool Focus
This CRM emphasizes:
- **Efficiency**: Quick data entry and retrieval
- **Clarity**: Clear financial and scheduling information
- **Professional appearance**: Clean, trustworthy interface suitable for client-facing scenarios
- **Data density**: Comfortable display of multiple data points without clutter
- **Workflow optimization**: Logical grouping of related fields and actions

## Images
No large hero images needed. This is a utility-focused business application where imagery would distract from the data-centric workflow. Any icons should come from Heroicons for consistency with the clean, professional aesthetic.