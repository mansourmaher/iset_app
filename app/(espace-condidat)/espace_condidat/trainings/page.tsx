import {
  getallTraining,
  getallTraining2,
  getDistinctTags,
} from "@/actions/training/training";
import React from "react";
import { SessionGrid } from "./_components/SessionGrid";
import Categories from "./_components/Categories";

interface gettraining {
  category?: string;
  tag?: string;
}

interface SearchPageProps {
  searchParams: gettraining;
}

const Page = async ({ searchParams }: SearchPageProps) => {
  const sessions = await getallTraining2(
    searchParams.category,
    searchParams.tag
  );
  const tags = await getDistinctTags();

  return (
    <div className="container mx-auto py-8 space-y-2">
      <Categories tags={tags} />
      <p className="text-lg font-semibold  ">Training Sessions</p>
      <span className="text-sm text-slate-500 flex  items-center gap-x-2 ">
        There are {sessions.length} training available for you to choose from
        and improve your skills.
      </span>

      <SessionGrid sessions={sessions} />
    </div>
  );
};

export default Page;
