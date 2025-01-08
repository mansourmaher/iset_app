import { getAllFormateurs } from "@/actions/admin/admin";
import { getSpecificSession } from "@/actions/session/session";
import React from "react";
import Editsession from "./_compoenets/editsessionForm";

const page = async ({ params }: { params: { sesId: string } }) => {
  const session = await getSpecificSession({ sessionId: params.sesId });
  const formateurs = await getAllFormateurs();

  return (
    <div className="flex justify-center  h-screen mt-16">
      <Editsession session={session} FORMATEURS={formateurs} />
    </div>
  );
};

export default page;
