# V-Budget (Voiceworx Budgeting Platform)

V-Budget is an internal web application for the Voiceworx Events team to manage vendor rate cards, automate event cost sheets, and streamline approvals. The solution is being built with a modern TypeScript stack so it can evolve into both a responsive web experience and future mobile clients.

## Repository Structure

- `docs/` – Product planning artifacts and architecture notes.
- `frontend/` – Next.js (App Router) frontend with Tailwind CSS styling.

## Getting Started (Frontend)

> **Note:** Package installation commands require internet access. If your environment restricts external downloads, sync dependencies from an approved mirror before continuing.

```bash
cd frontend
npm install
npm run dev
```

The development server defaults to `http://localhost:3000`.

## Current Status

- ✅ High-level product plan capturing workflows, modules, and UI direction (`docs/project-plan.md`).
- ✅ Hand-crafted Next.js frontend scaffold highlighting the hero/landing experience and login layout that reflect the approved wireframe and color palette.
- 🚧 Backend services, authentication, data persistence, and automated parsing are upcoming in future iterations.

## Key Design Notes

- Blue (#1E3A8A), black (#111827), and white (#F9FAFB) drive the primary theme.
- Agency fee (%) is applied after the first total, followed by 19% GST on the total inclusive of the agency fee.
- OTP gates protect employee onboarding and vendor rate management, with approvals routed through `rehan@voiceworx.in`.

Contributions and follow-up tasks will expand the budgeting workflows, integrate the approval engine, and flesh out data integrations per the roadmap.
