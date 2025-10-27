diff --git a/frontend/next.config.mjs b/frontend/next.config.mjs
new file mode 100644
index 0000000000000000000000000000000000000000..de85e9e4b26d45a5449d9a1e26a0bb07bb184aa3
--- /dev/null
+++ b/frontend/next.config.mjs
@@ -0,0 +1,9 @@
+/** @type {import('next').NextConfig} */
+const nextConfig = {
+  reactStrictMode: true,
+  experimental: {
+    appDir: true
+  }
+};
+
+export default nextConfig;
