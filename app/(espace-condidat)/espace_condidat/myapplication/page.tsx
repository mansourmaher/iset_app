import React from "react";
import { SessionGrid } from "../trainings/_components/SessionGrid";
import { sessionWhereuserhaveapplied } from "@/actions/session/session";
import { SessionGridforApplication } from "./_compoenets/SessionGrid";

const page = async () => {
  const application = await sessionWhereuserhaveapplied();
  if (application.applications?.length === 0) {
    return (
      <div className="container mx-auto py-8 space-y-4">
        <p className="text-lg font-semibold  ">
          Session where you have applied
          <span className="text-sm text-slate-500 flex  items-center gap-x-2 ">
            There are training available for you to choose from and improve your
            skills.
          </span>
        </p>
        <p className="text-lg font-semibold  ">
          You have not applied to any session
        </p>
      </div>
    );
  }
  if (application.applications === undefined) {
    return (
      <div className="container mx-auto py-8 space-y-4">
        <p className="text-lg font-semibold  ">
          Session where you have applied
          <span className="text-sm text-slate-500 flex  items-center gap-x-2 ">
            There are training available for you to choose from and improve your
            skills.
          </span>
        </p>
        <p className="text-lg font-semibold  ">
          You have not applied to any session
        </p>
      </div>
    );
  }
  const sessions = application.applications.map((app) => app.session);
  return (
    <div className="container mx-auto py-8 space-y-2">
      <p className="text-lg font-semibold  ">
        Session where you have applied
        </p>
        <span className="text-sm text-slate-500 flex  items-center gap-x-2 ">
          There are training available for you to choose from and improve your
          skills.
        </span>
     
      <SessionGridforApplication sessions={sessions} />
    </div>
  );
};

export default page;
