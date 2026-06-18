"use client";

import React, { useState } from "react";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [reportData, setReportData] = useState<any>(null); // State pehle jaisi

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Ekdum perfect live Render URL route ke saath
      const response = await fetch("https://isro-hackathon-6h7q.onrender.com/analyze-heat", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Backend connection failed");

      const data = await response.json();

      if (data.success) {
        setProcessedImage(data.processed_image);
        // Tumhara exact original function jo data set karta tha
        setReportData(data.report); 
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
      alert("Backend se connect nahi ho paya. Check karo ki uvicorn/Render server chal raha hai.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col md:flex-row">
      
      {/* 1. SIDEBAR: Laptop par dikhega, Mobile par automatic hidden */}
      <aside className="hidden md:block w-64 bg-[#1e293b] p-6 border-r border-slate-800 shrink-0">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center font-bold text-white">I</div>
          <div>
            <h1 className="font-bold text-sm tracking-wide">ISRO Urban Nest</h1>
            <p className="text-xs text-slate-400">Heat Mitigation Tool</p>
          </div>
        </div>
        <nav className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-red-500/20 to-orange-500/10 text-orange-400 font-medium text-sm rounded-lg border border-orange-500/20">
            📊 Dashboard
          </button>
        </nav>
      </aside>

      {/* 2. MOBILE HEADER: Jo sirf mobile par dikhega sidebar ki jagah */}
      <header className="block md:hidden bg-[#1e293b] p-4 border-b border-slate-800 flex items-center gap-3 sticky top-0 z-50">
        <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center font-bold text-white text-xs">I</div>
        <div>
          <h1 className="font-bold text-sm">ISRO Urban Nest</h1>
        </div>
      </header>

      {/* 3. MAIN CONTENT AREA */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        
        <div className="mb-6 md:mb-8 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Urban Heat Analysis Dashboard</h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            Analyze satellite imagery to identify urban heat islands and generate mitigation strategies.
          </p>
        </div>

        {/* RESPONSIVE GRID: Mobile par ek ke niche ek (1 col), Laptop par side-by-side (2 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* LEFT COLUMN: Upload aur Image Result */}
          <div className="space-y-6 w-full">
            
            {/* Upload Box */}
            <div className="bg-[#1e293b]/50 border border-slate-800 rounded-xl p-4 md:p-6 backdrop-blur-sm">
              <h2 className="text-sm font-semibold mb-4">Upload Satellite Image</h2>
              <div className="border-2 border-dashed border-slate-700 hover:border-orange-500/50 rounded-lg p-6 text-center transition-colors bg-[#0f172a]/50">
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="satellite-upload" />
                <label htmlFor="satellite-upload" className="cursor-pointer block">
                  {file ? (
                    <p className="text-xs md:text-sm text-emerald-400 font-medium truncate">📄 {file.name}</p>
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
                className="w-full mt-4 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 disabled:from-slate-800 disabled:to-slate-800 text-white font-medium text-xs md:text-sm py-2.5 px-4 rounded-lg transition-all shadow-lg"
              >
                {loading ? "Analyzing..." : "Analyze Heat Signature ›"}
              </button>
            </div>

            {/* Image Result Box */}
            <div className="bg-[#1e293b]/50 border border-slate-800 rounded-xl p-4 md:p-6 backdrop-blur-sm">
              <div className="aspect-video w-full bg-[#0f172a]/80 rounded-lg border border-slate-800 flex items-center justify-center overflow-hidden">
                {processedImage ? (
                  <img src={`data:image/jpeg;base64,${processedImage}`} alt="Thermal Map" className="w-full h-full object-cover" />
                ) : (
                  <p className="text-xs text-slate-500 px-4 text-center">Waiting for Satellite Image Upload...</p>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Report Data Dashboard (Pehle jaisa structure) */}
          <div className="bg-[#1e293b]/50 border border-slate-800 rounded-xl p-4 md:p-6 backdrop-blur-sm w-full">
            {reportData ? (
              <div className="space-y-6">
                {/* Land Cover Progress Bars */}
                {reportData.land_cover && (
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-3">Land Cover Estimation</h3>
                    <div className="space-y-3">
                      {Object.entries(reportData.land_cover).map(([key, value]: [string, any]) => (
                        <div key={key}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-300 capitalize">{key} Area</span>
                            <span className="text-orange-400 font-semibold">{value}%</span>
                          </div>
                          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-orange-500 h-full rounded-full" style={{ width: `${value}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hotspots Section */}
                {reportData.hotspots && (
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-2">Hotspots Detected:</h3>
                    <ul className="space-y-1.5">
                      {reportData.hotspots.map((item: string, idx: number) => (
                        <li key={idx} className="text-xs md:text-sm text-slate-300 flex items-start gap-2">
                          <span className="text-red-500">•</span><span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Solutions Section */}
                {reportData.solutions && (
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-2">Suggested Solutions:</h3>
                    <ul className="space-y-1.5">
                      {reportData.solutions.map((item: string, idx: number) => (
                        <li key={idx} className="text-xs md:text-sm text-slate-200 flex items-start gap-2 bg-[#0f172a]/40 p-2 rounded border border-slate-800">
                          <span className="text-emerald-400">✓</span><span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500 text-center py-12">Waiting for Satellite Image Upload...</p>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}