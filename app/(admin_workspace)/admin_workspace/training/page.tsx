import { getallTraining } from "@/actions/training/training";
import React from "react";
import { TrainingTable } from "./_components/trainingtable";

const page = async () => {
  const training = await getallTraining();
  return (
    <div className="flex justify-center items-center min-h-screen px-16">
      <TrainingTable courses={training} />
    </div>
  );
};

export default page;
