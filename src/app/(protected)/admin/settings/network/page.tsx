import { Separator } from '@components/ui/separator'
import ComingSoon from '@components/settings/coming-soon'

export default function NetworkSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Network Settings</h3>
        <p className="text-sm text-muted-foreground">
          Governs network traffic by allowing inbound connections on specified
          ports.
        </p>
      </div>
      <Separator />
      <ComingSoon />
    </div>
  )
}
