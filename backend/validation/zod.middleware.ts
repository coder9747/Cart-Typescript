import {z} from "zod";

export const UserValidationSchema = z.object({
    email:z.string({required_error:"Email Is Required"}).email({message:"Invalid Email Address"}),
    password:z.string({required_error:"Password Required"}).min(6,{message:"Password Must Be 6 Char Long"}).max(18,{message:"Password Should Be max 18 Char Long"})
})