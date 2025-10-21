diff --git a/frontend/src/app/layout.tsx b/frontend/src/app/layout.tsx
new file mode 100644
index 0000000000000000000000000000000000000000..3e65a74278632b9fa32ec957c3f0f8527d5d7f91
--- /dev/null
+++ b/frontend/src/app/layout.tsx
@@ -0,0 +1,21 @@
+import type { Metadata } from "next";
+import "./globals.css";
+
+export const metadata: Metadata = {
+  title: "V-Budget | Event Budgeting Made Easy",
+  description: "Plan, approve, and share event budgets effortlessly with Voiceworx's V-Budget platform."
+};
+
+export default function RootLayout({
+  children
+}: {
+  children: React.ReactNode;
+}) {
+  return (
+    <html lang="en">
+      <body className="bg-brand-white text-brand-black min-h-screen antialiased">
+        {children}
+      </body>
+    </html>
+  );
+}
