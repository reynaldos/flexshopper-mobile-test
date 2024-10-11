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
        background: "var(--background)",
        foreground: "var(--foreground)",
        main700: 'var(--main700)',
        main500: 'var(--main500)',
        main100: 'var(--main100)',
        accent400:  'var(--accent400)',
        highlight400:  'var(--highlight400)',
      },
      fontFamily: {
        sans: ['Open Sans', 'Arial', 'sans-serif'], 
      },
    },
  },
  plugins: [],
};
export default config;
