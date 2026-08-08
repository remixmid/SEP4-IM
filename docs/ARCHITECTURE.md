# Smart Greenhouse Architecture

## Scope

This repository implements the Interactive Media component of a Smart Greenhouse system. Real IoT devices, an IoT backend and a trained machine learning model are outside the scope.

The application uses asynchronous mock services with clear contracts so the frontend behaves as if external services existed. These modules can later be replaced by REST adapters without changing page components.

## Technology stack

- React 19
- Vite 8
- JavaScript ES modules
- React Router with HashRouter
- React Context for authentication
- Recharts for data visualization
- LocalStorage for mock persistence
- Vitest and React Testing Library
- ESLint
- Docker multi-stage build
- Nginx production server
- GitHub Actions

## Component view

```text
React user interface
  |
  +-- Mock authentication service
  |     +-- local users
  |     +-- JWT-style session token
  |
  +-- Mock IoT service
  |     +-- greenhouse zones
  |     +-- current sensor values
  |     +-- 24-hour measurement history
  |     +-- derived device actions
  |
  +-- Rule-based mock ML service
        +-- crop target profiles
        +-- recommendations
        +-- feedback processing
```

## Feature modules

```text
src/features/
  auth/             authentication and protected routes
  zones/            greenhouse zone management and dashboard
  measurements/     current readings, history and statistics
  recommendations/  rule-based crop recommendations and feedback
  automation/       simulated device action history
  layout/           application shell and header
```

## Data flow

### Current measurements

```text
DashboardPage
  -> useCurrentMeasurements
  -> measurementsApi.getMeasurements(zoneId)
  -> zonesApi.getZone(zoneId)
  -> crop profile plus deterministic sensor generator
  -> metric cards
```

### Recommendation

```text
RecommendationPage
  -> useRecommendation
  -> recommendationsApi.getRecommendation(zoneId)
  -> zone plus current measurements
  -> crop profile rules
  -> recommended values and target bounds
```

### Automation history

```text
AutomationHistoryPage
  -> automationApi.getActions(zoneId)
  -> measurement history
  -> compare each point with crop target bounds
  -> create simulated heater, vent, mister, shade and light events
```

## Persistence

LocalStorage keys:

- `smart-greenhouse-users`
- `smart-greenhouse-auth-token`
- `smart-greenhouse-auth-user`
- `smart-greenhouse-zones`
- `smart-greenhouse-feedback`

## Routes

| Route | Purpose |
|---|---|
| `/login` | Mock login |
| `/register` | Mock registration |
| `/main` | Zone dashboard and current data |
| `/view-data/:zoneId` | Current and historical measurements |
| `/recommendations/:zoneId` | Crop recommendations and feedback |
| `/automation-history/:zoneId` | Simulated device actions |

## Replacement path for real services

The mock modules already expose asynchronous functions. A future integration can preserve the component and hook interfaces and replace the implementation with Fetch API calls.

Example:

```text
measurementsApi.getMeasurements(zoneId)
```

can later call:

```text
GET /sensor-data/current?zoneId={zoneId}
```

without changing `DashboardPage` or `ViewDataPage`.
