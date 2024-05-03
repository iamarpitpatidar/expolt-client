import { ReactNode } from 'react'
import { Logout } from '@lib/actions/auth'

interface LogoutButtonProps {
  children?: ReactNode
}

export default function LogoutButton(props: LogoutButtonProps) {
  const { children } = props

  const onClick = () => {
    Logout().then(() => {
      console.log('logged out')
    })
  }

  return <span onClick={onClick}>{children}</span>
}
