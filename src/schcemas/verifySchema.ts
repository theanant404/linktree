import {z} from 'zod'
import { emailValidation } from './singUpSchema'
export const varificationSchema = z.object({
    code: z.string().length(6),
    email:emailValidation
})
