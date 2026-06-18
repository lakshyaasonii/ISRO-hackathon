'use client';

import { Sidebar } from '@/components/sidebar';
import { BeforeAfterSlider } from '@/components/before-after-slider';
import { AnalyticsCharts } from '@/components/analytics-charts';
import { MitigationReport } from '@/components/mitigation-report';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DemoPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Urban Heat Analysis Dashboard
            </h1>
            <p className="text-muted-foreground">
              Analyze satellite imagery to identify urban heat islands and generate mitigation strategies
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Success Banner */}
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6 flex items-center gap-4">
              <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-foreground mb-1">
                  Analysis Complete!
                </h2>
                <p className="text-sm text-muted-foreground">
                  Successfully processed: <span className="font-semibold text-green-400">urban_satellite_image_2024.tif</span>
                </p>
              </div>
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
                Analyze Another <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Results Section */}
            <div className="space-y-8">
              {/* Before/After Comparison */}
              <section className="bg-card border border-border rounded-xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Visual Analysis</h2>
                <p className="text-muted-foreground mb-6">
                  Compare original satellite imagery with AI-generated heat map visualization
                </p>
                <BeforeAfterSlider
                  beforeImage="/api/placeholder/800/500"
                  afterImage="/api/placeholder/800/500"
                  beforeLabel="Original Satellite"
                  afterLabel="Heat-Mapped Analysis"
                />
              </section>

              {/* Analytics Charts */}
              <section className="bg-card border border-border rounded-xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Analytics & Insights</h2>
                <AnalyticsCharts />
              </section>

              {/* Mitigation Report */}
              <section>
                <MitigationReport />
              </section>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
