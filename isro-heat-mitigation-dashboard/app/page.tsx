"use client";

import React, { useState } from "react";

export default function Page() {
  // 1. Saari States
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [reportData, setReportData] = useState<{
    land_cover: { concrete: number; green: number; water: number };
    hotspots: string[];
    charts_data: string[];
    solutions: string[];
  } | null>(null);

  // 2. File Change Handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // 3. Main Analyze API Handler (Render URL + Route Path Ke Saath)
  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Tumhara live backend endpoint route path ke saath
      const response = await fetch("https://isro-hackathon-6h7q.onrender.com/analyze-heat", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Backend connection failed");

      const data = await response.json();

      if (data.success) {
        setProcessedImage(data.processed_image);
        setReportData(data.report);
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
      alert("Backend se connect nahi ho paya. Check karo ki Render server chal raha hai ya nahi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col md:flex-row">
      
      {/* ================= SIDEBAR (Laptop par dikhega, Mobile par hidden) ================= */}
      <aside className="hidden md:block w-64 bg-[#1e293b] p-6 border-r border-slate-800 shrink-0">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center font-bold text-white">
            I
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-wide">ISRO Urban Heat</h1>
            <p className="text-xs text-slate-400">Heat Mitigation Tool</p>
          </div>
        </div>
        <nav className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-red-500/20 to-orange-500/10 text-orange-400 font-medium text-sm rounded-lg border border-orange-500/20">
            📊 Dashboard
          </button>
        </nav>
      </aside>

      {/* ================= MOBILE HEADER (Sirf Mobile screen par dikhega) ================= */}
      <header className="block md:hidden bg-[#1e293b] p-4 border-b border-slate-800 flex items-center gap-3 sticky top-0 z-50">
        <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center font-bold text-white text-xs">
          I
        </div>
        <div>
          <h1 className="font-bold text-sm">ISRO Urban Heat Tool</h1>
        </div>
      </header>

      {/* ================= MAIN DASHBOARD CONTENT ================= */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        
        {/* Header Title Text */}
        <div className="mb-6 md:mb-8 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Urban Heat Analysis Dashboard
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            Analyze satellite imagery to identify urban heat islands and generate mitigation strategies.
          </p>
        </div>

        {/* RESPONSIVE GRID LAYOUT: Mobile par 1 column, Laptop par 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* LEFT SIDE: INPUT & VISUALIZATION */}
          <div className="space-y-6 w-full">
            
            {/* CARD 1: Upload Satellite Image */}
            <div className="bg-[#1e293b]/50 border border-slate-800 rounded-xl p-4 md:p-6 backdrop-blur-sm">
              <h2 className="text-sm md:text-base font-semibold text-white mb-4 flex items-center gap-2">
                📤 Upload Satellite Image
              </h2>
              
              <div className="border-2 border-dashed border-slate-700 hover:border-orange-500/50 rounded-lg p-6 text-center transition-colors bg-[#0f172a]/50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="satellite-upload"
                />
                <label htmlFor="satellite-upload" className="cursor-pointer block">
                  {file ? (
                    <p className="text-xs md:text-sm text-emerald-400 font-medium truncate">
                      📄 {file.name}
                    </p>
                  ) : (
                    <p className="text-xs md:text-sm text-slate-400">
                      Drag & drop your satellite image here or <span className="text-orange-400 underline">Browse</span>
                    </p>
                  )}
                </label>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={!file || loading}
                className="w-full mt-4 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-white font-medium text-xs md:text-sm py-2.5 px-4 rounded-lg transition-all shadow-lg shadow-orange-950/20"
              >
                {loading ? "Analyzing Satellite Data..." : "Analyze Heat Signature ›"}
              </button>
            </div>

            {/* CARD 2: Thermal Map Result */}
            <div className="bg-[#1e293b]/50 border border-slate-800 rounded-xl p-4 md:p-6 backdrop-blur-sm">
              <h2 className="text-sm md:text-base font-semibold text-white mb-4 flex items-center gap-2">
                ⚠️ AI Processed Thermal Map
              </h2>
              <div className="aspect-video w-full bg-[#0f172a]/80 rounded-lg border border-slate-800 flex items-center justify-center overflow-hidden">
                {processedImage ? (
                  <img
                    src={`data:image/jpeg;base64,${processedImage}`}
                    alt="Thermal Analysis Map"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-xs text-slate-500 px-4 text-center">
                    Waiting for Satellite Image Upload & Process...
                  </p>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: AI ASSESSMENT REPORT */}
          <div className="bg-[#1e293b]/50 border border-slate-800 rounded-xl p-4 md:p-6 backdrop-blur-sm w-full">
            <h2 className="text-sm md:text-base font-semibold text-white mb-4 flex items-center gap-2">
              💡 ISRO AI Expert Assessment
            </h2>

            {reportData ? (
              <div className="space-y-6">
                
                {/* Progress Bars (Land Cover) */}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-3">
                    Land Cover Estimation
                  </h3>
                  <div className="space-y-3">
                    {/* Concrete Area */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">Concrete Area</span>
                        <span className="text-orange-400 font-semibold">{reportData.land_cover.concrete}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-orange-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${reportData.land_cover.concrete}%` }}
                        ></div>
                      </div>
                    </div>
                    {/* Green Cover */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">Green Cover</span>
                        <span className="text-emerald-400 font-semibold">{reportData.land_cover.green}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${reportData.land_cover.green}%` }}
                        ></div>
                      </div>
                    </div>
                    {/* Water Bodies */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">Water Bodies</span>
                        <span className="text-blue-400 font-semibold">{reportData.land_cover.water}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${reportData.land_cover.water}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hotspots Detected */}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-2">
                    Hotspots:
                  </h3>
                  <ul className="space-y-1.5">
                    {reportData.hotspots.map((item, idx) => (
                      <li key={idx} className="text-xs md:text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Charts Data Breakdown */}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-2">
                    Charts Data:
                  </h3>
                  <ul className="space-y-1.5">
                    {reportData.charts_data.map((item, idx) => (
                      <li key={idx} className="text-xs md:text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-orange-400 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solutions & Mitigation */}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-2">
                    Solutions:
                  </h3>
                  <ul className="space-y-1.5">
                    {reportData.solutions.map((item, idx) => (
                      <li key={idx} className="text-xs md:text-sm text-slate-200 flex items-start gap-2 bg-[#0f172a]/40 p-2 rounded border border-slate-800">
                        <span className="text-emerald-400 mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            ) : (
              <p className="text-xs text-slate-500 text-center py-12">
                Waiting for analysis report data breakdown...
              </p>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}