import { getTrainingById } from "@/actions/training/training";
import React from "react";
import NewSessionForm from "../_compoenets/newSession";
import { getAllFormateurs } from "@/actions/admin/admin";

interface SerachParams {
  sessionId: string;
}

const page = async ({ params }: { params: { sessionId: string } }) => {
  const formateurs = await getAllFormateurs();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <NewSessionForm trainingId={params.sessionId} FORMATEURS={formateurs} />
    </div>
  );
};

export default page;
