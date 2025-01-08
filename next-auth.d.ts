import { Origin, UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  
  role: UserRole;
  isOAuth: boolean;
  teacherAccess: boolean;
  DateOfBirth: Date | null;
  filier: string;
  origin: Origin;
  about: string;
  createdAt: Date;
  subtitle: string;
  patients: string[];
  password: string;
  points: number;
  linkedin: string;
  github: string;
  twitter: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}