import { Separator } from '@components/ui/separator'
import GeneralSettingsForm from '@components/settings/general-settings-form'
import { getSettings } from '@lib/actions'

export default async function GeneralSettings() {
  const settings = await getSettings()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">General Settings</h3>
        <p className="text-sm text-muted-foreground">
          Customize core system parameters for seamless management.
        </p>
      </div>
      <Separator />
      <GeneralSettingsForm settings={settings} />
    </div>
  )
}
