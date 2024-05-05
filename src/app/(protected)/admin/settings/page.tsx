import { Separator } from '@components/ui/separator'
import GeneralSettingsForm from '@components/settings/general-settings-form'

export default function GeneralSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">General Settings</h3>
        <p className="text-sm text-muted-foreground">
          Customize core system parameters for seamless management.
        </p>
      </div>
      <Separator />
      <GeneralSettingsForm />
    </div>
  )
}
