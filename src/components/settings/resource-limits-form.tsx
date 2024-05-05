'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select'
import { Button } from '@components/ui/button'
import toast from 'react-hot-toast'

const settingsFormSchema = z.object({
  default_vm_provider: z.literal('vultr'),
  default_vm_plan: z.literal('vc2-2c-4gb'),
  default_vm_region: z.literal('ewr'),
})
type settingsFormValues = z.infer<typeof settingsFormSchema>
const defaultValues: Partial<settingsFormValues> = {
  default_vm_provider: 'vultr',
  default_vm_plan: 'vc2-2c-4gb',
  default_vm_region: 'ewr',
}

export default function ResourceLimitsForm() {
  const form = useForm<settingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  const onSubmit = (data: settingsFormValues) => {
    toast.error('Settings coming soon.')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="default_vm_provider"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default VM Provider</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="vultr">Vultr</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Default VM Provider</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="default_vm_plan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default VM Plan</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="vc2-2c-4gb">VC2-2C-4GB</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Default VM Plan</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="default_vm_region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default VM Region</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ewr">EWR</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Default VM Region</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Resource Limits</Button>
      </form>
    </Form>
  )
}
