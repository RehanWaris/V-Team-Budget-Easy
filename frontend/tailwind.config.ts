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
