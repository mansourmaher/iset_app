import { getSpecificTraing } from "@/actions/training/training";
import React from "react";
import TrainingSessionDisplay from "../_compoenets/TrainingCompoenet";

const Page = async ({ params }: { params: { trainingId: string } }) => {
  const training = await getSpecificTraing(params.trainingId);
  console.log(training);

  return (
    <div className="mt-6">
      <TrainingSessionDisplay training={training} />
    </div>
  );
};

export default Page;
