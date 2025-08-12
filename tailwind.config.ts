import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector", "class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        "primary-light": "#00973c",
        light: "#f5f5f5",
        dark: "#303030",
        danger: "#da291c",
        warning: "#ffc000",
        info: "#5691fb",
        "x-success": "#00985F",
        "x-failure": "#DD3636",
        "x-bargreen": "#00401A",
        "x-darkgreen": "#002C12",
        "x-green-2": "#006428",
        "x-grey": {
          "1": "#7B7676",
          "2": "#F2F2F2",
          "3": "#D9D9D9",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        inter: "Inter",
        poppins: "Poppins",
        // oswald: 'Oswald',
        display: "var(--font-oswald)",
        sans: "var(--font-lato)",
        "noticia-text": "var(--font-noticia-text)",
        lato: ["var(--font-lato)", "sans-serif"],
        oswald: ["var(--font-oswald)", "sans-serif"],
        noticia: ["var(--font-noticia-text)", "serif"],
      },
      boxShadow: {
        "x-0-1-5-0": "0px 1px 5px 0px #00000040",
        "x-0-2-15-0": "0px 2px 15px 0px #00000040",
        "x-0-1-2-0": "0px 1px 2px 0px #00000040",
        hexagon: "0 2px 10px 0px #000000",
        "create-pitch": "0px 0px 20px 0px #00000026",
        "y-0-0-18-0": "0px 0px 18.27px 0px #00000026",
        "x-0-0-20-0": "0px 0px 20px 0px #00000026",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
    keyframes: {
      shimmer: {
        "100%": {
          transform: "translateX(100%)",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
