# Smart Greenhouse Interactive Media

A React and Vite application that simulates the Interactive Media component of a Smart Greenhouse platform.

The project intentionally does not include real IoT hardware or a trained ML model. Both external components are represented by asynchronous mock services with stable application contracts.

## Included features

- Mock registration and JWT-style authentication
- Greenhouse zone management with crop types
- Simulated current sensor readings
- Generated 24-hour measurement history
- Recharts data visualization and daily statistics
- Rule-based crop recommendations presented as a mock ML service
- Suitable and Adjust feedback handling
- Automation history derived from readings and crop target ranges
- LocalStorage persistence
- Vitest tests in every development stage
- Docker and Nginx production image
- GitHub Actions CI and container publishing

## Quick start

```bash
cd sep4-react-app
npm ci
npm run dev
```

Demo credentials:

```text
demo@greenhouse.local
demo123
```

## Docker

```bash
docker compose up --build -d
```

Open `http://localhost:5173`.

## Quality checks

```bash
npm run lint
npm run test
npm run build
```

## Development history

This repository contains a simulated incremental Git history and six tagged milestones. See `docs/DEVELOPMENT_STAGES.md`.

## Deployment

See `docs/DEPLOYMENT.md` for static, Docker and Linux server deployment instructions.
