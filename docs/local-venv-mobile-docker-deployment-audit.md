# FreshCart — Phase 7 Preparation: Local Dev, Venv & Docker Environment Audit

**Project:** `D:\projectweb\FreshCart-HTML-First`
**Mode:** Read-only audit. No production code changes.
**Date:** 2026-11-21
**Prepared by:** Kilo CLI

---

## 1. Current Environment

### System
| Item | Value |
|------|-------|
| OS | Windows (PowerShell 5.1) |
| Local IPv4 | 192.168.1.11 |
| Python (system) | 3.13.5 |
| Docker | 29.8.2, build 7fc2dff |
| Docker Compose | v5.5.1 |
| Node.js / Vite | Installed in `frontend/node_modules` |

### Project Layout
```
D:\projectweb\FreshCart-HTML-First\
├── backend/
│   ├── app/
│   │   ├── main.py          (only /health endpoint)
│   │   ├── core/            (README.md placeholder)
│   │   ├── db/              (README.md placeholder)
│   │   ├── models/          (README.md placeholder)
│   │   ├── routers/         (README.md placeholder)
│   │   ├── schemas/         (README.md placeholder)
│   │   └── services/        (README.md placeholder)
│   ├── .venv/               (Python 3.13.0, deps installed)
│   ├── Dockerfile
│   ├── requirements.txt
│   └── tests/               (README.md placeholder)
├── database/
│   ├── init.sql             (CREATE SCHEMA IF NOT EXISTS freshcart — placeholder)
│   ├── migrations/          (README.md only)
│   └── seeds/               (README.md only)
├── frontend/
│   ├── node_modules/        (installed, vite binary present)
│   ├── index.html
│   ├── pages/               (13 HTML entry points)
│   ├── public/partials/     (header.html, footer.html)
│   ├── src/js/              (cart-store, layout, wishlist-store, etc.)
│   ├── src/react/           (React islands for cart, checkout, catalog, flash-sale)
│   ├── vite.config.js       (host 127.0.0.1, port 5173, strictPort)
│   ├── tailwind.config.cjs
│   ├── postcss.config.cjs
│   └── package.json
├── docs/                    (Stitch originals, design-system, QA reports)
├── docker-compose.yml       (api:8000, db:5432, postgres:16-alpine)
├── .env.example             (VITE_API_BASE_URL, POSTGRES_*)
├── .gitignore
├── AGENTS.md
├── README.md
└── vercel.json
```

---

## 2. Python Virtual Environment (Task 1)

### Venv location and status
- **Path:** `D:\projectweb\FreshCart-HTML-First\backend\.venv`
- **Python version in venv:** 3.13.0
- **Status:** Exists, fully populated with all dependencies from `requirements.txt`

### Installed packages (relevant)
| Package | Version | Purpose |
|---------|---------|---------|
| fastapi | 0.165.0 | Web framework |
| uvicorn | 0.54.0 | ASGI server |
| SQLAlchemy | 2.1.9 | ORM |
| psycopg / psycopg-binary | 3.3.9 | PostgreSQL driver |
| pydantic-settings | 2.16.3 | Settings management |
| python-dotenv | 1.2.4 | .env loading |
| watchfiles | 1.3.0 | Auto-reload |

### Activation command (Windows PowerShell)
```powershell
cd D:\projectweb\FreshCart-HTML-First\backend
.\.venv\Scripts\Activate.ps1
```

If PowerShell execution policy blocks activation:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
```

### Required backend dependencies
All dependencies listed in `backend/requirements.txt` are already installed in the venv:
- `fastapi>=0.115,<1`
- `uvicorn[standard]>=0.34,<1`
- `SQLAlchemy>=2.0,<3`
- `psycopg[binary]>=3.2,<4`
- `pydantic-settings>=2.7,<3`

### Correct FastAPI/Uvicorn command
```powershell
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### Can the current backend start?
**Yes.** The venv has all dependencies. `backend/app/main.py` exposes only `GET /health`, which returns:
```json
{"status": "healthy", "service": "freshcart-api", "note": "Starter endpoint; database is not connected yet."}
```
However, **no authentication, user model, order API, or database integration exists yet.** All backend subdirectories (`core`, `db`, `models`, `routers`, `schemas`, `services`) contain only `README.md` placeholders.

---

## 3. Frontend Environment (Task 2)

### Configuration
| File | Key Setting | Value |
|------|-------------|-------|
| `frontend/vite.config.js` | `server.host` | `127.0.0.1` |
| `frontend/vite.config.js` | `server.port` | `5173` |
| `frontend/vite.config.js` | `server.strictPort` | `true` |
| `frontend/package.json` | `dev` script | `vite` |
| `.env.example` | `VITE_API_BASE_URL` | `http://localhost:8000` |

### Desktop and mobile URLs

**Desktop (laptop):**
- Frontend: `http://127.0.0.1:5173/` (or `http://localhost:5173/`)
- Backend health: `http://127.0.0.1:8000/health`
- Backend docs: `http://127.0.0.1:8000/docs`

**Physical mobile (same Wi-Fi):**
- Frontend: `http://192.168.1.11:5173/` (IP may change; verify with `ipconfig`)
- Backend health: `http://192.168.1.11:8000/health`

### Vite LAN access
`vite.config.js` currently binds to `127.0.0.1` only with `strictPort: true`. To access from a physical mobile device on the LAN, Vite must be started with `--host 0.0.0.0`:
```powershell
cd D:\projectweb\FreshCart-HTML-First\frontend
npm run dev -- --host 0.0.0.0
```
This prints both `Local:` and `Network:` URLs. The `Network:` URL uses the machine's LAN IP.

### Frontend API base URL configuration
**Not yet implemented.** The frontend does not currently read `VITE_API_BASE_URL` or make any API calls to the backend. `layout.js` uses relative paths (`/partials/header.html`) served by Vite. Cart, wishlist, and orders use `localStorage` only. Backend integration (API client, base URL, fetch calls) is Phase 7 work and does not exist yet.

---

## 4. LAN Connectivity (Task 3)

### Vite binding
- Current: `127.0.0.1:5173` (localhost only, not LAN accessible)
- Required for mobile: `--host 0.0.0.0` flag or `server.host: '0.0.0.0'` in `vite.config.js`

### FastAPI binding
- Dockerfile CMD: `--host 0.0.0.0 --port 8000` (LAN accessible when running in Docker or with this flag)
- Local uvicorn command should also use `--host 0.0.0.0` for mobile access

### Windows Firewall requirements
To access from a physical mobile device on the same Wi-Fi, inbound rules must allow:
- TCP port 5173 (Vite frontend)
- TCP port 8000 (FastAPI backend)

### CORS requirements
**Not yet applicable.** The frontend does not call the backend API. When Phase 7 implements frontend→backend API calls, CORS must be configured on the FastAPI side to allow the frontend origin (`http://192.168.1.11:5173` for LAN, `http://localhost:5173` for local). **Do not enable unrestricted CORS (`allow_origins=["*"]`) in production.**

### Mobile access requirements
1. Laptop and mobile on the same Wi-Fi network
2. Vite started with `--host 0.0.0.0`
3. FastAPI started with `--host 0.0.0.0`
4. Windows Firewall allows inbound on ports 5173 and 8000
5. Mobile browser uses the laptop's LAN IP (e.g., `http://192.168.1.11:5173/`)

### API URL configuration for physical mobile browsers
When backend integration is implemented, the frontend API client must use the LAN IP, not `localhost`:
- `VITE_API_BASE_URL=http://192.168.1.11:8000` (LAN IP, may change — verify with `ipconfig`)
- `localhost` will not work on a physical mobile device because it refers to the device itself

---

## 5. Docker Audit (Task 4)

### docker-compose.yml
| Service | Image/Build | Port | Environment | Depends On |
|---------|-------------|------|-------------|------------|
| `api` | `./backend` (Dockerfile) | 8000:8000 | POSTGRES_HOST=db, POSTGRES_PORT=5432, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD | db (service_healthy) |
| `db` | `postgres:16-alpine` | 5432:5432 | POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD | — |

### Port mappings
- `api`: host 8000 → container 8000 (FastAPI)
- `db`: host 5432 → container 5432 (PostgreSQL)

### Container networking
- `api` and `db` share a default Docker Compose network
- `api` references database as host `db` (Docker service name)
- `db` healthcheck: `pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}` every 5s, 10 retries

### Persistent volumes
- `freshcart_postgres_data` volume mounted to `/var/lib/postgresql/data`
- `./database/init.sql` mounted read-only to `/docker-entrypoint-initdb.d/01-init.sql`

### Environment variable handling
- `.env.example` provides defaults: `POSTGRES_DB=freshcart`, `POSTGRES_USER=freshcart`, `POSTGRES_PASSWORD=change-me-locally`
- docker-compose.yml uses `${VAR:-default}` fallback syntax
- `.env` does not exist yet (must be copied from `.env.example` before running Compose)

### .dockerignore
**Not found.** No `.dockerignore` exists in the project root. This means all files (including `node_modules`, `.venv`, `__pycache__`, `.env` if created) would be included in Docker build context unless addressed.

### Which services exist vs. placeholders
| Service | Status |
|---------|--------|
| `api` (FastAPI) | Placeholder — only `/health` endpoint; no DB connection, no routes |
| `db` (PostgreSQL) | Infrastructure ready — image `postgres:16-alpine`, but `init.sql` only creates empty `freshcart` schema; no tables, migrations, or seeds |

### Whether PostgreSQL is actually initialized
**Partially.** `database/init.sql` runs `CREATE SCHEMA IF NOT EXISTS freshcart;` only. No application tables (users, products, orders, cart, wishlist) exist. No migration files or seed data beyond README placeholders. PostgreSQL is ready to run but contains no FreshCart application schema.

---

## 6. GitHub Deployment Architecture (Task 5)

### Proposed repository structure
```
FreshCart-HTML-First/
├── .github/
│   └── workflows/
│       ├── ci.yml              (lint, typecheck, build, test)
│       └── deploy.yml          (build images, push to GHCR, deploy)
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app/
├── frontend/
│   ├── Dockerfile              (multi-stage: build with Vite, serve with Nginx)
│   ├── vite.config.js
│   └── package.json
├── database/
│   ├── init.sql                (full schema after Phase 7)
│   ├── migrations/
│   └── seeds/
├── docker-compose.yml
├── .env.example
├── .dockerignore
└── README.md
```

### GitHub Actions CI workflow (`ci.yml`)
1. Checkout code
2. Setup Node.js, run `npm ci` in `frontend/`, run `npm run build`
3. Setup Python, install `backend/requirements.txt`, run lint/typecheck
4. (Future) Run automated test suite once available
5. On push to `main`, build Docker images and push to GHCR

### Docker image build
- **Backend image:** `python:3.12-slim` base, install requirements, copy `app/`, run uvicorn on 0.0.0.0:8000
- **Frontend image:** Multi-stage — Node.js build stage produces static assets, Nginx stage serves them

### GHCR image publishing
- Images tagged with `ghcr.io/<owner>/freshcart-backend:<sha>` and `ghcr.io/<owner>/freshcart-frontend:<sha>`
- GitHub Actions authenticates with `GITHUB_TOKEN` and pushes on `main` branch or release tags

### VPS/cloud deployment
- VPS or cloud instance with Docker and Docker Compose installed
- `docker compose up -d --build` pulls images from GHCR or builds locally
- Persistent volume for PostgreSQL data
- `.env` file with production secrets (not committed to Git)

### HTTPS and domain requirements
- Domain name pointed to VPS IP
- Reverse proxy (Nginx, Traefik, or Cloudflare Tunnel) terminating TLS on port 443
- Certbot/Let's Encrypt or Cloudflare origin certificates
- Backend not exposed directly; only frontend (and optionally API subdomain) through reverse proxy

---

## 7. Backend Readiness (Task 5)

| Component | Status |
|-----------|--------|
| FastAPI app | Scaffold only — `/health` endpoint |
| Routers | None (`routers/` is README placeholder) |
| Models | None (`models/` is README placeholder) |
| Schemas | None (`schemas/` is README placeholder) |
| Services | None (`services/` is README placeholder) |
| Database connection | None — not connected to PostgreSQL |
| Authentication | Not implemented |
| Sessions | Not implemented |
| Order API | Not implemented |
| User API | Not implemented |

**Backend is not ready for production use.** Phase 7 must implement the full API layer before frontend integration.

---

## 8. Database Readiness (Task 5)

| Component | Status |
|-----------|--------|
| PostgreSQL image | `postgres:16-alpine` (ready in docker-compose) |
| Schema | Only `CREATE SCHEMA IF NOT EXISTS freshcart` in `init.sql` |
| Tables | None (users, products, orders, cart, wishlist) |
| Migrations | None (`migrations/` is README placeholder) |
| Seeds | None (`seeds/` is README placeholder) |
| Persistent volume | `freshcart_postgres_data` defined in compose |

**Database is infrastructure-ready but schema-empty.** No application tables exist.

---

## 9. Security Concerns

| Concern | Risk | Mitigation |
|---------|------|------------|
| `.env.example` contains default password `change-me-locally` | Medium | Replace with strong random password in `.env`; never commit `.env` to Git |
| No `.dockerignore` | Medium | Create `.dockerignore` to exclude `node_modules`, `.venv`, `__pycache__`, `.env` |
| Unrestricted CORS (future) | High | Configure specific origins only; never `allow_origins=["*"]` in production |
| Backend bound to `0.0.0.0` | Medium | Only for local development; production should bind through reverse proxy |
| Vite `--host 0.0.0.0` exposes frontend on LAN | Low | Acceptable for local mobile testing; do not expose publicly without firewall |
| No authentication/session | High | Phase 7 must implement auth before any user data is stored |
| localStorage cart/wishlist/orders | Low | Client-only; no server validation. Phase 7 must migrate to server-backed storage |

---

## 10. Recommended Implementation Phases

| Phase | Focus | Prerequisite |
|-------|-------|--------------|
| 1 | Local Vite dev + mobile LAN testing | Current state — ready now |
| 2 | Python venv + FastAPI local run | Current state — ready now |
| 3 | PostgreSQL via Docker Compose | Current state — `docker compose up -d db` |
| 4 | FastAPI → PostgreSQL connection | Phase 7 backend implementation |
| 5 | Frontend → API integration | Phase 7 frontend + backend |
| 6 | Docker Compose full stack | After local integration stable |
| 7 | GitHub Actions CI | After test suite exists |
| 8 | GHCR + VPS/cloud deployment | After production readiness |
| 9 | Monitoring, backup, security | Final production hardening |

---

## 11. Exact Commands for Desktop and Mobile Development

### Terminal 1 — Frontend (desktop)
```powershell
cd D:\projectweb\FreshCart-HTML-First\frontend
npm run dev -- --host 0.0.0.0
```
Access: `http://127.0.0.1:5173/` (desktop) or `http://192.168.1.11:5173/` (mobile LAN)

### Terminal 2 — Backend (desktop)
```powershell
cd D:\projectweb\FreshCart-HTML-First\backend
.\.venv\Scripts\Activate.ps1
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
Access: `http://127.0.0.1:8000/health` (desktop) or `http://192.168.1.11:8000/health` (mobile LAN)

### Terminal 3 — PostgreSQL via Docker
```powershell
cd D:\projectweb\FreshCart-HTML-First
cp .env.example .env
# Edit .env to set a strong POSTGRES_PASSWORD
docker compose up -d db
```

### Mobile verification
1. Connect phone to same Wi-Fi as laptop
2. Run `ipconfig` on laptop to confirm IPv4 (currently 192.168.1.11)
3. Open phone browser: `http://192.168.1.11:5173/`
4. Open phone browser: `http://192.168.1.11:8000/health`
5. If unreachable, check Windows Defender Firewall inbound rules for ports 5173 and 8000

---

## Confirmation

No production source code, data, or configuration files were modified. No packages were installed or uninstalled. No virtual environments were deleted or recreated. No `docker compose down -v` was executed. No Docker volumes or database data were removed. No secrets or `.env` values were exposed. No deployment or push to GitHub was performed.
