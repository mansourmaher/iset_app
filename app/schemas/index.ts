import { UserRole } from "@prisma/client"
import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({message: "Please enter a valid email"}),
    
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"

    })
})
export const RegisterSchema = z.object({
    firstname: z.string().min(3, {
        message: "First name must be at least 3 characters long"

    }),
    lastname: z.string().min(3, {
        message: "Last name must be at least 3 characters long"

    }),
    email: z.string().email({message: "Please enter a valid email"}),
    
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"

    }),
    role:z.nativeEnum(UserRole),
    cinNumber: z.string().regex(/^\d{8}$/, {
        message: "CIN must be an 8-digit number",
      }), 
      phoneNumber: z.string().regex(/^\d{8}$/, {
        message: "Please enter valide phone number",
      }), 
      profilePhoto:z.string().optional(),
    cv:z.string().optional(),
    specialty:z.array(z.string()).optional(),

    })
    export const UpdateFormateur = z.object({
      firstname: z.string().min(3, {
          message: "First name must be at least 3 characters long"
  
      }),
      lastname: z.string().min(3, {
          message: "Last name must be at least 3 characters long"
  
      }),
      
      role:z.nativeEnum(UserRole),
      cinNumber: z.string().regex(/^\d{8}$/, {
          message: "CIN must be an 8-digit number",
        }), 
        phoneNumber: z.string().regex(/^\d{8}$/, {
          message: "Please enter valide phone number",
        }), 
        profilePhoto:z.string().optional(),
      cv:z.string().optional(),
      specialty:z.array(z.string()).optional(),
  
      })

export const FormationSchema = z.object({
    title: z.string().min(3, {
        message: "Title must be at least 3 characters long"
      }),
      description: z.string().min(10, {
        message: "Description must be at least 10 characters long"
      }),
      duration: z.string().min(1, {
        message: "Duration must be at least 1 hour"
      }),
      image: z.string().min(1,{
        message: "Please upload an image"
      }),
      
      program: z.string().min(1,{
        message: "Please upload a program"
      }),
      difficulty: z.string().min(3, {
        message: "Difficulty must be at least 3 characters long"
      }),
      tags: z.array(z.string()).min(1, {
        message: "Please add at least one tag"
      }),
      categories: z.array(z.string()).min(1, {
        message: "Please select at least one category"
      }),
    
     
})

export const  SessionSchema=z.object({
  title:z.string().min(1,{
    message:"Title must be at least 1 character long"
  })
  ,
  description:z.string().min(1,{
    message:"Description must be at least 1 character long"
  }),
  startDate:z.string().min(1,{
    message:"Please enter a valid date"
  }),
  endDate:z.string().min(1,{
    message:"Please enter a valid date"
  }),
  formateurs:z.array(z.string()).min(1,{
    message:"Please select at least one formateur"
  }),
  trainingId:z.string().min(1,{
    message:"Please select a training"
  })
})

// model Session{
//   id String @id @default(cuid())
//   title String
//   description String
//   startDate DateTime
//   endDate DateTime
//   formateurs User[]
//   trainingId String
//   training Training @relation(fields: [trainingId], references: [id])
// }
   




