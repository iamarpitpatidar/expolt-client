import Image from 'next/image'
import ExpoltLogo from '@assets/images/logo.png'

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-pulse-slow">
        <Image src={ExpoltLogo} alt="Expolt Logo" width={100} height={100} />
      </div>
    </div>
  )
}
