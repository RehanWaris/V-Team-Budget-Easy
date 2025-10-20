diff --git a/README.md b/README.md
index a859c3a4ccb0195d468c3496af2d02b89e09b258..393f0d7ac442431934f8e4632acc9b8476974fe8 100644
--- a/README.md
+++ b/README.md
@@ -1,2 +1,48 @@
-# V-Team-Budget-Easy
-For Voiceworx Team employees to make quick cost
+# V-Budget (Voiceworx Budgeting Platform)
+
+V-Budget is an internal web application for the Voiceworx Events team to manage vendor rate cards, automate event cost sheets, and streamline approvals. The solution is being built with a modern TypeScript stack so it can evolve into both a responsive web experience and future mobile clients.
+
+## Repository Structure
+
+- `docs/` – Product planning artifacts and architecture notes.
+- `frontend/` – Next.js (App Router) frontend with Tailwind CSS styling.
+
+## Getting Started (Frontend)
+
+> **Note:** Package installation commands require internet access. If your environment restricts external downloads, sync dependencies from an approved mirror before continuing.
+
+1. Ensure you have a terminal open on your development machine (macOS, Windows Subsystem for Linux, or Linux) with **Node.js 18+** and **npm** installed.
+2. Navigate to the repository folder you cloned from GitHub:
+
+   ```bash
+   cd /path/to/V-Team-Budget-Easy
+   ```
+
+3. Move into the frontend workspace and install dependencies:
+
+   ```bash
+   cd frontend
+   npm install
+   ```
+
+4. Start the Next.js development server:
+
+   ```bash
+   npm run dev
+   ```
+
+The dev server will start at `http://localhost:3000`. Leave this command running while you work; press `Ctrl+C` in the same terminal when you want to stop it.
+
+## Current Status
+
+- ✅ High-level product plan capturing workflows, modules, and UI direction (`docs/project-plan.md`).
+- ✅ Hand-crafted Next.js frontend scaffold highlighting the hero/landing experience and login layout that reflect the approved wireframe and color palette.
+- 🚧 Backend services, authentication, data persistence, and automated parsing are upcoming in future iterations.
+
+## Key Design Notes
+
+- Blue (#1E3A8A), black (#111827), and white (#F9FAFB) drive the primary theme.
+- Agency fee (%) is applied after the first total, followed by 19% GST on the total inclusive of the agency fee.
+- OTP gates protect employee onboarding and vendor rate management, with approvals routed through `rehan@voiceworx.in`.
+
+Contributions and follow-up tasks will expand the budgeting workflows, integrate the approval engine, and flesh out data integrations per the roadmap.
