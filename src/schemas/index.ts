import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
})

export const ResetPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  token: z.string(),
  password: z.string().min(1, { message: 'Password is required' }),
  password_confirmation: z
    .string()
    .min(1, { message: 'Password Confirmation is required' }),
})
