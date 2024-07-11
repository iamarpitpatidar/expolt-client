'use server'

import { lastUpdate, weather } from '@/database'

export async function getWeatherData({
  lat,
  lon,
}: { lat?: string; lon?: string } = {}) {
  const lastUpdateTime = lastUpdate.findOne({ name: 'weather' })
  if (
    !weather.chain().data().length ||
    !lastUpdateTime ||
    lastUpdateTime > Date.now() - 1000 * 60 * 60
  ) {
    const query = lat && lon ? `${lat},${lon}` : 'delhi,india'
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${query}&aqi=no`,
    ).then((res) => res.json())

    const { current } = response
    if (!current) return null
    weather.insert(current)
    if (lastUpdateTime) lastUpdate.remove(lastUpdateTime)
    lastUpdate.insert({ name: 'weather', lastUpdate: Date.now() })
  }

  return weather.chain().simplesort('$loki', true).data()[0]
}
