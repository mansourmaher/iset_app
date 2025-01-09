import { getSpecificTraing } from "@/actions/training/training";
import React from "react";
import TrainingSessionDisplay from "../_compoenets/TrainingCompoenet";
import Planingsession from "./_compoenets/planning";

const Page = async ({ params }: { params: { trainingId: string } }) => {
  const training = await getSpecificTraing(params.trainingId);
  console.log(training);
  const inititalPlaning = training?.Session.map(
    (session: any) => session.SessionPlaning
  );

  return (
    <div className="mt-6">
      <TrainingSessionDisplay training={training} />
    </div>
  );
};

export default Page;
