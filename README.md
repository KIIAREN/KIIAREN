# KIIAREN-Release - Self-Hosted Open Source Edition

![CodeRabbit Reviews](https://img.shields.io/coderabbit/prs/github/KIIAREN/KIIAREN-Release?utm_source=oss&utm_medium=github&utm_campaign=KIIAREN%2FKIIAREN-Release&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

**KIIAREN-Release** is the open-source, self-hosted edition of KIIAREN - a real-time collaboration platform with workspaces, channels, direct messages, docs, and whiteboards.

> **Note:** This repository is for self-hosted deployments with flexible backend options. For the managed SaaS version at [kiiaren.com](https://kiiaren.com), see the private KIIAREN-SAAS repository.

## Deployment Options

KIIAREN-Release offers flexible backend options:

| Database | Realtime | Search | Status | Best For |
|----------|----------|--------|--------|----------|
| **Convex** | Convex | Convex Search | ✅ Production | Quick start, managed infrastructure |
| **Postgres** | ws-redis | pg_fts | 🚧 Planned | Common self-host |
| **Postgres** | ws-nats | Meilisearch | 🚧 Planned | Enterprise self-host |
| **SQLite** | none | none | 🚧 Planned | Development, simple deployments |

**Default: Convex** - A managed backend service that handles real-time subscriptions, authentication, and storage. This is the recommended deployment path for most users.

---

## Self-Host Reality Check

Before self-hosting, understand what you're taking on:

**You are responsible for:**

- Server provisioning and maintenance
- Database backups and disaster recovery
- Security patches and vulnerability management
- TLS certificates and network security
- Scaling decisions and load balancing
- Uptime and incident response

**You will NOT have:**

- Indexed full-text search (basic ILIKE only)
- Centralized key management (KMS)
- End-to-end encrypted sync
- Audit logging / eDiscovery
- Enterprise SSO (SAML/OIDC)
- AI features with persistent memory
- Push notification infrastructure
- SLA guarantees
- Professional support

**Requirements:**

- PostgreSQL 14+
- Node.js 20+
- WebSocket server infrastructure
- S3-compatible storage or local disk
- DevOps expertise

See [docs/product/editioning.md](docs/product/editioning.md) for detailed feature boundaries.

---

## Project Structure

```
KIIAREN/
├── apps/
│   └── web/                 # Next.js application
│       ├── src/             # Source code (app, components, features, hooks, lib)
│       ├── public/          # Static assets
│       ├── package.json     # Web app dependencies
│       ├── tsconfig.json    # TypeScript config
│       ├── next.config.mjs  # Next.js config
│       └── ...config files
├── packages/
│   ├── core/                # Backend provider abstraction layer
│   │   └── src/
│   │       ├── providers/   # Provider interfaces & implementations
│   │       └── managed/     # Managed-tier feature definitions
│   └── shared/              # Shared types and schemas
│       └── src/
│           ├── types/       # Convex type re-exports
│           └── schemas/     # Zod validation schemas
├── convex/                  # Convex backend (at root - standard practice)
│   ├── schema.ts
│   ├── channels.ts
│   ├── messages.ts
│   ├── workspaces.ts
│   └── ...other functions
├── package.json             # Monorepo root with workspaces
├── tsconfig.json            # Root TypeScript config
└── .env.example             # Environment variables template
```

## Setup and Development

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0

### Installation

```bash
# Install all workspace dependencies
npm install

# Or from root
npm install
```

### Environment Setup

1. Copy `.env.example` to `.env` in the project root
2. Fill in your Convex deployment details
3. Set up OAuth credentials (Google, GitHub) if needed

**Note:** All apps use a single `.env` file at the monorepo root. See [docs/setup/env-mapping.md](docs/setup/env-mapping.md) for detailed variable documentation.

### Development

```bash
# Run Next.js dev server
npm run dev

# Or explicitly
npm run dev --workspace=@kiiaren/web

# Or from apps/web directory
cd apps/web && npm run dev
```

### Building

```bash
# Build all workspaces
npm run build

# Build web app only
npm run build --workspace=@kiiaren/web
```

### Linting and Formatting

```bash
# Lint all packages
npm run lint

# Fix lint issues
npm run lint:fix

# Format code
npm run format:fix
```

## Convex Setup

The Convex backend remains at the root level, which is the standard monorepo practice for Convex projects.

```bash
# Run Convex dev (from root)
npx convex dev

# Or
bunx convex dev
```

## Architecture

See [docs/architecture/system-design.md](docs/architecture/system-design.md) for detailed system design.

### Provider Abstraction

KIIAREN uses a provider abstraction layer (`@kiiaren/core`) that decouples the web app from any specific backend:

```
apps/web → @kiiaren/core (interface) → ConvexProvider | SelfHostProvider
```

This enables:

- Managed deployments via Convex (default)
- Self-hosted deployments via PostgreSQL + WebSocket (skeleton)
- Future backend providers

### Core Principles

- **Event-centric**: All state changes flow through typed domain events
- **No mock data**: All UI uses real backend queries/mutations
- **RBAC**: Workspace membership, admin roles, message ownership verified
- **Extension hooks**: OSS emits events, managed tier can process them

### Features

| Feature | OSS | Managed |
|---------|-----|---------|
| Workspaces, Channels, DMs | Yes | Yes |
| Rich text messages, threads | Yes | Yes |
| File uploads, reactions | Yes | Yes |
| Docs (Notion-like) | Yes | Yes |
| Boards (Excalidraw) | Yes | Yes |
| Basic auth (email, OAuth) | Yes | Yes |
| Domain verification (DNS TXT) | Yes | Yes |
| Admin invite links | Yes | Yes |
| Indexed full-text search | No | Yes |
| KMS / key rotation | No | Yes |
| Audit logs / eDiscovery | No | Yes |
| Enterprise SSO | No | Yes |
| AI agents | No | Yes |
| SLA | No | Yes |

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Convex (serverless backend)
- **Auth**: Convex Auth with OAuth  
- **UI**: Tailwind CSS, Shadcn UI, Radix UI
- **State**: Jotai, Nuqs
- **Editor**: Quill

## Environment Variables

**Single `.env` file** at monorepo root controls all apps (web, convex, docs, whiteboard).

### Provider Selection

```bash
# Backend provider (default: convex)
NEXT_PUBLIC_KIIAREN_PROVIDER=convex  # or "self-host" (not implemented)
```

### Required Variables

- `CONVEX_DEPLOYMENT` - Your Convex deployment (from dashboard)
- `NEXT_PUBLIC_CONVEX_URL` - Public Convex URL

### Optional Variables

- `AUTH_GOOGLE_CLIENT_ID` / `AUTH_GOOGLE_CLIENT_SECRET` - Google OAuth
- `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` - GitHub OAuth
- `SITE_URL` - Application URL (for auth callbacks)

For detailed variable mapping and validation, see [docs/setup/env-mapping.md](docs/setup/env-mapping.md).

## Documentation

- [Architecture](docs/architecture/system-design.md) - System design and provider interfaces
- [Editioning](docs/product/editioning.md) - OSS vs Managed feature boundaries
- [Convex Setup](docs/setup/convex.md) - Convex backend configuration
- [Environment Variables](docs/setup/env-mapping.md) - Configuration reference
- [Migration Guide](docs/setup/migration.md) - Migration instructions
- [License Strategy](docs/product/license-strategy.md) - Licensing philosophy

## License

MIT License - see LICENSE file for details.

See [docs/product/license-strategy.md](docs/product/license-strategy.md) for licensing philosophy.

## Original Author

Sanidhya Kumar Verma - [GitHub](https://github.com/sanidhyy)

## Copyright

Copyright © 2026 KIIAREN

---

## Monorepo Refactor

This project was refactored into a monorepo structure with provider abstraction to support both managed and self-hosted deployments while maintaining feature compatibility.
