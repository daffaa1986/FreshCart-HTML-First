# FreshCart — HTML First + Selective React

Starter architecture for the FreshCart grocery e-commerce project, based on the supplied Google Stitch **Home Landing Page** and **Product Listing / Katalog Sayur Segar** designs.

## Project Overview

FreshCart is a grocery e-commerce storefront built with an **HTML-first** approach: each customer/admin page is a standalone HTML entry point, with shared JavaScript ES modules and selectively mounted React islands for interactive areas. A FastAPI backend scaffold and PostgreSQL wiring via Docker Compose are included, but real backend persistence and authentication are **not yet implemented**.

## Features and Current Implementation Status

### Implemented (functional in the browser)
- Multi-page HTML storefront (Home, Product Listing, Product Detail, Cart, Checkout, Order Confirmation, Order History, Order Tracking, Wishlist, Recipes, Account pages).
- Shared header/footer partials loaded by `src/js/shared/layout.js`.
- Shared product catalog data in `src/js/data/products.js` (sample data).
- Cart and wishlist stored in `localStorage` via shared stores (`cart-store.js`, `wishlist-store.js`).
- React-powered islands: Home flash-sale products, product catalog (filtering, sorting, pagination), Cart, Checkout, Wishlist, Recipes, Order History/Confirmation.
- Currency formatting, toast notifications, countdown timer, responsive Tailwind styling.
- FastAPI starter exposing `/health` endpoint.
- Docker Compose definition for FastAPI + PostgreSQL (not yet run for FreshCart).

### Simulated / Demo-only
- Checkout UI does not process payment or create a server order.
- Cart persistence uses browser `localStorage`, not a user account or server.
- Product records are sample data; no backend/database connection exists yet.
- Marketing metrics, guarantees, and certifications are illustrative and must be verified before publication.
- Account, login, register, and admin pages are HTML placeholders.

### Planned (not implemented)
- Authentication and user sessions.
- PostgreSQL schema and real data persistence.
- Backend CRUD for products, orders, customers.
- Payment gateway integration.
- Production deployment / CI/CD.
- GitHub Actions workflows.

## Technology Stack

- **Frontend:** HTML, Tailwind CSS, JavaScript ES modules, React 19, Vite 6 (multi-page build).
- **Backend:** Python, FastAPI, Uvicorn, SQLAlchemy, psycopg, Pydantic Settings (scaffold only).
- **Database:** PostgreSQL 16 (via Docker Compose; not yet started for FreshCart).
- **Tooling:** Node.js, npm, Docker Desktop, Docker Compose.

## Project Directory Tree

```
FreshCart-HTML-First/
├── backend/
│   ├── app/
│   │   ├── core/ db/ models/ routers/ schemas/ services/   (README placeholders)
│   │   └── main.py            # FastAPI starter (/health only)
│   ├── tests/                 # README placeholder
│   ├── .dockerignore
│   ├── Dockerfile
│   └── requirements.txt
├── database/
│   ├── migrations/            # README placeholder
│   ├── seeds/                 # README placeholder
│   └── init.sql               # Placeholder schema
├── docs/                      # Reports, audits, design references
│   ├── design-system/
│   ├── screenshots/
│   └── stitch/
├── frontend/
│   ├── pages/                 # Standalone HTML entry points (incl. admin/)
│   ├── public/                # Static assets, partials, images
│   ├── src/
│   │   ├── css/               # Tailwind + design tokens
│   │   ├── entries/           # Vite entry points
│   │   ├── js/                # Shared data, stores, utils
│   │   └── react/             # React islands (components, hooks, mounts)
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.cjs
│   └── vite.config.js
├── .env.example               # Environment template (safe to commit)
├── .env                       # Local secrets (gitignored, never commit)
├── .gitignore
├── AGENTS.md                  # Agent instructions
├── docker-compose.yml
├── README.md
└── vercel.json
```

Generated directories (`.venv/`, `node_modules/`, `dist/`, `__pycache__/`) are gitignored and not shown.

## Run Locally (Frontend)

Requirements: Node.js 20.19+ or 22.12+ recommended for current Vite tooling.

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://127.0.0.1:5173`.

## Build

```bash
cd frontend
npm run build
npm run preview
```

## Backend Virtual Environment Setup

```bash
cd backend
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The FastAPI starter currently exposes only `/health`; it does not yet read/write PostgreSQL.

## Docker and PostgreSQL Setup

`docker-compose.yml` defines FastAPI and PostgreSQL containers, but the FastAPI starter currently exposes only `/health`.

1. Copy the environment template and set a strong password:

   ```bash
   cp .env.example .env
   # then edit .env and set POSTGRES_PASSWORD to a strong, unique value
   ```

2. Validate Compose configuration:

   ```bash
   docker compose config --quiet
   ```

3. Start only the database (when ready):

   ```bash
   docker compose up -d db
   ```

`POSTGRES_PASSWORD` is required: Compose uses a fail-closed expression and will not start if it is missing or empty. Do not use the `change-me-locally` placeholder for a real database.

## Environment Variable Configuration

Variables (see `.env.example`):

- `VITE_API_BASE_URL` — frontend API base URL (used when backend integration is implemented).
- `POSTGRES_DB` — database name (default `freshcart`).
- `POSTGRES_USER` — database user (default `freshcart`).
- `POSTGRES_PASSWORD` — database password (required, no default).

Never commit `.env`. Only `.env.example` is safe to commit.

## Pages Included

- `/index.html` — Home Landing Page derived from Stitch.
- `/pages/products.html` — Product Listing derived from Stitch; filtering, sorting and pagination are React-powered sample interactions.
- `/pages/cart.html` — Cart demo; shared cart is stored in localStorage.
- `/pages/checkout.html` — Checkout UI demo; does not process payment or create a server order.
- Additional account, order, wishlist and admin pages are HTML placeholders for later development.

## Current Limitations

- Product records are sample data; no backend/database connection exists yet.
- Cart persistence uses browser localStorage, not a user account or server.
- Checkout is a demonstration only. No payment gateway is connected.
- Product images still use the image URLs supplied by Stitch and therefore need internet access. Replacements should be verified.
- Marketing metrics, guarantees, and certifications are illustrative and must be verified before publication.
- The Vite/Tailwind/React build should be run locally (`npm install && npm run build`) to verify on your machine.
- Authentication, real payment integration, database persistence, and production deployment are **not** implemented.

## Documentation

See `docs/README.md` for a full index of reports, audits, and design references. Key documents:

- `docs/README.md` — documentation index.
- `docs/architecture.md` — architecture notes.
- `docs/OPENCODE_GUIDE.md` — OpenCode usage guide.
- `docs/github-pre-push-readiness-report.md` — GitHub pre-push audit.
- `docs/phase-7b-2-2-docker-startup-report.md` — Docker startup audit.
- `docs/design-system/` — design system references.
- `docs/stitch/` — original Stitch references.

## OpenCode

See `docs/OPENCODE_GUIDE.md`. OpenCode should read the root `AGENTS.md` first and must preserve the HTML-first architecture.
