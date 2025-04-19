'use client';

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Player {
  id: number;
  name: string;
  seasonScore: number;
}

export default function StandingsChart() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/standings');
        const data = await res.json();
        setPlayers(data);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('chart fetch error', err);
      }
    }
    fetchData();
  }, []);

  if (!players.length) return null;

  const data = {
    labels: players.map((p) => p.name),
    datasets: [
      {
        label: 'Season Score',
        data: players.map((p) => p.seasonScore),
        backgroundColor: 'rgba(34,197,94,0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'League Standings (Season Score)' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 my-8">
      <Bar options={options} data={data} />
    </div>
  );
} 