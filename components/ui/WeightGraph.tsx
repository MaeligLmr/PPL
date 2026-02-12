'use client'

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import { PistePoids } from "@/types/Profile";
import { useState } from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function PoidsChart({ data }: { data: PistePoids[] }) {
  const [borderColor] = useState(() => {
    if (typeof window === 'undefined') return '#4a6cff'
    const computedStyle = getComputedStyle(document.documentElement)
    const lineColor = computedStyle.getPropertyValue('--theme-button-outlined-text').trim()
    return lineColor || '#4a6cff'
  })
  
  const [textColor] = useState(() => {
    if (typeof window === 'undefined') return '#000'
    const computedStyle = getComputedStyle(document.documentElement)
    const labelColor = computedStyle.getPropertyValue('--theme-text').trim()
    return labelColor || '#000'
  })

  const labels = data.map((d) => d.date);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Poids (kg)",
        data: data.map((d) => d.poids),
        borderColor: borderColor,
        backgroundColor: borderColor + '20',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: textColor + '33',
        },
      },
      y: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: textColor + '33',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}