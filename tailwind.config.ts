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
        primary: '#F9FAFB',
        secondary: '#111827',
        accent: '#1A4CC7', // Royal Blue
        highlight: '#00A86B', // Will Green
        purple: '#6B3FA0', // Royal Purple
        error: '#EF4444',
        neutral: {
          500: '#6B7280',
          300: '#D1D5DB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;

