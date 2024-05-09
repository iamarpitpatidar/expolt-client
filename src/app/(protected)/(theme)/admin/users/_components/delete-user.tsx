import { useTransition } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@components/ui/dialog'
import { Form } from '@components/ui/form'
import { Button } from '@/components/ui/button'
import { DialogProps } from '@lib/types/components'

import { DeleteUserSchema } from '@/schemas/users'
import { deleteUser } from '@lib/actions'
import { toast } from 'react-hot-toast'
import { Spinner } from '@components/ui/spinner'

type DeleteUserFormValues = z.infer<typeof DeleteUserSchema>
export default function DeleteUserDialog({
  userId,
  dialog,
}: {
  userId: number
  dialog: DialogProps
}) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<DeleteUserFormValues>({ defaultValues: { userId } })
  const onSubmit = (data: DeleteUserFormValues) => {
    startTransition(async () => {
      const { response, error } = await deleteUser(data)
      if (error) toast.error(error.message)
      if (response) {
        form.reset()
        toast.success(response.message)
      }
    })
  }

  return (
    <Dialog {...dialog.props}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the
                user
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={dialog.dismiss}>Cancel</Button>
              <Button variant="destructive" type="submit" disabled={isPending}>
                {isPending && <Spinner className="w-4 h-4 mr-2" />}
                Delete
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
