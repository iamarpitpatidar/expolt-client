'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@components/ui/input'
import { ForgotPasswordSchema } from '@/schemas'
import { APIResponse } from '@lib/types'
import { sendPasswordResetMail } from '@lib/actions'
import FormSuccess from '@components/form-success'
import FormError from '@components/form-error'
import { Button } from '@components/ui/button'
import { Spinner } from '@components/ui/spinner'

export default function ForgotPasswordForm() {
  const [response, setResponse] = useState<APIResponse | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(ForgotPasswordSchema),
  })

  const onSubmit = (data: z.infer<typeof ForgotPasswordSchema>) => {
    setResponse(null)

    startTransition(async () => {
      sendPasswordResetMail(data).then((response) => setResponse(response))
      form.reset()
    })
  }

  return (
    <Form {...form}>
      <form className="mt-12 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only" htmlFor="email">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  autoComplete="email"
                  className="p-3 outline-none"
                  placeholder="Email"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-left" {...field} />
            </FormItem>
          )}
        />
        {response?.status === 'success' && (
          <FormSuccess message={response.message} />
        )}
        {response?.status === 'error' && (
          <FormError message={response.message} />
        )}
        <Button
          type="submit"
          variant="default"
          className="w-full px-4 py-3 rounded"
          size="xl"
          disabled={isPending}
        >
          {isPending && <Spinner className="w-4 h-4 mr-2" />}
          Reset Password
        </Button>
      </form>
    </Form>
  )
}
