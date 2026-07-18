import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        olive: {
          50: '#f4f7f4',
          100: '#e5eee5',
          200: '#cbdccb',
          300: '#a7c1a7',
          400: '#7fa17f',
          500: '#608560',
          600: '#4b694b',
          700: '#3e543e',
          800: '#344534',
          900: '#2b392b',
        },
        cream: {
          50: '#fdfbf7',
          100: '#fbf7ed',
          200: '#f4eada',
          300: '#ead5be',
          400: '#dfbca0',
          500: '#d5a585',
          600: '#ca8a6a',
          700: '#a96a50',
          800: '#895644',
          900: '#6e4739',
        },
        slate: {
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
      animation: {
        blob: "blob 10s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
