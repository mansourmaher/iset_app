"use server"

import { FormationSchema } from "@/app/schemas";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { string, z } from "zod";



export async function addNewTraining(values:z.infer<typeof FormationSchema>){
    const validateFiels=FormationSchema.safeParse(values)
        if(!validateFiels.success)
        {
            return {error:"Invalid fields"}
        }
        const {title,description,duration,program,difficulty,tags,categories,image}=validateFiels.data

        const training=await db.training.create({
            data:{
                title,
                description,
                duration,
                program,
                difficulty,
                tags,
                image,
                category:categories
                
            }
        })
        return {success:"Training added successfully",training:training}
        

}
export async function getallTraining(){
    const training=await db.training.findMany()
    return training
}
export async function getallTraining2(categ:string |undefined,tag:string|undefined){
    console.log(categ,tag)
    if(!categ && !tag){
        const training=await db.training.findMany()
        return training
    }
    if(!categ){
        const training=await db.training.findMany({
            where:{
                tags:{
                    has:tag
                }
            }
        })
        return training
    }
    if(!tag){
        const training=await db.training.findMany({
            where:{
                category:{
                    has:categ
                }
            }
        })
        return training
    }

    const training=await db.training.findMany({
        where:{
            category:{
                has:categ
            },
            tags:{
                has:tag
            }
            
        }
    })
    return training
}
export async function getDistinctTags(){
    const arrayTags: string[] = []
    const tags=await db.training.findMany({
        select:{
            tags:true
        }
    })
    tags.forEach(tag=>{
        tag.tags.forEach(t=>{

            if(!arrayTags.includes(t)){
                arrayTags.push(t)
            }
        })
    })
    return arrayTags
    

}




export async function getTrainingById(id:string){

    const training=await db.training.findFirst({
        where:{
            id
        }
    })
    return training
}
export async function getAllsesions(){
    const sessions=await db.session.findMany({
        include:{
            training:true
        }
    })
    return sessions
}

export async function getSpecificTraing(id:string){
    const training=await db.training.findFirst({
        where:{
            id
        },include:{
            Session:{
                where:{
                    trainingId:id
                },
                include:{
                    formateurs:{
                        include:{
                            user:true
                        }
                    }
                }
            }
        }
    })
    return training
}

export async function updatetraining(data:z.infer<typeof FormationSchema>,id:string){
    const validateFiels=FormationSchema.safeParse(data)
    if(!validateFiels.success)
    {
        return {error:"Invalid fields"}
    }
    const user=await auth()
    if(!user){
        return {error:"User not found"}
    }
    if(user.user.role!=="ADMIN"){
        return {error:"You are not authorized to perform this action"}
    }
    const trainingExist=await db.training.findFirst({
        where:{
            id
        }
    })
    if(!trainingExist){
        return {error:"Training not found"}
    }
    
    const {title,description,duration,program,difficulty,tags,categories,image}=validateFiels.data
    const training=await db.training.update({
        where:{
            id
        },
        data:{
            title,
            description,
            duration,
            program,
            difficulty,
            tags,
            image,
            category:categories
            
        }
    })
    return {success:"Training updated successfully",training:training}

}

export async function deletetraining(id:string){
    const user=await auth()
    if(!user){
        return {error:"User not found"}
    }
    if(user.user.role!=="ADMIN"){
        return {error:"You are not authorized to perform this action"}
    }
    const trainingExist=await db.training.findFirst({
        where:{
            id
        }
    })
    await db.application.deleteMany({
        where:{
            session:{
                trainingId:id
            }
        }
    })
    await db.sessionOnUser.deleteMany({
        where:{
            session:{
                trainingId:id
            }
        }
    })
    await db.session.deleteMany({
        where:{
            trainingId:id
        }
    })
    
    if(!trainingExist){
        return {error:"Training not found"}
    }
    const training=await db.training.delete({
        where:{
            id
        }
    })
    return {success:"Training deleted successfully",training:training}
}

