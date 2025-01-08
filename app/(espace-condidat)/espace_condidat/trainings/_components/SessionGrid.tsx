import { getAllsesions, getallTraining } from "@/actions/training/training";
import { SessionCard } from "./SessionCard";
import { sessionWhereuserhaveapplied } from "@/actions/session/session";

interface Props {
  sessions: any;
}

export function SessionGrid({ sessions }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border border-gray-300 p-4">
      {sessions.map((session:any) => (
        <SessionCard key={session.id} session={session} />
      ))}
    </div>
  );
}
