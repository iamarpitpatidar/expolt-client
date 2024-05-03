import * as z from 'zod'
import { __ } from '@lib/utils'

export const LoginSchema = z.object({
  email: z.string().email({ message: __('auth.invalidEmail') }),
  password: z
    .string()
    .min(1, { message: __('common.isRequired', ['Password']) }),
})

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: __('auth.invalidEmail') }),
})

export const ResetPasswordSchema = z.object({
  email: z.string().email({ message: __('auth.invalidEmail') }),
  token: z.string(),
  password: z
    .string()
    .min(1, { message: __('common.isRequired', ['Password']) }),
  password_confirmation: z
    .string()
    .min(1, { message: __('common.isRequired', ['Password Confirmation']) }),
})
