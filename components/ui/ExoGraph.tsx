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
import type { TooltipItem } from "chart.js";
import { ExoPerf } from "@/types/Profile";
import { useState } from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function ExoGraph({ data }: { data: ExoPerf }) {

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

    // Créer le dataset pour cet exercice spécifique
    const dataset = {
        label: `évolution`,
        data: data.perfs.map(perf => ({
            x: perf.workout_date,
            y: perf.charge
        })),
        borderColor: borderColor,
        backgroundColor: borderColor + '20',
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: false,
    };

    // Les dates pour cet exercice
    const dates = data.perfs.map(perf => perf.workout_date).sort();

    const chartData = {
        labels: dates,
        datasets: [dataset],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: {
                type: 'category' as const,
                ticks: {
                    color: textColor,
                    maxTicksLimit: 8,
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
                title: {
                    display: true,
                    text: 'Charge (kg)',
                    color: textColor,
                }
            },
        },
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: textColor,
                    boxWidth: 20,
                    usePointStyle: true,
                },
                tooltip: {
                    mode: 'point' as const,
                    intersect: false,
                    callbacks: {
                        label: function (context: TooltipItem<'line'>) {
                            const dataPoint = context.raw as { x: string; y: number };
                            const perf = data.perfs.find(p => p.workout_date === dataPoint.x);
                            return `${data.exo_nom}: ${dataPoint.y}kg x ${perf?.reps ?? 0} reps`;
                        }
                    }
                },
            },
        },
        interaction: {
            mode: 'nearest' as const,
            axis: 'x' as const,
            intersect: false,
        },
    };

    if (!data || data.perfs.length === 0) {
        return (
            <div style={{
                textAlign: 'center',
                padding: 'var(--spacing-20)',
                color: textColor
            }}>
                Aucune donnée de performance disponible pour cet exercice
            </div>
        );
    }

    return <Line data={chartData} options={options} />;
}
