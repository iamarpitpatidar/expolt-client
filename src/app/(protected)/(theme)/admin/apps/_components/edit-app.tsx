import { z } from 'zod'
import { useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { Form } from '@components/ui/form'
import { Button } from '@components/ui/button'
import AppFormFields from './form-fields'

import { updateApp } from '@lib/actions'
import { App, AppActionSchema } from '@/schemas/apps'
import { Spinner } from '@components/ui/spinner'

type FormValues = z.infer<typeof AppActionSchema>
export default function EditAppDialog({
  app,
  dialog,
}: {
  app: App
  dialog: DialogProps
}) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      id: app.id,
      name: app.name,
      description: app.description,
      meta: {
        redirectTo: 'redirectTo' in app.meta ? app.meta.redirectTo : '',
      },
      type: 'edit',
    },
    resolver: zodResolver(AppActionSchema),
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    startTransition(async () => {
      const { response, error } = await updateApp(data)
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
          <DialogTitle>Edit App</DialogTitle>
          <DialogDescription>
            Update the app details by filling out the form below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <AppFormFields form={form} />
            <DialogFooter>
              <Button disabled={isPending} type="submit">
                {isPending && <Spinner className="w-4 h-4 mr-2" />}
                Update App
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
