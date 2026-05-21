# GigaSend

GigaSend is now configured as an Astro app targeting Cloudflare Pages, with the existing React interface preserved as hydrated islands.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:4321`.

## Build

```bash
npm run build
npm run preview
```

The Cloudflare Pages build output is `dist`.

## Cloudflare Pages

Use these settings in Cloudflare Pages:

- Framework preset: Astro
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `20`

Required environment variables are listed in `env.example`.

## Cloudflare D1

The app uses a D1 binding named `DB`. Create the database, copy the database id into `wrangler.toml`, then apply migrations:

```bash
npx wrangler d1 create gigasend
npx wrangler d1 migrations apply gigasend --local
npx wrangler d1 migrations apply gigasend --remote
```

The initial schema lives in `migrations/0001_initial.sql`.

Stripe paid plan ids are stored in the `stripe_plans` table. Seed that table after creating Stripe plans so checkout can map `starter`, `pro`, `studio`, and `agency` to Stripe plan ids.
