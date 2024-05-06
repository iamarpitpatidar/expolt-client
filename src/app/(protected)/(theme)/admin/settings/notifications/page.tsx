import { Separator } from '@components/ui/separator'
import ComingSoon from '@components/settings/coming-soon'

export default function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notification Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your notification preferences in one place.
        </p>
      </div>
      <Separator />
      <ComingSoon />
    </div>
  )
}
