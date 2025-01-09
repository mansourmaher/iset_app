"use server"

import { PlanningSchema } from "@/app/schemas";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { z } from "zod";


export async function addPlanning(data:z.infer<typeof PlanningSchema>,sessionId:string){
    const user=await auth()
    if(!user){
        return {error:"You must be authenticated"}
    }
    if(user.user.role!=="ADMIN")
    {
        return {error:"You must be authenticated"}
    }
    console.log(data)
    const planning=await db.sessionPlaning.create({
        data:{
            date:new Date(data.date),
            startDatetime:data.startDatetime,
            endDatetime:data.endDatetime,
            description:data.descreption,
            sessionId:sessionId
        }

    })
    if(planning){
        return {success:"Planing add successfully"}
    }
}
export async function getPlaning(sessionid:string){
    const user=await auth()
    if(!user){
        return {error:"You must be authenticated"}
    }
    if(user.user.role!=="ADMIN")
    {
        return {error:"You must be authenticated"}
    }
    const planning=await db.sessionPlaning.findMany({
        where:{
            sessionId:sessionid
        }
    })
    return {planning}
}