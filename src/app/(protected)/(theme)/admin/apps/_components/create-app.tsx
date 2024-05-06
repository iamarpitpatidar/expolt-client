'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@components/ui/dialog'
import { Form } from '@components/ui/form'
import { Button } from '@components/ui/button'
import AppFormFields from './form-fields'

import { AppActionSchema } from '@/schemas/apps'
import { createApp } from '@lib/actions'

type FormValues = z.infer<typeof AppActionSchema>
export default function CreateAppDialog() {
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)

  const form = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      meta: {
        redirectTo: '',
      },
      type: 'add',
    },
    resolver: zodResolver(AppActionSchema),
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    startTransition(async () => {
      const { response, error } = await createApp(data)
      if (error) toast.error(error.message)
      if (response) {
        form.reset()
        setOpen(false)
        toast.success(response.message)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create App</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New App</DialogTitle>
          <DialogDescription>
            Create a new app by filling out the form below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <AppFormFields form={form} />
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                Create App
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
