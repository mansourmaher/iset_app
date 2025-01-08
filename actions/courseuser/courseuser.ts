"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { error } from "console"


export async function existpurchase(courseId:string)
{
    try{
        const user=await auth()
        if(!user)
        {
            return null
        }
        const courseuser=await db.courseUser.findFirst({
            where:{
                userId:user.user.id,
                courseId:courseId
            }
        })
        return courseuser ? true:false

    }catch(e)
    {
        console.log(e)
    }
}
export async function createpurchase(courseId:string)
{
    try{
        const user=await auth()
        if(!user)
        {
            return null
        }
        const existingpurchase=await db.courseUser.findFirst({
            where:{
                courseId:courseId,
                userId:user.user.id
            }
        })
        if(existingpurchase)
        {
            return {error:'You alreday purchased this course'}
        }
        else{
           const courseuser= await db.courseUser.create({
                data:{
                    userId:user.user.id!,
                    courseId:courseId
                }
            })
            if(courseuser)
            {
                return {suscce:"Course purchased succefuly"}
            }
            return {error:"error happend while purchasing this course"}

        }

    }catch(e)
    {
        console.log(e)
    }
}