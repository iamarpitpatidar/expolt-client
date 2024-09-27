'use client'

import { ClockIcon } from '@radix-ui/react-icons'
import { Fragment, useState, useEffect } from 'react'
import { getTimeInAMPMFormat } from '@lib/utils'

export default function DateTimeCard() {
  const [currentTime, setCurrentTime] = useState(getTimeInAMPMFormat())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getTimeInAMPMFormat())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Fragment>
      <ClockIcon className="h-8 w-8 md:h-14 md:w-14 mr-2" />
      {currentTime}
    </Fragment>
  )
}
