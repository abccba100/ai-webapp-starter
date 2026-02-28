/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
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
        1: "0.5rem",
        2: "1rem",
        3: "1.5rem",
        4: "2rem",
        5: "2.5rem",
        6: "3rem",
        7: "3.5rem",
        8: "4rem",
      },
      borderRadius: {
        md: "0.375rem",
      },
    },
  },
  plugins: [],
};
