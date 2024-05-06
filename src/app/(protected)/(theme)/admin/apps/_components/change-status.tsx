import { z } from 'zod'
import { toast } from 'react-hot-toast'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { DialogProps } from '@lib/types/components'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog'
import {
  Form,
  FormControl,
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

import { updateStatus } from '@lib/actions/apps'
import { App, ChangeStatusSchema } from '@/schemas/apps'
import { statuses } from '../data'

type ChangeStatusFormValues = z.infer<typeof ChangeStatusSchema>
export default function ChangeStatusDialog({
  app,
  dialog,
}: {
  app: App
  dialog: DialogProps
}) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<ChangeStatusFormValues>({
    mode: 'onChange',
    defaultValues: {
      appId: app.id,
      status: app.status,
    },
  })

  const onSubmit = (data: ChangeStatusFormValues) => {
    startTransition(async () => {
      const { response, error } = await updateStatus(data)
      if (error) toast.error(error.message)
      if (response) {
        dialog.dismiss()
        toast.success(response.message)
      }
    })
  }

  return (
    <Dialog {...dialog.props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Status</DialogTitle>
          <DialogDescription>
            Update the user status by selecting from the options below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={isPending} type="submit">
                Update Status
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
