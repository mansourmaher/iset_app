"use client";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as Chartsjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getSessionApplication } from "@/actions/session/session";

Chartsjs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CourseBarchatProps {
  sessionapplication: Awaited<ReturnType<typeof getSessionApplication>>;
}

function SessionBarchart({ sessionapplication }: CourseBarchatProps) {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: any[];
  }>({
    // @ts-ignore
    labels: sessionapplication.sessions?.map((s) => s.title),
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({
    responsive: true,
    maintainAspectRatio: false, // Prevent default aspect ratio
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Session",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Application Count",
        },
      },
    },
  });

  useEffect(() => {
    setChartOptions({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Session",
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Application Count",
          },
        },
      },
    });
    setChartData({
      // @ts-ignore
      labels: sessionapplication.sessions?.map((s) => s.title),
      datasets: [
        {
          label: "Application Count",
          data: sessionapplication.sessions?.map((s) => s.applicationlength),
          borderColor: "rgba(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.4)",
        },
      ],
    });
  }, [sessionapplication]);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="grid gap-2">
          <CardTitle>Session Application Count</CardTitle>
          <CardDescription>
            Total number of applications per session
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[500px]">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  );
}

export default SessionBarchart;
