"use server";

import { db } from "@/lib/db";

interface Lesson {
    title: string;
}

interface Chapter {
    title: string;
    lessons: Lesson[];
}

export async function addChapters(chapters: Chapter[], courseId: string) {
    try {
        // Check if the user is authenticated - TODO

        // Loop through each chapter to either create or update it
        
        for (const chapter of chapters) {
            const existingChapter = await db.chapter.findFirst({
                where: { title: chapter.title, courseId },
            });

            if (!existingChapter) {
                // If chapter doesn't exist, create it with its lessons
                await db.chapter.create({
                    data: {
                        title: chapter.title,
                        courseId: courseId,
                        lessons: {
                            create: chapter.lessons.map((lesson) => ({
                                title: lesson.title,
                                courseId: courseId,
                            })),
                        },
                    },
                });
            } else {
                // If chapter exists, add only new lessons
                for (const lesson of chapter.lessons) {
                    const existingLesson = await db.lesson.findFirst({
                        where: { title: lesson.title, chapterId: existingChapter.id },
                    });

                    if (!existingLesson) {
                        await db.lesson.create({
                            data: {
                                title: lesson.title,
                                chapterId: existingChapter.id,
                                courseId: courseId,
                            },
                        });
                    }
                }
            }
        }

        console.log("Chapters and lessons added/updated successfully.");
    } catch (error) {
        console.error("Error adding/updating chapters and lessons: ", error);
    }
}
export async function getAllchaptersPerCourse(courseId: string) {
    try {
        const chapters = await db.chapter.findMany({
           where:{
            courseId:courseId
           },select:{
            id:true,
            title:true,
            lessons:{
                select:{
                    id:true,
                    title:true,
                    resources:true,
                    video:true,
                    Quiz:true,

                }
            }
           },
           orderBy:{
            createdAt:"asc"
           }
            

        });

        return chapters;
    } catch (error) {
        console.error("Error getting chapters for course: ", error);
    }
}
export async function getChapterTitleById(chapterid:string){
    try{
        const chapter=await db.chapter.findFirst({
            where:{
                id:chapterid
            }
        })
        if(chapter){
            return chapter.title;
        }
        return null;
    }catch(e){
        console.error("Error getting chapter title by id: ", e);
    }

}

