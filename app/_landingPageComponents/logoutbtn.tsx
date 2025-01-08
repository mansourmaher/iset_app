"use client";

import { logout } from "@/actions/auth/logout";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";

function LogoutBtn() {
  const handelLogout = async () => {
    await logout();
  };
  return (
    <DropdownMenuItem onClick={handelLogout} asChild>
      <div className="flex items-center justify-between cursor-pointer">
        Sign out
        <FaSignOutAlt />
      </div>
    </DropdownMenuItem>
  );
}

export default LogoutBtn;
