import { getTrainingById } from "@/actions/training/training";
import React from "react";
import Edittraining from "./_compoenets/edittraining";

const page = async ({ params }: { params: { trainingId: string } }) => {
  const training = await getTrainingById(params.trainingId);
  return (
    <div className="container mx-auto py-10">
      <Edittraining training={training} />
    </div>
  );
};

export default page;
