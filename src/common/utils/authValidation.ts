import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const signupSchema = z.object({
  name: z.string().nonempty({ message: 'Invalid or missing name' }),
  email: z.string().email({ message: 'Invalid or missing email' }),
  phone: z.string().nonempty({ message: 'Invalid or missing phone' }),
  user_type: z.enum(['user', 'agent'], { message: 'Invalid or missing user_type' }),
  address: z.string().optional(),
}).refine(data => data.user_type !== 'agent' || data.address, {
  message: 'Address is required for agent type',
  path: ['address'],
});

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid or missing email' }),
});
const loginVerifySchema = z.object({
  email: z.string().email({ message: 'Invalid or missing email' }),
  token: z.string().nonempty({ message: 'Invalid or missing token' }),
});



export const validateSignup = (req: Request) => {
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.errors.map(err => err.message);
    return { success: false, errors };
  }

  return { success: true, message: 'Validation successful' };
};

export const validateLogin = (req: Request) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.errors.map(err => err.message);
    return { success: false, errors };
  }
  return { success: true, message: 'Validation successful' };

}
export const validateLoginVerify = (req: Request) => {

  const result = loginVerifySchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.errors.map(err => err.message);
    return { success: false, errors };
  }

  return { success: true, message: 'Validation successful' };
}