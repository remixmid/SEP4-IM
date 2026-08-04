# Test Plan

Every development milestone contains automated tests.

The first milestone validates the application shell. Later milestones add tests for authentication, zones, measurements, recommendations and automation.

CI executes:

```bash
npm ci
npm run lint
npm run test
npm run build
```
