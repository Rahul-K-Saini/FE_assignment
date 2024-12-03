import { z } from "zod"

export const addressSchema = z.object({
    street: z.string().trim().min(3, { message: "Street name must be at least 3 characters" }).refine((value) => /^[A-Za-z\s\d]+$/.test(value), { message: "Street name can only contain letters, numbers and spaces" }),
    city: z.string().trim().min(3, { message: "City name must be at least 3 characters" }).refine((value) => /^[A-Za-z\s]+$/.test(value), { message: "City name can only contain letters and spaces" }),
    state: z.string().trim().min(3, { message: "State name must be at least 3 characters" }).refine((value) => /^[A-Za-z\s]+$/.test(value), { message: "State name can only contain letters and spaces" }),
    zipCode: z.string().trim().optional().refine((value) => !value || /^\d+$/.test(value), { message: "Zip code must contain only numbers" })
})

export const paymentSchema = z.object({
    cardNumber: z.string().trim().min(16, { message: "Card number must be at least 16 digits" }).refine((value) => /^\d+$/.test(value), { message: "Card number must contain only numbers" }),
    expiryDate: z.string().trim().min(1, { message: "Expiry date is required" }),
    cvv: z.string().trim().min(3, { message: "CVV must be at least 3 digits" }).refine((value) => /^\d+$/.test(value), { message: "CVV must contain only numbers" }),
    cardholderName: z.string().trim().min(2, { message: "Cardholder name must be at least 2 characters" }).refine((value) => /^[A-Za-z\s]+$/.test(value), { message: "Cardholder name can only contain letters and spaces" })
})

export const userSchema = z.object({
    firstName: z.string().trim().min(3, { message: "First Name should be at least 3 Characters" }).refine((value) => /^[A-Za-z]+$/.test(value), { message: "First name can only contain letters" }),
    lastName: z.string().trim().min(2, { message: "Last Name should be at least 2 Characters" }).refine((value) => /^[A-Za-z]+$/.test(value), { message: "Last name can only contain letters" }),
    age: z.string().trim().optional().refine((value) => !value || /^\d+$/.test(value), { message: "Age must contain only numbers" })
})