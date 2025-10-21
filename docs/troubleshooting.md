# Troubleshooting Guide

## Fixing `package.json` After a Bad Copy/Paste

If VS Code shows lots of red errors in `frontend/package.json` (for example, messages like "Property value expected"), the file probably contains a diff snippet instead of real JSON. Follow these steps to restore the correct file:

1. **Open a terminal inside Codespaces**
   * Click **Terminal → New Terminal** in the top menu, or press <kbd>Ctrl</kbd> + <kbd>`</kbd>.

2. **Go to the project folder**
   ```bash
   cd /workspaces/V-Team-Budget-Easy
   ```

3. **Change into the frontend workspace**
   ```bash
   cd frontend
   ```

4. **Restore the clean `package.json`**
   ```bash
   ./scripts/restore-package-json.sh
   ```
   * The script automatically jumps into `frontend/`, calls the Node helper (`node scripts/check-package-json.cjs --restore`), and stops if anything fails.
   * You should see `✅ package.json has been restored...` once it finishes.

5. **Install dependencies**
   ```bash
   npm install
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```
   * Open the forwarded URL shown in the terminal (usually `https://<codespace-id>-3000.app.github.dev`) to view the app.

If you still see JSON errors after the restore, double-check that you saved the file and re-run the script. You can always compare the file with the committed template at `frontend/scripts/package.json.template` for reference.
