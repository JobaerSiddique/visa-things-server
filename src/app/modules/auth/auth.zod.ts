import { z } from "zod";

export const UserValidation = z.object({
    body:z.object({
        name:z.string(),
        email:z.string({message:"Please Validate Email must be required"}),
        password:z.string(),
        phone:z.string(),
      

        
    })
})

export const LoginUserValidation = z.object({
    body:z.object({
       
        email:z.string({message:"Please Validate Email must be required"}),
        password:z.string(),
       
})
})



