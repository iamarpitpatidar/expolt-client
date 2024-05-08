import { z } from 'zod'
import { useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DialogProps } from '@lib/types/components'
import { Button } from '@components/ui/button'
import { Form } from '@components/ui/form'
import UserFormFields from './form-fields'

import { UserActionSchema, UserSchema } from '@/schemas/users'
import { updateUser } from '@lib/actions'
import { Spinner } from '@components/ui/spinner'

type UserFormValues = z.infer<typeof UserActionSchema>
export default function EditUserDialog({
  dialog,
  user,
}: {
  dialog: DialogProps
  user: z.infer<typeof UserSchema>
}) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<UserFormValues>({
    mode: 'onChange',
    defaultValues: {
      id: user.id,
      name: user.name,
      email: user.email,
      password: '',
      type: 'edit',
      role: user.role,
    },
    resolver: zodResolver(UserActionSchema),
  })

  const onSubmit: SubmitHandler<UserFormValues> = (data) => {
    startTransition(async () => {
      const { response, error } = await updateUser(data)
      if (error) toast.error(error.message)
      if (response) {
        dialog.dismiss()
        toast.success(response.message)
      }
    })
  }

  return (
    <Dialog {...dialog.props}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update the user details by filling out the form below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <UserFormFields form={form} />
            <DialogFooter>
              <Button disabled={isPending} type="submit">
                {isPending && <Spinner className="w-4 h-4 mr-2" />}
                Update User
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
