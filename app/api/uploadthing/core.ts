import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
const handelAuth=()=>{
    const userId="mpasas"
    if(!userId) throw new Error("You must be signed in to access this route")
    return {userId};
}
 

export const ourFileRouter = {
    courseImage:f({image:{maxFileSize:"4MB",maxFileCount:1}})
    .middleware(()=>handelAuth())
    .onUploadComplete(()=>{}),
    lessonVideo:f({video:{maxFileSize:"1GB",maxFileCount:1}})
    .middleware(()=>handelAuth())
    .onUploadComplete(()=>{}),
    lessonFile:f({pdf:{maxFileSize:"1GB",maxFileCount:4}})
    .middleware(()=>handelAuth())
    .onUploadComplete(()=>{}),

    // Add more routes here
    photoProfile:f({image:{maxFileSize:"4MB",maxFileCount:1}})
    .middleware(()=>handelAuth())
    .onUploadComplete(()=>{}),
    cv:f({pdf:{maxFileSize:"1GB",maxFileCount:1}})
    .middleware(()=>handelAuth())
    .onUploadComplete(()=>{}),
    
    
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;