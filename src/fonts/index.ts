import { Inter, Oswald, Poppins } from "next/font/google";

export const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  fallback: ["system-ui", "sans-serif"],
});
export const oswald = Oswald({
  display: "swap",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  fallback: ["system-ui", "sans-serif"],
});
export const poppins = Poppins({
  display: "swap",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  fallback: ["system-ui", "sans-serif"],
});
