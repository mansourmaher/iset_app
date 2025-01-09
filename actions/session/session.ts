"use server"

import { SessionSchema } from "@/app/schemas";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { string, z } from "zod";


export async function addnewssesion({trainingId,title,description,startDate,endDate,formateurs}:{trainingId:string,title:string,description:string,startDate:string,endDate:string,formateurs:string[]}){
    
       
        const newsession=await db.session.create({
            data:{
                title,
                description,
                startDate,
                endDate,
                trainingId
            }
        })
        if(!newsession){
            return {error:"Error creating session"}
        }
        const sessionformateurs=await db.sessionOnUser.createMany({
            data:formateurs.map((formateurId:string)=>({
                userId:formateurId,
                sessionId:newsession.id
            }))
        })
        if(!sessionformateurs){
            return {error:"Error creating session formateurs"}
        }
        return {success:"Session created successfully"}



    
}

export async function getSpecificSession({sessionId}:{sessionId:string}){
    const session=await db.session.findUnique({
        where:{
            id:sessionId
        
        },
        include:{
            formateurs:{
               include:{
                user:{
                    select:{
                        email:true,
                        id:true
                    }
                }
               }
            },
                        training:{
                            select:{
                                title:true,
                                description:true,
                                duration:true,
                                category:true,
                                tags:true
                               
                            }
                            
                        
                    
                }
            }
        }
        
    )
    if(!session){
        return {error:"Session not found"}
    }
    return {session}
}
export async function handelDeletesession(sessionId:string)
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
        const deleteallsessiononuser=await db.sessionOnUser.deleteMany({
            where:{
                sessionId
            }
        })
        await db.application.deleteMany({
            where:{
                sessionId
            }
        })
        await db.sessionPlaning.deleteMany({
            where:{
                sessionId
            }
        })
        await db.session.delete({
            where:{
                id:sessionId
            }
        })

    }catch(e)
    {
        console.log(e)
    }
}

export async function addNewApplication(sessionId:string){
    const user=await auth()
    if(!user)
    {
        return {error:"User not found"}
    }
    const session=await db.session.findUnique({
        where:{
            id:sessionId
        }
    })
    if(!session)
    {
        return {error:"Session not found"}
    }
    const app=await db.application.findFirst({
        where:{
            userId:user.user.id!,
            sessionId
        }
    })
    if(app)
    {
        return {error:"You have already applied to this session"}
    }
    
    const application=await db.application.create({
        data:{
            userId:user.user.id!,
            sessionId
        }
    })
    if(!application)
    {
        return {error:"Error creating application"}
    }
    return {success:"Application created successfully"}

}

export async function sessionWhereuserhaveapplied(){
    const user=await auth()
    if(!user)
    {
        return {error:"User not found"}
    }
    const applications=await db.application.findMany({
        where:{
            userId:user.user.id!
        },
        include:{
            session:{
                include:{
                    training:true
                }
            }
        }
    })
    return {applications}
}

export async function deleteApplication(id:string){
    const user=await auth()
    if(!user)
    {
        return {error:"User not found"}
    }
    const applications=await db.application.findFirst({
        where:{
            sessionId:id,
            userId:user.user.id!

        }
    })
    if(!applications)
    {
        return {error:"Application not found"}
    }

    const application=await db.application.deleteMany({
        where:{
            sessionId:id,
            userId:user.user.id!
        }
    })
    if(!application)
    {
        return {error:"Error deleting application"}
    }
    return {success:"Application deleted successfully"}
}
export async function updatesession(data:z.infer<typeof SessionSchema>,sessionId:string,selectedFormateurs:string[]){
    const user=await auth()
    if(!user)
    {
        return {error:"User not found"}
    }
    if(user.user.role!=="ADMIN")
    {
        return {error:"You are not allowed to access this page"}
    }
    const existingsession=await db.session.findUnique({
        where:{
            id:sessionId
        }
    })
    if(!existingsession)
    {
        return {error:"Session not found"}
    }
    const startDate=new Date(data.startDate)
    const endDate=new Date(data.endDate)

    const session=await db.session.update({
        where:{
            id:sessionId
        },
        data:{
            title:data.title,
            description:data.description,
            startDate:startDate,
            endDate:endDate
            
        }
    })
    if(!session)
    {
        return {error:"Error updating session"}
    }
    console.log("actions  +"+selectedFormateurs)
    const sessionformateurs=await db.sessionOnUser.deleteMany({
        where:{
            sessionId
        }
    })
    if(!sessionformateurs)
    {
        return {error:"Error updating session formateurs"}
    }
    const sessionformateurs2=await db.sessionOnUser.createMany({
        data:selectedFormateurs.map((formateurId:string)=>({
            userId:formateurId,
            sessionId
        }))
    })
    if(!sessionformateurs2)
    {
        return {error:"Error updating session form ateurs"}
    }
    return {success:"Session updated successfully"}
}

export async function getSessionApplication(){
    const user=await auth()
    if(!user)
    {
        return {error:"User not found"}
    }
    if(user.user.role!=="ADMIN")
    {
        return {error:"You are not allowed to access this page"}
    }
    const session=await db.session.findMany({
        select:{
            id:true,
            title:true,
           
        }
    })
    if(!session)
    {
        return {error:"Session not found"}
    }
    const arraysessionwithapplength= []
    for (const sess of session) {
        const applicationlength=await db.application.count({
            where:{
                sessionId:sess.id
            }
        })
        arraysessionwithapplength.push({...sess,applicationlength})
    }
    return {sessions:arraysessionwithapplength}
}