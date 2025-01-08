"use server"

import { signOut } from "@/auth";

export  const  logout=async()=>
{
    
     await signOut()
     
      return {redirect: { destination: '/home', permanent: false }}

    
}