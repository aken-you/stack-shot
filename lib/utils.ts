import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTechName(fileName: string) {
  return fileName.replace(/-/g, " ").replace(/\.(jpg|jpeg|png|gif|svg)$/i, "");
}
