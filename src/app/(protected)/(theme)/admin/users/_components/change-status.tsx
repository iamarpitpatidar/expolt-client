import { z } from 'zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
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
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@components/ui/form'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@components/ui/select'

import { statuses } from '../data'
import { ChangeStatusSchema, User } from '@/schemas/users'
import { Button } from '@components/ui/button'
import { updateStatus } from '@lib/actions/users'
import { Spinner } from '@components/ui/spinner'

type ChangeStatusFormValues = z.infer<typeof ChangeStatusSchema>
export default function ChangeStatusDialog({
  dialog,
  user,
}: {
  dialog: DialogProps
  user: User
}) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<ChangeStatusFormValues>({
    mode: 'onChange',
    defaultValues: {
      userId: user.id,
      status: user.status,
    },
  })

  const onSubmit = (data: ChangeStatusFormValues) => {
    startTransition(async () => {
      const { response, error } = await updateStatus(data)
      if (error) toast.error(error.message)
      if (response) {
        dialog.dismiss()
        toast.success('User status updated successfully')
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
                {isPending && <Spinner className="w-4 h-4 mr-2" />}
                Update Status
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
