'use client'

import { Card, CardDescription, CardTitle } from '@components/ui/card'
import { Badge } from '@components/ui/badge'
import { getWeatherData } from '@lib/actions'
import { getFormatedDate } from '@lib/utils'
import { useEffect, useState } from 'react'
import { Skeleton } from '@components/ui/skeleton'

export default function WeatherCard() {
  const [weatherData, setWeatherData] = useState<{
    temp_c: string
    condition: { text: string }
  } | null>(null)
  const [location, setLocation] = useState<{ lat: string; lon: string } | null>(
    null,
  )
  const currentDate = getFormatedDate()

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            setLocation({
              lat: position.coords.latitude.toString(),
              lon: position.coords.longitude.toString(),
            })
          },
          function (error) {
            console.error('Error getting geolocation:', error)
          },
        )
      }

      const response = await getWeatherData({
        lat: location?.lat,
        lon: location?.lon,
      })
      setWeatherData(response)
    }

    fetchWeatherData()
  }, [location?.lat, location?.lon])

  return weatherData ? (
    <Card className="p-8 text-gray-500">
      <CardTitle className="font-bold text-lg mb-2">
        {weatherData.temp_c}
        <sup>o</sup>
      </CardTitle>
      <Badge variant="secondary">Today</Badge>
      <CardTitle className="text-sm py-2">
        Feels like {weatherData.condition.text}
      </CardTitle>
      <CardDescription className="text-xs">{currentDate}</CardDescription>
    </Card>
  ) : (
    <Skeleton />
  )
}
