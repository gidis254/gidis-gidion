# Gidis Kitchen Store

Full-featured Next.js kitchen equipment shop: catalog, product pages, **header search** (multi-word matches on name, description, category, slug), cart, user accounts, reviews, and Stripe Checkout. **All prices are Kenyan shillings (KES)** stored as whole numbers in the database. UI uses a neutral slate / zinc base with sky accents (minimal green).

## Stack

- **Next.js 16** (App Router) + TypeScript + Tailwind CSS v4  
- **Prisma 5** + **SQLite** (`prisma/dev.db`) — swap `DATABASE_URL` for PostgreSQL in production  
- **Auth.js (NextAuth v5)** — email + password (credentials)  
- **Stripe** — Checkout Sessions + webhook to mark orders paid and clear the cart  

## Setup

```powershell
cd gidis-kitchen-store
npm install
copy .env.example .env
# Edit .env: set AUTH_SECRET / NEXTAUTH_SECRET (long random string), Stripe keys for real payments
npx prisma db push
npx tsx prisma/seed.ts
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | `file:./dev.db` for SQLite |
| `AUTH_SECRET` / `NEXTAUTH_SECRET` | Session signing (use `openssl rand -base64 32`) |
| `NEXTAUTH_URL` | App URL, e.g. `http://localhost:3000` |
| `STRIPE_SECRET_KEY` | Stripe secret (`sk_test_...`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Optional for future Elements |
| `STRIPE_WEBHOOK_SECRET` | From Stripe Dashboard or `stripe listen` |

### Stripe

1. Create a [Stripe](https://stripe.com) account and get test API keys.  
2. Put `STRIPE_SECRET_KEY` in `.env`.  
3. For local webhooks, run:

   ```powershell
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

   Paste the signing secret as `STRIPE_WEBHOOK_SECRET`.  
4. **Checkout requires a signed-in user.** Guests can add to cart; sign in (or register) before **Pay with Stripe**.  
5. Checkout uses **Stripe** with **`currency: kes`**. `unit_amount` is the price in **whole shillings** (Stripe treats KES as zero-decimal). If Stripe returns an amount error, adjust `unit_amount` in `src/app/api/checkout/route.ts` per [Stripe’s KES rules](https://stripe.com/docs/currencies).

### Search

The header search submits to **`/search?q=...`**. Every word must match somewhere in the product **name**, **description**, **category**, or **slug** (logical AND between words, OR within each word).

## Scripts

- `npm run dev` — development server  
- `npm run build` — production build (runs `prisma generate`)  
- `npm run db:push` — sync schema to DB  
- `npm run db:seed` — seed demo products  
- `npm run db:studio` — Prisma Studio  

## Features

- **Products** — Listing with search (`/products?q=`) and category chips  
- **Product detail** — Images, price (USD, cents in DB), stock, add to cart  
- **Cart** — Guest cart (cookie `gidis_guest_id`) merges on login  
- **Auth** — Register → redirect to login; sign in merges guest cart  
- **Reviews** — Signed-in users can submit/update a review per product  
- **Stripe** — `POST /api/checkout` creates order + Checkout Session; webhook sets order `paid` and clears cart  

## Legacy static site

The earlier static demo remains in `../kitchen-equipment-store/`. This app is the full store.
