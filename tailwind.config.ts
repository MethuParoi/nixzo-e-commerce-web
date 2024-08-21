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
        accent: "#005b96",
        "accent-light": "#6497b1",
        "accent-dark": "#03396c",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      //default breakpoints
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",

      // custom breakpoints
      // laptop01: "1535px",
    },
  },
  plugins: [],
};
export default config;
