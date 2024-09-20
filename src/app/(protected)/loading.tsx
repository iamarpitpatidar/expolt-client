import Image from 'next/image'
import ExpoltLogo from '@assets/images/logo.png'

export default function Loading() {
  return (
    <div>
      <div className="center-content">
        <Image src={ExpoltLogo} alt="Expolt Logo" />
        <span>Expolt</span>
      </div>
    </div>
  )
}
