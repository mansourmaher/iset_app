import React from "react";
import SessionBarchart from "./sessioncharts";
import { getSessionApplication } from "@/actions/session/session";

const SessionChartFetchData = async () => {
  const sessionapplication = await getSessionApplication();
  console.log(sessionapplication);
  return <SessionBarchart sessionapplication={sessionapplication} />;
};

export default SessionChartFetchData;
