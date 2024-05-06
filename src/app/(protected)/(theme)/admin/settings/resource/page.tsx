import { Separator } from '@components/ui/separator'
import ResourceLimitsForm from '@components/settings/resource-limits-form'

export default function ResourceSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Resource Limits</h3>
        <p className="text-sm text-muted-foreground">
          Establishes default limits on CPU, memory, and storage usage for each
          virtual machine.
        </p>
      </div>
      <Separator />
      <ResourceLimitsForm />
    </div>
  )
}
