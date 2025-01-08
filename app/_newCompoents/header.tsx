"use client";
import Link from "next/link";
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from "@headlessui/react";
import clsx from "clsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "../_landingPageComponents/Button";
import { Container } from "../_landingPageComponents/Container";
import { Logo } from "../_landingPageComponents/Logo";
import { NavLink } from "../_landingPageComponents/NavLink";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoutBtn from "../_landingPageComponents/logoutbtn";
import { User } from "@prisma/client";

interface userProps {
  user: any;
}
export function Header({ user }: userProps) {
  return (
    <div className="py-2 border-b-2 mb-4 fixed inset-x-0 bg-white z-50">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="#" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/espace_condidat/trainings">Training</NavLink>

              {!user && (
                <>
                  <NavLink href="/espace_condidat">Applicants' Area</NavLink>
                  <NavLink href="/espace_trainer">Trainers' area</NavLink>
                </>
              )}
              {user && user.user.role == "FORMATEUR" && (
                <NavLink href="/espace_trainer">My formations</NavLink>
              )}
              {user && user.user.role == "STUDENT" && (
                <NavLink href="/espace_condidat/myapplication">
                  My applications
                </NavLink>
              )}
            </div>
          </div>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="rounded-full  cursor-pointer w-8 h-8">
                  <AvatarImage
                    src={user?.user.image || ""}
                    alt="User profile"
                  />

                  <AvatarFallback>{user?.user.email[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/setup-account">Setup Account</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <LogoutBtn />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-x-5 md:gap-x-8">
              <Button href="/register" color="blue">
                <span>
                  Get started <span className="hidden lg:inline">today</span>
                </span>
              </Button>
            </div>
          )}
        </nav>
      </Container>
    </div>
  );
}
