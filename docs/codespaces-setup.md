# Codespaces Quick Start

Follow these steps the first time you open the repository in GitHub Codespaces.

1. **Open a terminal inside Codespaces**
   * In VS Code, click **Terminal → New Terminal** or press <kbd>Ctrl</kbd> + <kbd>`</kbd> (macOS: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>`</kbd>).

2. **Restore the packaged dependencies file**
   * From the terminal, run:
     ```bash
     ./scripts/restore-package-json.sh
     ```
   * The script ensures `frontend/package.json` matches the committed template and prints the next commands to run.

3. **Install frontend dependencies**
   * You are now inside the `frontend/` folder.
   * Run:
     ```bash
     npm install
     ```
   * (Codespaces usually has open internet access. If the command fails with `E403`, wait a minute and retry.)

4. **Start the development server**
   * From the same terminal, launch Next.js:
     ```bash
     npm run dev
     ```
   * When the server is ready, Codespaces shows a popup with a forwarded URL such as `https://<codespace-id>-3000.app.github.dev`. Click it to open the app.

5. **Stop the server when you are done**
   * Press <kbd>Ctrl</kbd> + <kbd>C</kbd> in the terminal running `npm run dev` to stop the server.

---

If `package.json` ever becomes corrupt again (VS Code shows lots of red errors or `npm install` complains about `diff --git`), just rerun `./scripts/restore-package-json.sh` from the repository root.
