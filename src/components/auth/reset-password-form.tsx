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
import { ResetPasswordSchema } from '@/schemas'
import { APIResponse } from '@lib/types'
import { resetPassword } from '@lib/actions'
import FormSuccess from '@components/form-success'
import FormError from '@components/form-error'
import { Button } from '@components/ui/button'

export default function ResetPasswordForm({
  email,
  token,
}: {
  email: string
  token: string
}) {
  const [response, setResponse] = useState<APIResponse | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      email,
      token,
      password: '',
      password_confirmation: '',
    },
    resolver: zodResolver(ResetPasswordSchema),
  })

  const onSubmit = (data: z.infer<typeof ResetPasswordSchema>) => {
    setResponse(null)

    startTransition(async () => {
      resetPassword(data).then((response) => setResponse(response))
      form.reset()
    })
  }

  return (
    <Form {...form}>
      <form className="mt-12 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only" htmlFor="email">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  autoComplete="current-password"
                  className="p-3 outline-none"
                  placeholder="Password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-left" {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only" htmlFor="password_confirmation">
                Password Confirmation
              </FormLabel>
              <FormControl>
                <Input
                  autoComplete="current-password"
                  className="p-3 outline-none"
                  placeholder="Password Confirmation"
                  type="password"
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
          Reset Password
        </Button>
      </form>
    </Form>
  )
}
