"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"



export async function getAllFormateurs(){
    try{
        const user=await auth()
        if(!user)
        {
            return {error:"Not authenticated"}
        }
        if(user.user.role!=="ADMIN")
        {
            return {error:"Not authorized"}
        }
        const formateurs=await db.user.findMany({
            where:{
                role:"FORMATEUR"
            }
        })
        return formateurs

    }catch(e){
        console.log(e)
    }
}

export async function changeStatusOfuser(userId:string){
    try{
        const user=await auth()
        if(!user)
        {
            return {error:"Not authenticated"}
        }
        if(user.user.role!=="ADMIN")
        {
            return {error:"Not authorized"}
        }
        const userToUpdate=await db.user.findUnique({
            where:{
                id:userId
            }
        })
        if(!userToUpdate)
        {
            return {error:"User not found"}
        }
        const updatedUser=await db.user.update({
            where:{
                id:userId
            },
            data:{
                active:!userToUpdate.active
            }
        })
        return updatedUser
    }catch(e){
        console.log(e)
    }
}

export async function getDashboardData(){
    try{
        const user=await auth()
        if(!user)
        {
            return {error:"Not authenticated"}
        }
        if(user.user.role!=="ADMIN")
        {
            return {error:"Not authorized"}
        }
        const users=await db.user.count( )
        const sessions=await db.session.count()
        const applications=await db.application.count()
        const trainings=await db.training.count()
        return {users,sessions,applications,trainings}
    }catch(e){
        console.log(e)
    }
}