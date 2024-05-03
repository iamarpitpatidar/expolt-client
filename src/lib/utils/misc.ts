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

export function getDeployURl() {
  return process.env.NETLIFY
    ? process.env.CONTEXT === 'production'
      ? process.env.URL
      : process.env.DEPLOY_URL
    : process.env.DEPLOY_URL
}
