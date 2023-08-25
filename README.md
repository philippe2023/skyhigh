This is the TechLabs Düsseldorf Summer 2023 Project by group 7 built with
* [Next.js](https://nextjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [next-auth](https://next-auth.js.org/)
* [Auth0](https://auth0.com/)
* [daisyUI](https://daisyui.com/)

## Getting Started

1. Install dependencies with `npm install`
2. Set environment variables for Auth0 and next-auth in `.env.local` (see `.env.example`). Also set Allowed Callback URLs 'http://localhost:3000/api/auth/callback/auth0' and Allowed Logout URLs 'http://localhost:3000' in Auth0 dashboard. Please note that the example users from the seed file are not available in your Auth0 tenant. You have to create them manually in the Auth0 dashboard or use the normal signup flow.
3. Create and seed SQLite database with `sqlite3 skyhigh_dev.sqlite < create_and_seed_tables.sql`
4. Start the development server with `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Fly.io

This repository contains a `fly.toml` and a `Dockerfile` for easy deployment on [Fly.io](https://fly.io/). The fly commands have to be run from the root directory of the repository.

Make sure to adjust the `NEXTAUTH_URL` and `AUTH0_ISSUER` environment variables in the `Dockerfile` as well as creating the secrets for `AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, NEXTAUTH_SECRET` in your Fly.io dashboard. Also set the Allowed Callback URLs and Allowed Logout URLs in the Auth0 dashboard to 'https://your-app-name.fly.dev/api/auth/callback/auth0' and 'https://your-app-name.fly.dev' respectively.
Then run `flyctl deploy` to deploy the app.

After successful deployment, you have to manually copy the sqlite database to the Fly.io volume, that is created during deployment. For that run `flyctl ssh sftp shell` and from there `put skyhigh_dev.sqlite /data/skyhigh.sqlite` to copy the database to the volume.