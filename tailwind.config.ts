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
        primary: "#F3F4F6", // gray-100
        "primary-light": "#FAFAFA", // gray-50
        "primary-dark": "#E5E7EB", // gray-200
        secondary: "#374151", // gray-800
        "secondary-light": "#374151", // gray-700
        "secondary-dark": "#1F2937", // gray-900
        accent: "#86a3be",
        "accent-light": "#abc1d4",
        "accent-dark": "#6b8ba9",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
