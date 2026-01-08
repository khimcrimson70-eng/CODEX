# CODEX

A Mobile Legends: Bang Bang Hero Mastery Hub that automatically updates by season. It dynamically loads all heroes, lets users select a hero, and displays role, description, win rate, ban rate, and appearance rate in real time with no hard-coded data.

To enable GitHub Pages for this repository:
1. Go to the repository Settings -> Pages.
2. Under "Source", select the `main` branch and the `/docs` folder.
3. Save. The site will be served from the `docs/` folder.

Why languages will show now
- This repository previously had no files so GitHub's language statistics were empty. Adding files in HTML, JavaScript, and CSS (docs/) will make the GitHub language breakdown report those languages.

How the app works
- The site attempts to fetch hero data from the API endpoint configured in `docs/main.js`.
- If the network request fails or the API is unavailable, the site falls back to a small sample dataset so the UI remains functional.

Next steps you might want me to do:
- Point the app to a real hero data API (provide endpoint or credentials).
- Add unit tests or CI.
- Improve UI/UX and accessibility.
