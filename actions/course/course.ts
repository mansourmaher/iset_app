"use server"
import { auth } from '@/auth';
import { db } from "@/lib/db"

interface courseDetail{  
    title:string,
    descreption:string,
    imageUrl:string,
}
interface courseSettings{
    price:number,
    level:string,
    category:string,
    certificate:boolean
}


export async function createCourse(title:string){
    try{
        const user=await auth()
        if(!user){
            return null;
        }
        // if(user.user.role!="TEACHER"){
        //     return null;
        // }
      
       const course= await db.course.create({
            data:{
                
                title:title,
                description:"",
                image:"",
                price:0,
                createdById:user.user.id!,

            }
        })
        return course;

    }catch{

    }
}
export async function updateCourseDetail(courseId:string ,courseData:courseDetail){
    try{
        // check the user has the role to update this course
        await db.course.update({
            where:{
                id:courseId
            },data:{
                image:courseData.imageUrl,
                description:courseData.descreption,
                title:courseData.title
            }
        })

    }catch(e){

    }
}
export async function updateCourseSeting(courseId:string,courseSettings:courseSettings){
    try{
        // check the user has the role to update this course
        await db.course.update({
            where:{
                id:courseId
            },data:{
                price:courseSettings.price,
                level:courseSettings.level,
                category:courseSettings.category,
                certificate:courseSettings.certificate
            }
        })

    }catch(e){

    }
}

export async function getCourseById(courseId:string){
    return await db.course.findFirst({
        where:{
            id:courseId
        }
    })
}

export async function addSkillsToCourse(courseId:string,skills:string[]){
    try{
        // check the user has the role to update this course
        await db.course.update({
            where:{
                id:courseId
            },data:{
                skills:skills
                
            }
        })

    }catch(e){

    }
}
export async function getCoursesForExplorePage(){
    const courses=await db.course.findMany()
    if(courses){
        return courses;
    }
    return [];
    
}
export async function getCourseByIdForLearnPage(courseId:string){
    const course=await db.course.findFirst({
        where:{
            id:courseId
        },
        include:{
            chapters:{
                select:{
                    id:true,
                    title:true,
                    lessons:{
                        select:{
                            id:true,
                            title:true,
                            description:true,
                            video:true,
                            Quiz:true,
                            assignments:true,
                            resources:true,
                            
                        }
                    }
            },
            
        }
        }
    })
    if(course){
        return course;
    }
    return null;
    
}

export async function getCourseTitleById(courseId:string){
    const course=await db.course.findFirst({
        where:{
            id:courseId
        }
    })
    if(course){
        return course.title;
    }
    return null;
    
}