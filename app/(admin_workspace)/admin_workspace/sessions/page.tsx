import React from "react";
import { getAllMysessionAffectedToMe, getAllsessionForAdmin } from "@/actions/trainer/trainer";
import { Myformationstable } from "@/app/(espace_trainer)/_compoenets/myformationstable";
import { SessionTableForAdmin } from "./_compoenets/myformationstable";

// export type SessionData = {
//   title: string;
//   startDate: string;
//   endDate: string;
//   trainingTitle: string;
// };
const page = async () => {
  const session = await getAllsessionForAdmin();
  if (!session) return;
  const listOfdataOftypeSessionData = Array.isArray(session)
    ? session.map((session) => ({
        id: session.id,
        title: session.title,
        startDate: session.startDate,
        endDate: session.endDate,
        trainingTitle: session.training.title,
      }))
    : [];

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen px-16">
        {/* @ts-ignore */}
        <SessionTableForAdmin sessions={listOfdataOftypeSessionData} />
      </div>
    </div>
  );
};

export default page;
