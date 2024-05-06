import { z } from 'zod'
import { Fragment } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { AppActionSchema } from '@/schemas/apps'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'

type FormValues = z.infer<typeof AppActionSchema>
export default function AppFormFields({
  form,
}: {
  form: UseFormReturn<FormValues>
}) {
  return (
    <Fragment>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                autoComplete="name"
                placeholder="Name"
                {...field}
                className="px-3 py-1"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input
                autoComplete="description"
                placeholder="Description"
                {...field}
                className="px-3 py-1"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {form.getValues('meta.redirectTo') !== '' && (
        <FormField
          control={form.control}
          name="meta.redirectTo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  autoComplete="url"
                  placeholder="Redirect URL"
                  {...field}
                  className="px-3 py-1"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </Fragment>
  )
}
