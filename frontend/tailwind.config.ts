import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1E3A8A",
          black: "#111827",
          white: "#F9FAFB"
        }
      },
      fontFamily: {
        sans: ["'Inter'", "system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "sans-serif"]
      },
      boxShadow: {
        card: "0 20px 25px -15px rgba(30, 58, 138, 0.25)"
      }
    }
  },
  plugins: []
};

export default config;
diff --git a/frontend/tailwind.config.ts b/frontend/tailwind.config.ts
new file mode 100644
index 0000000000000000000000000000000000000000..9f3a0c0f60c1e53611581156f0ee08b296c2656f
--- /dev/null
+++ b/frontend/tailwind.config.ts
@@ -0,0 +1,29 @@
+import type { Config } from "tailwindcss";
+
+const config: Config = {
+  content: [
+    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
+    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
+    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
+  ],
+  theme: {
+    extend: {
+      colors: {
+        brand: {
+          blue: "#1E3A8A",
+          black: "#111827",
+          white: "#F9FAFB"
+        }
+      },
+      fontFamily: {
+        sans: ["'Inter'", "system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "sans-serif"]
+      },
+      boxShadow: {
+        card: "0 20px 25px -15px rgba(30, 58, 138, 0.25)"
+      }
+    }
+  },
+  plugins: []
+};
+
+export default config;
