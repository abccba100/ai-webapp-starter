import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#0F172A",
        accent: "#22D3EE",
        background: "#F8FAFC",
        success: "#16A34A",
        destructive: "#dc2626",
      },
      spacing: {
        0: "0px",
        1: "0.5rem", // 8px
        2: "1rem", // 16px
        3: "1.5rem", // 24px
        4: "2rem", // 32px
        5: "2.5rem", // 40px
        6: "3rem", // 48px
        7: "3.5rem", // 56px
        8: "4rem", // 64px
      },
      borderRadius: {
        md: "0.375rem",
      },
    },
  },
  plugins: [],
};

export default config;

