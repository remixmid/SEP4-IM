# Deployment Guide

The frontend is a static Vite application. It can be deployed either as generated static files or as an Nginx Docker container.

## Environment requirements

- Node.js 20
- npm 10 or newer
- Docker Desktop or Docker Engine for container deployment

## Local deployment

```bash
cd sep4-react-app
npm ci
npm run build
npm run preview
```

The production files are generated in `sep4-react-app/dist`.

## Docker deployment

From the repository root:

```bash
docker compose up --build -d
```

Open `http://localhost:5173`.

Stop the application:

```bash
docker compose down
```

## Deploying to a Linux server

```bash
git clone <repository-url>
cd Smart-Greenhouse-IM
docker compose up --build -d
```

Allow inbound TCP traffic on the selected public port. For HTTPS, place the container behind a reverse proxy such as Nginx, Traefik or Caddy.

## Deploying static files

```bash
cd sep4-react-app
npm ci
npm run build
```

Upload the contents of `dist` to a static host. The application uses `HashRouter`, so it does not require server-side route fallback configuration.

## CI/CD deployment model

The CI workflow runs linting, tests and the production build. The CD workflow builds a versioned Docker image and pushes it to GitHub Container Registry.
