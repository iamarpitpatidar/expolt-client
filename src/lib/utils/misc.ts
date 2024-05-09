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
  return process.env.APP_URL
}

export function getTimeInAMPMFormat() {
  const now = new Date()
  let hours = now.getHours()
  let minutes: string | number = now.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12 // handle midnight
  minutes = minutes < 10 ? '0' + minutes : minutes
  return hours + ':' + minutes + ' ' + ampm
}

export function getFormatedDate() {
  const now = new Date()
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const month = months[now.getMonth()]
  const date = now.getDate()
  const day = days[now.getDay()]
  return month + ' ' + date + ', ' + day
}
