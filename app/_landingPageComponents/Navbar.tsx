import { auth } from "@/auth";
import React from "react";
import { Header } from "./Header";

const Navbar = async () => {
  const user = await auth();
  return <Header user={user} />;
};

export default Navbar;
