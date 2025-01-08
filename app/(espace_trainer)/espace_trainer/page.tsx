import React from "react";
import { getAllMysessionAffectedToMe } from "@/actions/trainer/trainer";
import { Myformationstable } from "../_compoenets/myformationstable";

// export type SessionData = {
//   title: string;
//   startDate: string;
//   endDate: string;
//   trainingTitle: string;
// };
const page = async () => {
  const session = await getAllMysessionAffectedToMe();

  if (!session) return;
  const listOfdataOftypeSessionData = Array.isArray(session)
    ? session.map((session) => ({
        id: session.session.id,
        title: session.session.title,
        startDate: session.session.startDate,
        endDate: session.session.endDate,
        trainingTitle: session.session.training.title,
        status: session.status,
      }))
    : [];

  return (
    <div className="mt-8 justify-center flex flex-col min-h-screen px-16">
      <span className="text-lg font-semibold  ">
        Sessions where you are affected as a trainer
      </span>

      <div className="">
        {/* @ts-ignore */}
        <Myformationstable sessions={listOfdataOftypeSessionData} />
      </div>
    </div>
  );
};

export default page;
