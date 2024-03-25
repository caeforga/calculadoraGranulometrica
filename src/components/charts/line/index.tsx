import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  title?: string;
  labels?: string[];
  labelX?: string;
  labelY?: string;
  datasets: {
    label?: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
  }[];
}

export const LineChart = ({
  title,
  labels,
  labelX,
  labelY,
  datasets,
}: LineChartProps) => {
  return (
    <Line
      options={{
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: labelX,
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: labelY,
            },
            suggestedMin: -10,
            suggestedMax: 200,
          },
        },
        plugins: {
          legend: {
            position: "top" as const,
          },
          title: {
            display: true,
            text: title,
          },
        },
      }}
      data={{
        labels,
        datasets,
      }}
    />
  );
};
