# Banking Company

A modern, full-stack website for a fictional banking company. Built as a foundation for component-driven development with integrated backend data, isolated UI stories, and Netlify deployment.

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, React 19)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Database / ORM:** [Prisma](https://www.prisma.io/) + SQLite (local) / PostgreSQL (production)
- **UI Workshop:** [Storybook](https://storybook.js.org/)
- **Testing:** [Vitest](https://vitest.dev/) + Playwright (Storybook test runner)
- **Deployment:** [Netlify](https://www.netlify.com/)

## Local Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Arghajit47/banking-company.git
   cd banking-company
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the example environment file and adjust values if needed:

   ```bash
   cp .env.example .env.local
   ```

   The default SQLite path works out of the box for local development.

4. Generate the Prisma client and set up the local database:

   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Required | DEV value | PROD value | Notes |
|----------|----------|-----------|------------|-------|
| `DATABASE_URL` | Yes | `file:./prisma/dev.db` | PostgreSQL URL from Netlify | SQLite locally; PostgreSQL on Netlify. |
| `NEXT_PUBLIC_APP_ENV` | No | `development` | `production` | Public marker for environment checks. |
| `NEXT_PUBLIC_API_BASE` | No | `/api` | `/api` | Optional public API base path. |

- Copy `.env.example` to `.env.local` for local values.
- **Never commit `.env.local` or real secrets.**
- On Netlify, add `DATABASE_URL` under Site configuration > Environment variables.

## Available NPM Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `next dev` | Start the Next.js dev server. |
| `build` | `next build` | Create a production build. |
| `start` | `next start` | Start the production server. |
| `lint` | `eslint` | Run ESLint across the project. |
| `test` | `vitest run` | Run the Vitest suite. |
| `storybook` | `storybook dev -p 6006` | Run the Storybook dev server. |
| `build-storybook` | `storybook build` | Build Storybook for static hosting. |
| `db:generate` | `prisma generate` | Regenerate the Prisma client. |
| `db:push` | `prisma db push` | Push schema changes to the local DB. |
| `db:migrate` | `prisma migrate dev` | Create and apply a migration. |
| `db:seed` | `tsx prisma/seed.ts` | Seed the database with sample data. |
| `db:reset` | `prisma migrate reset` | Reset the database and re-run migrations. |

## Project Structure

```text
banking-company/
├── .storybook/          # Storybook configuration
├── prisma/
│   ├── schema.prisma    # Prisma schema
│   └── seed.ts          # Seed script
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router pages and API routes
│   ├── components/      # React components and stories
│   ├── lib/             # Shared utilities (env, prisma singleton)
│   └── stories/         # Storybook sample stories (auto-generated)
├── .env.example         # Committed environment template
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## Deployment Notes for Netlify

1. Connect the GitHub repository to a Netlify site.
2. Set the build command to:

   ```bash
   npm run build
   ```

3. Set the publish directory to:

   ```text
   .next
   ```

4. Add the production `DATABASE_URL` environment variable in Netlify.
5. On Netlify Functions, the Prisma client and SQLite paths are handled by the environment loader in `src/lib/env.ts`.

## Branch & Pull Request Workflow

- All changes are developed on feature branches.
- Branch naming convention: `<JIRA_KEY>-<PAGE>-<SECTION>-<SCOPE>`.
- Open a pull request to `main` and request review before merging.
- Never push directly to `main`.

## License

MIT
