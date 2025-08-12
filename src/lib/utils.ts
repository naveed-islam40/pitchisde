import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getContrastYIQ(hexcolor) {
  console.log("hexcolor", hexcolor)
  // Remove the hash if it's there
  hexcolor = hexcolor.replace("#", "");

  // Convert the hex into RGB components
  let r = parseInt(hexcolor.substr(0, 2), 16);
  let g = parseInt(hexcolor.substr(2, 2), 16);
  let b = parseInt(hexcolor.substr(4, 2), 16);

  // Calculate the brightness using the YIQ formula
  let brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return black for light backgrounds, white for dark ones
  return brightness >= 128 ? "black" : "white";
}
