import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomColorHex() {
  const letters = '0123456789ABCDEF'
  return Array.from(
    { length: 6 },
    () => letters[Math.floor(Math.random() * 16)],
  ).join('')
}

export async function getDeployURl() {
  return process.env.NODE_ENV === 'production'
      ? process.env.URL
      : process.env.APP_URL
}
