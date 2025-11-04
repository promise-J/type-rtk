import {z} from 'zod'

export const registerUserSchema = z.object({
    username: z.string('Usernamer must be a string').min(1, 'Username is required'),
    email: z.email('Invalid email address'),
    password: z.string('Password is required').min(6, 'Password must be at least 6 characters').max(40, 'Password must not be more than 40 characters')

})

export const loginUserSchema = z.object({
    email: z.email('Invalid email address'),
    password: z.string('Password is required').min(6, 'Password must be at least 6 characters').max(40, 'Password must not be more than 40 characters')
})