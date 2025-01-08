import { getFormateur } from "@/actions/trainer/trainer";
import React from "react";
import EditFormateurForm from "./_components/editformateurcompoenets";

const page = async ({ params }: { params: { formateurId: string } }) => {
  const formateur = await getFormateur(params.formateurId);

  return (
    <div className="flex justify-center  h-screen mt-16">
      <EditFormateurForm formateurr={formateur} />
    </div>
  );
};

export default page;
