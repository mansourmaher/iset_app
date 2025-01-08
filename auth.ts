import { getUserById } from './app/data/user';
import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { Prisma } from '@prisma/client';
import { db } from './lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
export const {
    handlers:{GET,POST},
    auth,
    signIn,
    signOut,
   

}=NextAuth({
    pages:{
        signIn:'/sign-in',
        error:'/error',
    },
    events:{
        async linkAccount({user})
        {
            await db.user.update({
                where:{
                    id:user.id
                },
                data:{
                    
                }
            

            })
        }
    },

    callbacks:{
       async signIn({user,account})
       {
        
        
        if(account?.provider !=="credentials")return true;
       
        const existingUser=await getUserById(user.id as string);
        if(!existingUser) return false;
        

        return true
       },
      // @ts-ignore
        async session({token,session})
        {
            
           
            if(token.sub && session.user)
            {
                session.user.id=token.sub
            }
            if(token.role && session.user)
            {
                // @ts-ignore
                session.user.role=token.role
            }
            return session
        },
        async jwt({token})
        {
            
            if(!token.sub) 
            return token
        const existingUser=await getUserById(token.sub)
        if(!existingUser) return token
        token.role=existingUser.role
        
        
       
        
        
        
        return token

        
        
        }
    },
    // @ts-ignore
    adapter:PrismaAdapter(db),
    
    session:{strategy:'jwt'},

    ...authConfig,

    
})