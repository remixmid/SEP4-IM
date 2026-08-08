# Test Plan

## Automated tests

The project includes unit tests for the application rules and mock contracts.

### Authentication

- Demo user can log in
- Returned token can be decoded
- New user can register and log in

### Greenhouse zones

- Zone can be created
- Zone can be deleted
- Duplicate zone names are rejected

### Measurements

- Current values contain temperature, humidity and light
- History contains 25 points covering the last 24 hours

### Recommendations

- Crop profile creates three recommendations
- Recommended values remain inside crop target bounds
- Adjust feedback returns an updated recommendation

### Automation

- Sensor history produces device actions
- Each action contains zone, device and reason

### Statistics

- Minimum, average and maximum are calculated correctly

## Manual acceptance checks

1. Log in with the demo account.
2. Select each seed zone and verify current sensor cards change.
3. Create a Cucumber zone and confirm it becomes selected.
4. Open Environmental Data and switch between All, Temperature, Humidity and Light.
5. Open Growth Recommendation and submit Suitable and Adjust feedback.
6. Confirm Adjust changes the target while keeping it inside the allowed range.
7. Open Automation History and filter by device and date.
8. Refresh the browser and confirm authentication, zones and feedback remain stored.
9. Delete a zone and confirm the dashboard selects another available zone.
10. Build and run the Docker image on port 5173.
