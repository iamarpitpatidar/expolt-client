import { z } from 'zod'

export const SettingSchema = z.object({
  idle_timeout: z.string().transform((val) => parseInt(val)),
  default_vm_provider: z.literal('vultr'),
  default_vm_plan: z.literal('vc2-2c-4gb'),
  default_vm_region: z.literal('ewr'),
})
export type Settings = z.infer<typeof SettingSchema>
