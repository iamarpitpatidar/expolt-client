'use client'

import { getVMDetails } from '@lib/actions'
import { useState, useEffect } from 'react'

import './style.scss'

export default function ConnectApp({ params }: { params: { appId: string } }) {
  const [progress, setProgress] = useState<string[]>(['connecting'])
  const lang: Record<string, string> = {
    connecting: 'Connecting',
    pending: 'Fetching server config',
    provisioning: 'Provisioning your system',
    failed: 'Connection failed try again later.',
    running: 'Redirecting, please wait',
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      const { response, error } = await getVMDetails(params.appId)
      if (!response || error) {
        setProgress([...progress, 'failed'])
        return
      }

      if (
        response &&
        response.data?.state &&
        !progress.includes(response.data.state)
      ) {
        setProgress([...progress, response.data.state])
        if (response.data.state === 'running') {
          clearInterval(interval)
          setTimeout(() => {
            window.location.href = response.data?.redirectTo || ''
          }, 2000)
        }
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [params.appId, progress])

  return (
    <div className="h-screen bg-[#0e1116]">
      <h1 className="text-2xl text-gray-200 text-center py-12">
        Setting up your environment
      </h1>
      <div className="flex flex-col justify-center items-center">
        <div className="w-2/6 bg-[#24292e] rounded-md px-6 py-8 min-h-72">
          {progress.map((step, index) => (
            <div
              key={index}
              className="flex items-center text-gray-300 text-sm mt-1"
            >
              {lang[step]}
            </div>
          ))}
          <div className="loader text-gray-200"></div>
        </div>
      </div>
    </div>
  )
}
