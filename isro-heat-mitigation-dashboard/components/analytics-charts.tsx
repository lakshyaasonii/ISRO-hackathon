'use client';

import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Zap, TrendingUp } from 'lucide-react';

const temperatureData = [
  { name: 'Concrete', value: 58, percentage: 45 },
  { name: 'Greenery', value: 28, percentage: 30 },
  { name: 'Water', value: 22, percentage: 25 },
];

const materialBreakdown = [
  { name: 'Concrete', value: 45, color: '#ef4444' },
  { name: 'Asphalt', value: 25, color: '#f97316' },
  { name: 'Green Space', value: 20, color: '#10b981' },
  { name: 'Water Bodies', value: 10, color: '#06b6d4' },
];

const coolingPotential = [
  { intervention: 'Cool Roofs', potential: 8.5 },
  { intervention: 'Green Roofs', potential: 7.2 },
  { intervention: 'Urban Trees', potential: 6.8 },
  { intervention: 'Reflective Roads', potential: 5.9 },
  { intervention: 'Water Features', potential: 4.5 },
];

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Surface Temperature Breakdown */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Surface Temperature by Material
          </h3>
          <p className="text-sm text-muted-foreground mt-1">°C Average Temperature</p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={temperatureData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a1a',
                border: '1px solid #2d2d2d',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#e8e8e8' }}
            />
            <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {temperatureData.map((item) => (
            <div key={item.name} className="bg-secondary/50 rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground">{item.name}</p>
              <p className="text-lg font-bold text-foreground">{item.value}°C</p>
              <p className="text-xs text-muted-foreground">{item.percentage}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Material Breakdown & Cooling Potential */}
      <div className="space-y-6">
        {/* Pie Chart */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-pink-500" />
            Material Composition
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={materialBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {materialBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #2d2d2d',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#e8e8e8' }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {materialBreakdown.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cooling Potential Score */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Cooling Potential Score</h3>
          <div className="space-y-3">
            {coolingPotential.map((item) => (
              <div key={item.intervention}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-foreground">{item.intervention}</span>
                  <span className="text-sm font-semibold text-blue-400">{item.potential}°C</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                    style={{ width: `${(item.potential / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
