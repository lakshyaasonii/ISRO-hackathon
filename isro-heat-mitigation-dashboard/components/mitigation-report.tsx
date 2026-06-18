'use client';

import { AlertCircle, Lightbulb, MapPin, Target } from 'lucide-react';

interface Hotspot {
  id: string;
  name: string;
  temperature: number;
  area: number;
  severity: 'critical' | 'high' | 'moderate';
}

interface Solution {
  id: string;
  title: string;
  description: string;
  impact: string;
  priority: 'high' | 'medium' | 'low';
}

const hotspots: Hotspot[] = [
  {
    id: '1',
    name: 'Central Business District',
    temperature: 62.5,
    area: 2.4,
    severity: 'critical',
  },
  {
    id: '2',
    name: 'Industrial Zone North',
    temperature: 58.3,
    area: 1.8,
    severity: 'high',
  },
  {
    id: '3',
    name: 'Shopping Complex East',
    temperature: 55.7,
    area: 0.9,
    severity: 'high',
  },
];

const solutions: Solution[] = [
  {
    id: '1',
    title: 'Cool Roof Installation',
    description: 'Install reflective roofing materials to reduce surface temperature absorption',
    impact: '8.5°C reduction',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Urban Forestry Program',
    description: 'Strategic tree plantation in hotspot areas for natural cooling and canopy coverage',
    impact: '6.8°C reduction',
    priority: 'high',
  },
  {
    id: '3',
    title: 'Green Roof Development',
    description: 'Convert suitable rooftops to vegetated areas with water management systems',
    impact: '7.2°C reduction',
    priority: 'medium',
  },
  {
    id: '4',
    title: 'Reflective Pavement',
    description: 'Apply permeable and reflective surface treatments to roads and parking areas',
    impact: '5.9°C reduction',
    priority: 'medium',
  },
  {
    id: '5',
    title: 'Water Feature Integration',
    description: 'Create artificial water bodies or fountains to increase evaporative cooling',
    impact: '4.5°C reduction',
    priority: 'low',
  },
];

function getSeverityColor(severity: string) {
  switch (severity) {
    case 'critical':
      return 'bg-red-500/10 border-red-500/30 text-red-400';
    case 'high':
      return 'bg-orange-500/10 border-orange-500/30 text-orange-400';
    default:
      return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
  }
}

function getPriorityBadgeColor(priority: string) {
  switch (priority) {
    case 'high':
      return 'bg-red-500/20 text-red-300';
    case 'medium':
      return 'bg-yellow-500/20 text-yellow-300';
    default:
      return 'bg-green-500/20 text-green-300';
  }
}

export function MitigationReport() {
  return (
    <div className="space-y-8">
      {/* Hotspots Section */}
      <div className="bg-card border border-border rounded-xl p-8">
        <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-red-500" />
          Identified Heat Hotspots
        </h2>
        <p className="text-muted-foreground mb-6">
          Critical areas requiring immediate mitigation intervention
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hotspots.map((hotspot) => (
            <div
              key={hotspot.id}
              className={`border rounded-lg p-5 backdrop-blur-sm ${getSeverityColor(hotspot.severity)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-foreground">{hotspot.name}</h3>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full uppercase ${
                    hotspot.severity === 'critical'
                      ? 'bg-red-500/20 text-red-300'
                      : 'bg-orange-500/20 text-orange-300'
                  }`}
                >
                  {hotspot.severity}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Temperature:</span>
                  <span className="font-bold text-lg">{hotspot.temperature}°C</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Area:</span>
                  <span className="font-semibold">{hotspot.area} km²</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actionable Solutions Section */}
      <div className="bg-card border border-border rounded-xl p-8">
        <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
          Actionable Solutions
        </h2>
        <p className="text-muted-foreground mb-6">
          Evidence-based interventions to reduce urban heat islands in your area
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {solutions.map((solution) => (
            <div
              key={solution.id}
              className="border border-border rounded-lg p-6 bg-secondary/30 hover:border-blue-500/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  {solution.title}
                </h3>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getPriorityBadgeColor(solution.priority)}`}>
                  {solution.priority.toUpperCase()}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{solution.description}</p>

              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-3">
                <span className="text-xs text-muted-foreground">Expected Impact:</span>
                <p className="text-lg font-bold text-blue-400">{solution.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Hotspots', value: '3', icon: MapPin },
          { label: 'Avg Temperature', value: '58.8°C', icon: AlertCircle },
          { label: 'Solutions', value: '5', icon: Lightbulb },
          { label: 'Max Reduction', value: '8.5°C', icon: Target },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-card border border-border rounded-lg p-4 text-center">
              <Icon className="w-5 h-5 text-blue-500 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
