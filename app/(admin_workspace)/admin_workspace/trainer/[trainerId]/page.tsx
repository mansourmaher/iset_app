import React from "react";
import Edittrainerform from "./_compoents/edittrainerform";
import { getTrainer } from "@/actions/trainer/trainer";

const page = async ({ params }: { params: { trainerId: string } }) => {

  const trainer=await getTrainer(params.trainerId)
  return (
    <div className="flex justify-center  h-screen mt-16">
      <Edittrainerform response={trainer} />
    </div>
  );
};

export default page;
