import {z} from 'zod'
export const usernameValidation = z.string().min(2).max(20).regex(/^[a-zA-Z0-9_]*$/, 'Username can only contain letters, numbers and underscores');
export const emailValidation = z.string().email().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Invalid email address');
export const password = z.string()
.min(5, "Password must be at least 5 characters long.")
// .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
// .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
// .regex(/\d/, "Password must contain at least one number.")
// .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character.");
export const signUpSchema = z.object({
    name: z.string().min(2).max(50),
    username: usernameValidation,
    email: emailValidation,
    password: password,

})
