import { Separator } from '@components/ui/separator'
import ComingSoon from '@components/settings/coming-soon'

export default function AppearanceSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance Settings</h3>
        <p className="text-sm text-muted-foreground">
          Defines the visual presentation of the user interface.
        </p>
      </div>
      <Separator />
      <ComingSoon />
    </div>
  )
}
