# Simulated Development Stages

The repository history was intentionally reconstructed to demonstrate incremental delivery. Every tagged stage contains runnable source code and automated tests.

| Tag | Scope |
|---|---|
| `stage-01-foundation` | Vite, Vitest, deployment instructions, Docker, CI/CD |
| `stage-02-authentication` | Registration, login, mock token, protected routes |
| `stage-03-zones` | Crop profiles, greenhouse zone CRUD and dashboard |
| `stage-04-measurements` | Mock IoT readings, history, charts and statistics |
| `stage-05-recommendations` | Rule-based mock ML, target charts and feedback |
| `stage-06-complete` | Automation history, responsive UI and final documentation |

Useful commands:

```bash
git log --oneline --decorate --graph --all
git checkout stage-04-measurements
npm --prefix sep4-react-app test
```
