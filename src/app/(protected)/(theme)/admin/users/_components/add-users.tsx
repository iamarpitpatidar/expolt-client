'use client'

import { z } from 'zod'
import { useState, useTransition } from 'react'
import { toast } from 'react-hot-toast'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Form } from '@components/ui/form'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserActionSchema } from '@/schemas/users'
import { createUser } from '@lib/actions'
import UserFormFields from './form-fields'

type UserFormValues = z.infer<typeof UserActionSchema>
export default function AddUserModal() {
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)

  const form = useForm<UserFormValues>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'user',
      type: 'add',
    },
    resolver: zodResolver(UserActionSchema),
  })

  const onSubmit: SubmitHandler<UserFormValues> = (data) => {
    startTransition(async () => {
      const { response, error } = await createUser(data)
      if (error) toast.error(error.message)
      if (response) {
        form.reset()
        setOpen(false)
        toast.success('User created successfully')
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Create a new user by filling out the form below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <UserFormFields form={form} />
            <DialogFooter>
              <Button disabled={isPending} type="submit">
                Add User
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
