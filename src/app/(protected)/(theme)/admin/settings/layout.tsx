import { ReactNode } from 'react'
import { Metadata } from 'next'
import { SidebarNav } from './_components/sidebar-nav'
import { routes } from '@/app/routes'

export const metadata: Metadata = {
  title: 'Forms',
  description: 'Advanced form example using react-hook-form and Zod.',
}

const sidebarNavItems = [
  {
    title: 'General',
    href: routes.settings.general,
  },
  {
    title: 'Resource Limits',
    href: routes.settings.resource,
  },
  {
    title: 'Network settings',
    href: routes.settings.network,
  },
  {
    title: 'Account',
    href: routes.settings.account,
  },
  {
    title: 'Appearance',
    href: routes.settings.appearance,
  },
  {
    title: 'Notifications',
    href: routes.settings.notifications,
  },
]

interface SettingsLayoutProps {
  children: ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="space-y-12 p-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences!
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/6">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  )
}
