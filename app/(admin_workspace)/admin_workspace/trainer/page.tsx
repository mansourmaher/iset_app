import { getAllFormateurs } from "@/actions/admin/admin";
import { getAllTrainer } from "@/actions/trainer/trainer";
import { DataTableDemo } from "@/app/_newCompoents/table";
import React from "react";
import { StudentTable } from "./_compoenets/table";

const page = async () => {
  const response = await getAllTrainer();
  if (response.error) {
    return <div>{response.error}</div>;
  }
  

  return (
    <div className="flex justify-center items-center min-h-screen px-16">
      <StudentTable response={response} />
    </div>
  );
};

export default page;
