'use client'

import { ClockIcon } from '@radix-ui/react-icons'
import { Fragment } from 'react'
import { getTimeInAMPMFormat } from '@lib/utils'

export default function DateTimeCard() {
  const currentTime = getTimeInAMPMFormat()

  return (
    <Fragment>
      <ClockIcon className="h-14 w-14 mr-2" />
      {currentTime}
    </Fragment>
  )
}
