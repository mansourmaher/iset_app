import { getAllsesions, getallTraining } from "@/actions/training/training";
import { sessionWhereuserhaveapplied } from "@/actions/session/session";
import {  SessionCardFormApplications } from "./SessionCard";

interface Props {
  sessions: any;
}

export function SessionGridforApplication({ sessions }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border border-gray-300 p-4">
      {sessions.map((session:any) => (
        <SessionCardFormApplications key={session.id} session={session} />
      ))}
    </div>
  );
}
