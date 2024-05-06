import { Separator } from '@components/ui/separator'
import ComingSoon from '@components/settings/coming-soon'

export default function AccountSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account Settings</h3>
        <p className="text-sm text-muted-foreground">
          Establishes default limits on CPU, memory, and storage usage for each
          virtual machine.
        </p>
      </div>
      <Separator />
      <ComingSoon />
    </div>
  )
}
