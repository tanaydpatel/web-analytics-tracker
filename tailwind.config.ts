import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        pretendard: ['"Pretendard"', "sans-serif"],
      },
      colors: {
        "bg-light-gray": "#F9F9F9",
        "text-black": "#383f50",
        "text-light-gray": "#383f5080",
      },
    },
  },
  plugins: [],
} satisfies Config;
