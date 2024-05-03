'use client'

import Link from 'next/link'
import { useTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Input } from '@components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import { LoginSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@components/ui/button'
import FormError from '@components/form-error'
import FormSuccess from '@components/form-success'
import { login } from '@lib/actions'
import { APIResponse } from '@lib/types'

export default function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [response, setResponse] = useState<APIResponse | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    mode: 'onChange',
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    setResponse(null)

    startTransition(async () => {
      login(data, callbackUrl).then((response) => setResponse(response))
    })
  }

  return (
    <Form {...form}>
      <form className="mt-12 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
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
            )
          }}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only" htmlFor="password">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  autoComplete="current-password"
                  className="p-3 outline-none"
                  placeholder="********"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-left" {...field} />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-400">
            <input
              className="w-4 h-4 border-gray-300 rounded focus:ring-indigo-500"
              id="remember-me"
              name="remember-me"
              type="checkbox"
            />
            <label className="block ml-2 text-sm" htmlFor="remember-me">
              Keep me logged in
            </label>
          </div>
          <div className="text-sm">
            <Link
              className="font-medium text-gray-400 hover:text-gray-500"
              href="/auth/forgot-password"
            >
              Forgot Password
            </Link>
          </div>
        </div>
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
          Log In
        </Button>
      </form>
    </Form>
  )
}
