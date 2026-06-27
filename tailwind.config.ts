import type { Config } from "tailwindcss"

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#A8554A",
        dark: "#2E2228",
        cream: "#F7EFE6",
        sage: "#8FA08A",
        card: "#FDF8F2",
        deep: "#F0E6D8",
        muted: "#9B8A84",
        "low-risk": "#7A9B76",
        "watch-risk": "#D9A04B",
        "urgent-risk": "#C0463E",
        "low-risk-bg": "#EBF2EA",
        "watch-risk-bg": "#FDF4E3",
        "urgent-risk-bg": "#FCE9E8",
      },
      fontFamily: {
        nunito: ["'Nunito'", "sans-serif"],
        "work-sans": ["'Work Sans'", "sans-serif"],
      },
      borderRadius: {
        button: "15px",
        input: "14px",
        card: "20px",
      },
      boxShadow: {
        card: "0 10px 30px rgba(168, 85, 74, 0.12)",
        modal: "0 30px 70px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
