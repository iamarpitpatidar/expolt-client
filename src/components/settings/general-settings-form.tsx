'use client'

import { useTransition } from 'react'
import { z } from 'zod'
import toast from 'react-hot-toast'
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
import { Spinner } from '@components/ui/spinner'

import { Settings } from '@/schemas/settings'
import { updateSettings } from '@lib/actions/settings'

const settingsFormSchema = z.object({
  idle_timeout: z.string().transform((val) => parseInt(val)),
})
type settingsFormValues = z.infer<typeof settingsFormSchema>

export default function GeneralSettingsForm({
  settings,
}: {
  settings: Settings
}) {
  const [isPending, startTransition] = useTransition()

  const form = useForm<settingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      idle_timeout: settings.idle_timeout,
    },
    mode: 'onChange',
  })

  const onSubmit = (data: settingsFormValues) => {
    startTransition(async () => {
      const response = await updateSettings(data)
      if (response.status === 'success') {
        toast.success(response.message)
      } else toast.error(response.message)
    })
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
                <Input
                  placeholder="Idle Timeout"
                  {...field}
                  className="px-3 py-1"
                />
              </FormControl>
              <FormDescription>
                Set the duration of inactivity before automatic logoff.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit">
          {isPending && <Spinner className="w-4 h-4 mr-2" />}
          Update Settings
        </Button>
      </form>
    </Form>
  )
}
