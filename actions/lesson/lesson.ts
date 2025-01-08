"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";



interface LessonContent {
    title:string
    description:string
    video:string
}
interface Resource {
    id?:string
    title:string
    url:string
    estimatedTime:number |null
    descreption:string |null
}

export async function getLessonById(leessonId:string){
    try{
        // Check if the user is authenticated - TODO

        // Get the lesson by its id
        const lesson = await db.lesson.findFirst({
            where: { id: leessonId },
        });

        if (!lesson) {
            throw new Error("Lesson not found");
        }

        return lesson;
    }catch(e)
    {
        console.log(e);
    }
}
export async function updateLessonContent(lessonContent:LessonContent,lessonId:string){
    try{
        // Check if the user is authenticated - TODO

        // Update the lesson content
        const updatedLesson = await db.lesson.update({
            where: { id: lessonId },
            data: lessonContent,
        });

        return updatedLesson;

    }catch(e){
        console.log(e);
    }
}

export async function getAllresourcesPerLesson(lessonId:string){
    try{
        // Check if the user is authenticated - TODO

        // Get all resources for the lesson
        const resources = await db.resource.findMany({
            where: { lessonId },
            select:{
                title:true,
                url:true,
                id:true,
                descreption:true,
                estimatedTime:true,

            }
        });

        return resources;
    }catch(e){
        console.log(e);
    }
}
export async function addResourceToLesson(lessonId:string,resource:Resource[]){
    try{
        // Check if the user is authenticated - TODO

        // Add a resource to the lesson
        const newResource = await db.resource.createMany({
            data: resource.map((res) => ({
                ...res,
                lessonId,
            })),
        });
        revalidatePath(`/formateur/create/cm364rlma000010uy1woldxiv/module/cm364tobo000110uy4ouixib4`);

        return newResource;
    }catch(e){
        console.log(e);
    }
}
export async function changeLessonVisibility(lessonId:string,visibility:boolean){
    try{
        // Check if the user is authenticated - TODO

        // Change the lesson visibility
       
        const updatedLesson = await db.lesson.update({
            where: { id: lessonId },
            data: { private: visibility },
        });

        return updatedLesson;
    }catch(e){
        console.log(e);
    }
}
export async function updateResourceDeatil(resources:Resource[]){

   try{
    const user=await auth()
    if(!user)
    {
        return null
    }
    for(const res of resources){
        const estimatedTime = typeof res.estimatedTime === "string" 
        ? parseFloat(res.estimatedTime) 
        : res.estimatedTime;
        const updateResourceDetail=await db.resource.update({
            where:{
                id:res.id
            },
            data:{
                estimatedTime:estimatedTime,
                descreption:res.descreption
            }
        })
    }
    
   

   }catch(e)
   {
    console.log(e)
   }

}
// export async function POST(req: Request) {
//     try {
//       const user =await  auth();
//       const userId=user?.user.id
//       const { courseId, chapterId,questions,optionss,name,isYesOrNo,correctOption } = await req.json();
      
     
//       const optionReal = [optionss[0], optionss[1]];
//       console.log(isYesOrNo)
      
  
//       if (isYesOrNo) {
//         optionReal.push(optionss[2], optionss[3]);
//       }
  
//       const filteredOptions = optionss.filter((option: null | undefined) => option !== null && option !== undefined && option !== "");
      
//       filteredOptions.unshift(correctOption);
     
  
  
  
       
      
//       const options=await db.options.create({
//           data:{
//             options:filteredOptions,
//             quizId:"1",
//             correctOption:correctOption
              
//           }
//       })
//       const quiz= await db.quiz.create({ 
//           data:{
//               courseId:courseId,
//               chapterId:chapterId,
//               question:questions,
//               answer:'1',
//               options:{
//                   connect:{
//                       id:options.id
//                   }
//               }
          
//           }
//        });
//        revalidatePath(`/api/courses/${courseId}/chapters/${chapterId}`);
//        return new NextResponse("200")
//     } catch (e) {
//       console.log(e);
//       return new NextResponse("200")
//     }
//   }
type Quiz = {
    question: string;
    correctOption: string;
    options: (string | null | undefined)[];
};



// Refactored addQuizToLesson function
export async function addQuizToLesson(lessonId: string, quiz: Quiz) {
    try {
        // Filter out null, undefined, or empty string options
        console.log(quiz.options);
        console.log(quiz.correctOption);

        const filteredOptions = quiz.options.filter(
            (element) => element !== null && element !== undefined && element !== ""
        ) as string[];

        // Add the correct option to the beginning of the filtered options array
        filteredOptions.unshift(quiz.correctOption);

        // Create options in the database
        const createdOptions = await db.options.create({
            data: {
                options: filteredOptions,
                correctOption: quiz.correctOption,
                quizId: "1",
            },
        });

        // Create the quiz associated with the lesson
        const newQuiz = await db.quiz.create({
            data: {
                answer: quiz.correctOption,
                question: quiz.question,
                options: {
                    connect: {
                        id: createdOptions.id,
                    },
                },
                lessonId: lessonId,
            },
        });

        // Return the new quiz if creation was successful
        if (newQuiz) {
            return {success: true, quiz: newQuiz};
        } else {
            return  { error: "An error occurred while creating the quiz." };
        }
    } catch (e) {
        console.error("Error creating quiz:", e);
        return { error: "An error occurred while creating the quiz." };
    }
}
export  async function getAllQuizBylesson(lessonId:string){
    try{
        const quiz=await db.quiz.findMany({
            where:{
                lessonId:lessonId
            },
            include:{
                options:true
            }

        })
        if(quiz)
        {
            return {success:true,quiz:quiz}}
            
        else return {error:"An error occured while fetching quiz"}

    }catch(e)
    {
        console.log(e)
    }
}
export async function getLessonTitleById(lessonId:string){
    try{
        const lesson=await db.lesson.findFirst({
            where:{
                id:lessonId
            },
            select:{
                title:true
            }
        })
        return lesson
    }catch(e){
        console.log(e)
    }
}
export async function getLessonDetailsById(lessonId:string){
    try{
        const user=await auth()
        if(!user)
        {
            return null
        }
        const lesson=await db.lesson.findFirst({
            where:{
                id:lessonId
            },
            include:{
                resources:true
            }
        })
        return lesson

    }catch(e)
    {
        console.log(e)
    }
}
export async function getResourceById(resId:string |undefined){
    try{
        if(!resId)
        {
            return null
        }
        const user=await auth()
        if(!user){
            return  null
        }
        const res=await db.resource.findFirst({
            where:{
                id:resId
            }
        })
        return res

    }catch(e)
    {
        console.log(e)
    }
}
export async function getAllresourcesByLesson(lessonId:string)
{
    try{
        const user=await auth()
        if(!user)
        {
            return null
        }
        const resources=await db.resource.findMany({
            where:{
                lessonId:lessonId
            }

        })
        return resources

    }catch(e)
    {
        console.log(e)
    }
}