const z = require('zod')
const { extractValidationData } = require('../common/utils/extractErrorData')

const registerSchema = z.object({
    name: z
        .string({
            invalid_type_error: 'Name must be a string',
            required_error: 'Name is required'
        })
        .min(3, {message: 'Name is too short'})
        .max(50, {message: 'Name is too long'}),
    email: z    
        .string()
        .email({message: 'Invalid email'}),
    password: z 
        .string()
        .min(8, {message: 'Password must be at least 8 characters'}),
    role: z
        .enum(['client', 'employee'])
    })

const loginSchema = z.object({
    email: z
        .string()
        .email(),
    password: z 
        .string()
})

function validateUser(data) {
    const result = registerSchema.safeParse(data)

    const {
        hasError,
        errorMessages,
        data: userData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        userData
    }
}

function validatePartialUser(data){
    const result = registerSchema.partial().safeParse(data)

    const {
        hasError,
        errorMessages,
        data: userData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        userData
    }
}

function validateLogin(data) {
    const result = loginSchema.safeParse(data)

    const {
        hasError,
        errorMessages,
        data:userData
    } = extractValidationData(result)

    return {
        hasError,
        errorMessages,
        userData
    }
}

module.exports = {
    validateLogin,
    validateUser,
    validatePartialUser
}