import {z} from 'zod'
import { password } from './singUpSchema'
export const forgotpasswordSchema = z.object({
    code: z.string().length(6),
    password:password,
})
