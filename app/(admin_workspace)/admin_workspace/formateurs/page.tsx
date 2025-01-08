import { getAllFormateurs } from "@/actions/admin/admin";
import { DataTableDemo } from "@/app/_newCompoents/table";
import React from "react";

const page = async () => {
  const formateurs = await getAllFormateurs();
  return (
    <div className="flex justify-center items-center min-h-screen px-16">
      <DataTableDemo users={formateurs} />
    </div>
  );
};

export default page;
