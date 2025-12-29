🛍️ ShopMart – E-Commerce Web Application

Live Demo: https://e-commerce-gamma-pearl-64.vercel.app/

ShopMart is a modern, responsive e-commerce storefront built with Next.js, TypeScript, Tailwind CSS, and UI components from shadcn/ui.
It offers a complete user shopping experience including browsing products, categories, brands, authentication, cart, checkout, and user account management (orders, addresses, password features).

⸻

🚀 Features

🛒 User-Facing Features
	•	Browse Products, Categories, and Brands
	•	Search and filter products
	•	Shopping Cart with item management
	•	Checkout flow
	•	User Authentication (Sign in / Create Account)
	•	Order History and details
	•	Wishlist / Favorites
	•	Responsive UI for mobile & desktop

🔐 Account Management
	•	Forgot Password (Email → Code → Reset Flow)
	•	Change Password (protected, with automatic logout after update)
	•	Manage user profile and addresses

📦 Admin & UI Enhancements
	•	Clean navigation with modern design
	•	Mobile-friendly interface
	•	Interactive notifications and form validation
	•	Premium consistent design system

⸻

🧠 Tech Stack
	•	Next.js 16 (App Router) – React framework with optimized routing
	•	TypeScript – Static typing
	•	Tailwind CSS – Utility-first styling
	•	shadcn/ui – UI components library
	•	React Hook Form + Zod – Form logic & validation
	•	NextAuth.js – Authentication management
	•	Sonner – Toast notifications
	•	FontAwesome – Iconography

⸻

## 🗂️ Folder Structure

```text
app/
├── Api/                      # API layer (server communication)
│   ├── addresses.api.ts      # User addresses CRUD operations
│   ├── changePassword.api.ts # Change password API integration
│   ├── forgotPassword.api.ts # Forgot & reset password flow
│   ├── products.api.ts       # Products fetching and details
│   ├── cart.api.ts           # Cart operations (add, remove, update)
│   └── orders.api.ts         # Orders and checkout requests
│
├── (auth)/                   # Authentication-related routes
│   ├── login/                # User login page
│   ├── register/             # User registration page
│   ├── forgot-password/      # Password reset flow
│   └── change-password/      # Protected change password page
│
├── (shop)/                   # Main shopping experience
│   ├── Products/             # Products listing and details
│   ├── Categories/           # Product categories
│   ├── brands/               # Brands listing
│   ├── Cart/                 # Shopping cart page
│   ├── checkout/             # Checkout process
│   ├── orders/               # User orders history
│   └── Favorite/             # Wishlist / favorites
│
├── components/               # Reusable UI components
│   ├── navbar/               # Navigation bar
│   ├── footer/               # Footer layout
│   ├── product-card/         # Product card component
│   ├── loaders/              # Loading and skeleton components
│   └── ui/                   # shadcn/ui shared components
│
├── schema/                   # Zod validation schemas
│   ├── login.schema.ts       # Login form validation
│   ├── register.schema.ts    # Registration form validation
│   └── password.schema.ts    # Password-related validation
│
├── lib/                      # Shared utilities and helpers
│   ├── auth.ts               # Authentication helpers
│   ├── utils.ts              # General utility functions
│   └── constants.ts          # App-wide constants
│
├── globals.css               # Global Tailwind and app styles
├── layout.tsx                # Root application layout
└── page.tsx                  # Home page

📌 Structure Highlights
	•	Route Groups keep URLs clean without affecting routing.
	•	API layer is fully separated for maintainability.
	•	Reusable components improve consistency and scalability.
	•	Centralized schemas ensure reliable form validation.
	•	Clear separation between authentication and shopping logic.
````markdown

## Table of Contents

- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Quick Start

Prerequisites
- Node.js 18 or newer
- pnpm (recommended) or npm / yarn
- A database (e.g., PostgreSQL) and credentials for auth/storage if needed

Local setup
1. Clone the repo:
   - git clone <repo-url>
   - cd e-commerce
2. Install dependencies:
   - pnpm install
3. Copy environment example and fill in required variables:
   - cp .env.example .env.local
   - (Edit .env.local as described below)
4. Run locally:
   - pnpm dev
5. Build & start (production):
   - pnpm build
   - pnpm start

## Environment Variables

Create a .env.local with the variables your environment needs. Example keys commonly required by this project:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Email (for password reset flows)
SMTP_HOST=smtp.mailprovider.com
SMTP_PORT=587
SMTP_USER=you@example.com
SMTP_PASSWORD=super_secret_password

# Optional / third-party
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

## Scripts

Common npm/pnpm scripts used in this project:

- pnpm dev — start development server
- pnpm build — compile production build
- pnpm start — start production server
- pnpm lint — run linters
- pnpm test — run tests (if present)
- pnpm format — run code formatter (if configured)

## Deployment

Recommended: Vercel (used for the live demo)
- Connect repository in Vercel
- Set the environment variables in the Vercel dashboard
- Set Root to the project directory (if monorepo) and use Node 18+
- Deploy; automatic builds will run on push to main (or your production branch)

## Contributing

Contributions are welcome.
- Open issues for bugs or feature requests
- Fork → branch → PR with descriptive title and summary
- Run linters/tests before submitting (pnpm lint, pnpm test)
- Keep commits small and focused

## License

This project is provided under the MIT license. Replace with your license of choice if different.

## Acknowledgements

Built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, React Hook Form, Zod, NextAuth.js, and Sonner. See the repo for more details.