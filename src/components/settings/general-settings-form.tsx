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
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import toast from 'react-hot-toast'

const settingsFormSchema = z.object({
  idle_timeout: z.number().min(1),
})
type settingsFormValues = z.infer<typeof settingsFormSchema>
const defaultValues: Partial<settingsFormValues> = {
  idle_timeout: 30,
}

export default function GeneralSettingsForm() {
  const form = useForm<settingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  const onSubmit = (data: settingsFormValues) => {
    toast.success('Settings saved successfully.')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="idle_timeout"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Idle Timeout</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} className="px-3 py-1" />
              </FormControl>
              <FormDescription>
                Set the duration of inactivity before automatic logoff.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Settings</Button>
      </form>
    </Form>
  )
}
