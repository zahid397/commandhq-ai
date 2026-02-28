'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppStore } from '@/lib/store/app-store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function MetricsChart() {
  const infraMetrics = useAppStore((state) => state.infraMetrics);

  const chartData = infraMetrics.map((metric) => ({
    name: metric.service.split('-')[0],
    cpu: Math.round(metric.cpu),
    memory: Math.round(metric.memory),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Infrastructure Metrics</CardTitle>
      </CardHeader>
<CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cpu" fill="#3b82f6" name="CPU %" />
            <Bar dataKey="memory" fill="#8b5cf6" name="Memory %" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
