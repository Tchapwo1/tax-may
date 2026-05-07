import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        slate: {
          deep: "#1E1E2F"
        },
        orange: {
          intl: "#FF4F00"
        }
      }
    }
  },
  plugins: []
};

export default config;
