import { auth } from "@/auth";
import React from "react";
import { AdminHeader } from "./AdminHeader";

const AdminNavbar = async () => {
  const user = await auth();
  return <AdminHeader user={user} />;
};

export default AdminNavbar;
