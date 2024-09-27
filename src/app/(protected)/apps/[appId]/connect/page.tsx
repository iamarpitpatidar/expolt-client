'use client'

import { getVMDetails } from '@lib/actions'
import { useState, useEffect } from 'react'
import * as Progress from '@radix-ui/react-progress'

import './style.scss'

export default function ConnectApp({ params }: { params: { appId: string } }) {
  const [status, setStatus] = useState('connecting')
  const [progress, setProgress] = useState<number>(0)
  const lang: Record<string, string> = {
    connecting: 'Connecting',
    pending: 'Fetching server config',
    provisioning: 'Provisioning your system',
    failed: 'Connection failed. Try again later.',
    running: 'Redirecting, please wait',
  }

  useEffect(() => {
    const totalTime = 600
    const intervalTime = 5
    const stepIncrement = (100 / totalTime) * intervalTime

    let elapsedTime = 0

    const updateProgress = (currentState: string) => {
      switch (currentState) {
        case 'pending':
          if (progress < 25) setProgress(25)
          break
        case 'provisioning':
          if (progress < 50) setProgress(50)
          break
        case 'running':
          if (progress < 75) setProgress(75)
          return true
        default:
          break
      }
      return false
    }

    const interval = setInterval(async () => {
      elapsedTime += intervalTime

      setProgress((prev) => Math.min(prev + stepIncrement, 100))
      if (elapsedTime >= totalTime && status !== 'running') {
        setStatus('failed')
        clearInterval(interval)
        return
      }

      const { response, error } = await getVMDetails(params.appId)
      if (!response || error) {
        setStatus('failed')
        clearInterval(interval)
        return
      }

      // Update status and progress based on the response state
      if (response.data?.state && status !== response.data.state) {
        setStatus(response.data.state)
        const isRunning = updateProgress(response.data.state)

        if (isRunning) {
          clearInterval(interval)
          const timeout = status === 'provisioning' ? 120000 : 10000
          setTimeout(() => {
            window.location.href = response.data?.redirectTo || ''
          }, timeout)
        }
      }
    }, intervalTime * 1000)

    return () => clearInterval(interval)
  }, [params.appId, progress, status])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1c1e]">
      <div className="w-full max-w-md p-8 bg-[#25282c] rounded-lg shadow-2xl">
        <h1 className="text-2xl text-white mb-14 text-center">
          Setting up your Virtual Machine
        </h1>
        <div className="bg-[#2e3238] p-6 rounded-md">
          <p className="text-[#a0a4a8] mb-4 animate-pulse">{lang[status]}</p>
          <Progress.Root className="relative h-2 w-full overflow-hidden rounded-full bg-[#464649]">
            <Progress.Indicator
              className="h-full flex-1 bg-[#18181b] transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${100 - (progress || 0)}%)` }}
            />
          </Progress.Root>
        </div>
      </div>
    </div>
  )
}
