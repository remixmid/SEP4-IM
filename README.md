# Smart Greenhouse Interactive Media

## Stage 5: Rule-based mock ML

Crop profiles now drive recommendations for temperature, humidity and light. The service is intentionally presented as a mocked ML boundary, while its internal implementation uses deterministic rules. Suitable and Adjust feedback is processed asynchronously.

Tests cover authentication, zones, measurements, summaries, recommendation generation and feedback.

## Run

```bash
cd sep4-react-app
npm ci
npm run dev
npm run test
```

## Docker

```bash
docker compose up --build -d
```
