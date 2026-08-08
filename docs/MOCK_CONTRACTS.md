# Mock Service Contracts

## Zone

```json
{
  "id": "zone-tomatoes",
  "userId": "user-demo",
  "name": "Tomato House",
  "cropType": "Tomato",
  "createdAt": "2026-08-01T08:00:00.000Z"
}
```

## Current measurements

```json
{
  "zoneId": "zone-tomatoes",
  "temperature": {
    "value": 24.1,
    "timeStamp": "2026-08-03T15:00:00.000Z"
  },
  "humidity": {
    "value": 66.2,
    "timeStamp": "2026-08-03T15:00:00.000Z"
  },
  "light": {
    "value": 540,
    "timeStamp": "2026-08-03T15:00:00.000Z"
  }
}
```

## History point

```json
{
  "timeStamp": "2026-08-03T14:00:00.000Z",
  "temperature": 23.8,
  "humidity": 67.4,
  "light": 512
}
```

## Recommendation

```json
{
  "id": "recommendation-id",
  "zoneId": "zone-tomatoes",
  "cropType": "Tomato",
  "createdAt": "2026-08-03T15:00:00.000Z",
  "predictionHoursAhead": 6,
  "values": [
    {
      "type": "temperature",
      "label": "Temperature",
      "unit": "°C",
      "currentValue": 27,
      "recommendedValue": 24,
      "minimumValue": 22,
      "maximumValue": 26
    }
  ]
}
```

## Feedback request

```json
{
  "recommendation": "Recommendation object",
  "valueType": "temperature",
  "liked": false
}
```

## Automation action

```json
{
  "id": "zone-tomatoes-8-temp-high",
  "zoneId": "zone-tomatoes",
  "deviceType": "Vent",
  "previousState": "Closed",
  "newState": "Open",
  "reason": "Temperature above target range",
  "timestampUtc": "2026-08-03T14:00:00.000Z"
}
```
