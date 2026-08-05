# Smart Greenhouse Interactive Media

## Stage 2: Authentication

The application now includes mock registration, login, session restoration, protected routes and automated authentication tests.

Demo account:

```text
demo@greenhouse.local
demo123
```

## Run locally

```bash
cd sep4-react-app
npm ci
npm run dev
```

## Test

```bash
npm run lint
npm run test
npm run build
```

## Docker deployment

```bash
docker compose up --build -d
```

Open `http://localhost:5173`. Full deployment instructions are in `docs/DEPLOYMENT.md`.
