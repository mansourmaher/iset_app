"use server"

import { UpdateFormateur } from "@/app/schemas"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { z } from "zod"



export async function getAllMysessionAffectedToMe(){
    try{

        const user=await auth()
        if(!user)
        {
            return {error:"User not found"}
        }
        if(user.user.role!=="FORMATEUR")
        {
            return {error:"You are not allowed to access this page"}
        }
        const mysession=await db.sessionOnUser.findMany({
            where:{
                userId:user.user.id
            },
            
            include:{
                
                session:{
                    include:{
                        training:{
                            select:{
                                title:true,
                                description:true,
                                duration:true,
                                category:true,
                               
                            }
                            
                        
                    
                }
            }
        }
            }
        })
        return mysession

    }catch(e)
    {
        console.log(e)
    }
}

export async function getAllsessionForAdmin()
{
    try{

        const user=await auth()
        if(!user)
        {
            return {error:"User not found"}
        }
        if(user.user.role!=="ADMIN")
        {
            return {error:"You are not allowed to access this page"}
        }
        const mysession=await db.session.findMany({
           
           
                    include:{
                        training:{
                            select:{
                                title:true,
                                description:true,
                                duration:true,
                                category:true,
                               
                            }
                            
                        
                    
                }
            }
        
            
        })
        return mysession

    }catch(e)
    {
        console.log(e)
    }

}

export async function getFormateur(id:string){
    const user=await auth()
    if(!user)
    {
        return {error:"User not found",user:null}
    }
    if(user.user.role!=="ADMIN")
    {
        return {error:"You are not allowed to access this page",user:null}
    }
    const formateur=await db.user.findUnique({
        where:{
            id
        }
    })
    return {error:null,user:formateur}
}

export async function updateFormateur(data:z.infer<typeof UpdateFormateur>,id:string){
    
        const user=await auth()
        if(!user)
        {
            return {error:"User not found"}
        }
        if(user.user.role!=="ADMIN")
        {
            return {error:"You are not allowed to access this page"}
        }
        const existingFormateur=await db.user.findUnique({
            where:{
                id
            }
        })
        if(!existingFormateur)
        {
            return {error:"User not found"}
        }
        const {firstname,lastname,role,cv,phoneNumber,profilePhoto,cinNumber,specialty}=data

        const formateur=await db.user.update({
            where:{
                id
            },
            data:{
                name:firstname,
                lastName:lastname,
                role:role,
                photo:profilePhoto,
                cv:cv,
                number:phoneNumber,
                cinNumber:cinNumber,
                specialty:specialty
            }
        })
        return {error:null,success:"User updated successfully"}
    
}

export async function getAllTrainer(){
    const user=await auth()
    if(!user)
    {
        return {error:"User not found",user:null}
    }
    if(user.user.role!=="ADMIN")
    {
        return {error:"You are not allowed to access this page",user:null}
    }
    const student=await db.user.findMany({
        where:{
            role:"STUDENT"
        }
    })
    return {error:null,user:student}
}
export async function getTrainer(id:string){
    const user=await auth()
    if(!user)
    {
        return {error:"User not found",user:null}
    }
    if(user.user.role!=="ADMIN")
    {
        return {error:"You are not allowed to access this page",user:null}
    }
    const formateur=await db.user.findUnique({
        where:{
            id
        }
    })
    return {error:null,user:formateur}
}
