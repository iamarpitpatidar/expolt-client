import { Card, CardDescription, CardTitle } from '@components/ui/card'
import { Badge } from '@components/ui/badge'
import { getFormatedDate } from '@lib/utils'
import { weather, lastUpdate } from 'src/database'

export default async function WeatherCard() {
  const lastUpdateTime = lastUpdate.findOne({ name: 'weather' })
  const currentDate = getFormatedDate()
  if (
    !weather.chain().data().length ||
    !lastUpdateTime ||
    lastUpdateTime > Date.now() - 1000 * 60 * 60
  ) {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=delhi,india&aqi=no`,
    ).then((res) => res.json())

    const { current } = response
    if (!current) return null
    weather.insert(current)
    if (lastUpdateTime) lastUpdate.remove(lastUpdateTime)
    lastUpdate.insert({ name: 'weather', lastUpdate: Date.now() })
  }
  const weatherData = weather.chain().simplesort('$loki', true).data()[0]
  const condition = weatherData.condition.text

  return (
    <Card className="p-8 text-gray-500">
      <CardTitle className="font-bold text-lg mb-2">
        {weatherData.temp_c}
        <sup>o</sup>
      </CardTitle>
      <Badge variant="secondary">Today</Badge>
      <CardTitle className="text-sm py-2">Feels like {condition}</CardTitle>
      <CardDescription className="text-xs">{currentDate}</CardDescription>
    </Card>
  )
}
