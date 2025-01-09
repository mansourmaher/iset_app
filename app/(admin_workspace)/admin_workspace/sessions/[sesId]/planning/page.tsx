import { getPlaning } from "@/actions/palnning/planning";
import React from "react";
import Planning from "../../../training/[trainingId]/planning/_compoenets/addnewPlaning";

const page = async ({ params }: { params: { sesId: string } }) => {
  const planing = await getPlaning(params.sesId);

  return (
    <div className="mt-4 overflow-y-auto h-screen">
      <Planning sessionId={params.sesId} inititalPlaning={planing} />
    </div>
  );
};

export default page;
