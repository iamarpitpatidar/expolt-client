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
  console.log(process.env.NODE_ENV)
  console.log(process.env.NODE_ENV === 'production')
  console.log(process.env.URL)
  console.log(process.env.APP_URL)
  return process.env.NODE_ENV === 'production'
    ? process.env.URL
    : process.env.APP_URL
}
