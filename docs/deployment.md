# Deployment Guide

This document explains how to deploy the **V-Budget** frontend so team members can preview the application without a local development environment. The instructions cover both a managed hosting workflow with Vercel and a self-hosted Node.js deployment.

## 1. Prerequisites

Before deploying, make sure the following are available:

- Access to the GitHub repository (`V-Team-Budget-Easy`).
- A production-ready build created from a clean working tree (`git status` should show no changes).
- Node.js 18 or later and npm (used locally to build the static assets).
- Optional: a Vercel account connected to GitHub for managed hosting.

## 2. Prepare the Frontend Build

1. Install dependencies from your development machine or Codespaces terminal (for example, the integrated terminal in VS Code):

   ```bash
   cd frontend
   npm install
   ```

   > **Note:** If you deploy with Vercel directly from GitHub you do **not** need to run these commands in Vercel itself—Vercel executes them automatically during the build. Run them locally only when you want to verify the build before pushing.

2. Generate an optimized production build (run in the same local terminal as above):

   ```bash
   npm run build
   ```

   The command outputs the compiled assets into the `.next/` directory and verifies the app compiles without errors.

3. (Optional) Smoke-test the production bundle locally:

   ```bash
   npm run start
   ```

   This launches the Next.js server on `http://localhost:3000` using the production build. Press `Ctrl+C` to stop the server when you finish verifying the pages.

## 3. Deploying with Vercel (Recommended)

1. Sign in to [Vercel](https://vercel.com) and import the repository.
2. When prompted for the framework preset, choose **Next.js** (Vercel detects it automatically).
3. Keep the default build command `npm run build` and the default output directory `.next`.
4. Trigger a new deployment by clicking **Deploy**. Vercel installs dependencies, runs the build, and hosts the generated site.
5. After the deployment completes, copy the live URL and share it with reviewers. Subsequent pushes to `main` automatically create new previews.

## 4. Self-Hosting on a Node.js Server

If you prefer to host the frontend yourself:

1. Ensure the production build artifacts exist (`npm run build`).
2. Install a process manager such as `pm2` (optional but recommended for uptime):

   ```bash
   npm install -g pm2
   ```

3. Start the server in production mode from the `frontend/` directory:

   ```bash
   NODE_ENV=production pm2 start "npm run start" --name v-budget
   ```

   The site becomes available on port `3000`. Use a reverse proxy (e.g., Nginx) to expose it via HTTPS on your domain.

4. To stop or restart the server:

   ```bash
   pm2 restart v-budget   # restart with latest build
   pm2 stop v-budget      # stop the service
   ```

## 5. Environment Variables

The current prototype does not require runtime configuration. When backend APIs and authentication are integrated, define the variables in `.env` files and configure them in Vercel (Project Settings → Environment Variables) or your self-hosted environment.

## 6. Continuous Deployment Tips

- Protect the `main` branch with reviews so only approved changes trigger production builds.
- Automate linting and tests in GitHub Actions to catch issues before deployment.
- Tag releases (e.g., `v0.1.0`) to track production milestones.

Following these steps ensures the V-Budget frontend can be reviewed in a live environment while the backend is under construction.
