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
- Vitest unit tests
- Docker and Nginx production image
- GitHub Actions CI and container publishing

## Quick start

```bash
cd sep4-react-app
npm install
npm run dev
```

Open the Vite URL and use:

```text
demo@greenhouse.local
demo123
```

## Docker

```bash
docker compose up --build
```

Open `http://localhost:5173`.

## Quality checks

```bash
npm run lint
npm run test
npm run build
```

## Scope statement

The IoT and Machine Learning components are outside this project's scope. Their behavior is simulated through asynchronous mock services. The mock IoT layer provides greenhouse zones, environmental readings and automation events. The mock ML layer uses crop profiles and deterministic rules to produce recommendations and process user feedback.
