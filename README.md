# Smart Greenhouse Interactive Media

## Stage 4: Mock IoT telemetry

The application now generates current sensor readings and deterministic 24-hour history for temperature, humidity and light. The dashboard and telemetry page display cards, charts and minimum, average and maximum statistics.

All prior tests remain present, with new API and statistics tests added for this milestone.

## Run and test

```bash
cd sep4-react-app
npm ci
npm run dev
npm run test
npm run build
```

## Docker deployment

```bash
docker compose up --build -d
```
