"use client";

import React, { useState } from "react";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [reportText, setReportText] = useState<string | null>(null); // Direct full text store karne ke liye

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
      const response = await fetch("https://isro-hackathon-6h7q.onrender.com/analyze-heat", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Backend connection failed");

      const data = await response.json();

      // Backend se jo bhi image field aa rahi hai use check karke set kar rahe hain
      if (data.processed_image) {
        setProcessedImage(data.processed_image);
      } else if (data.image) {
        setProcessedImage(data.image);
      }

      // Backend se direct text report handle karne ke liye
      if (data.report) {
        if (typeof data.report === "string") {
          setReportText(data.report);
        } else {
          setReportText(JSON.stringify(data.report, null, 2));
        }
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
      alert("Backend se connect nahi ho paya. Check karo ki Render server active hai.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col md:flex-row">
      
      {/* SIDEBAR: Laptop par dikhega, Mobile par hidden */}
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

      {/* MOBILE HEADER: Sirf mobile par dikhega */}
      <header className="block md:hidden bg-[#1e293b] p-4 border-b border-slate-800 flex items-center gap-3 sticky top-0 z-50">
        <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center font-bold text-white text-xs">I</div>
        <div>
          <h1 className="font-bold text-sm">ISRO Urban Nest</h1>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        
        <div className="mb-6 md:mb-8 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Urban Heat Analysis Dashboard</h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            Analyze satellite imagery to identify urban heat islands and generate mitigation strategies.
          </p>
        </div>

        {/* RESPONSIVE LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* LEFT COLUMN: Upload & Thermal Map */}
          <div className="space-y-6 w-full">
            
            {/* Upload Card */}
            <div className="bg-[#1e293b]/50 border border-slate-800 rounded-xl p-4 md:p-6 backdrop-blur-sm">
              <h2 className="text-sm font-semibold mb-4 text-white">Upload Satellite Image</h2>
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

            {/* Thermal Map Result Box */}
            <div className="bg-[#1e293b]/50 border border-slate-800 rounded-xl p-4 md:p-6 backdrop-blur-sm">
              <h2 className="text-sm font-semibold mb-3 text-white">⚠️ AI Processed Thermal Map</h2>
              <div className="aspect-video w-full bg-[#0f172a]/80 rounded-lg border border-slate-800 flex items-center justify-center overflow-hidden">
                {processedImage ? (
                  <img 
                    src={processedImage.startsWith("data:") ? processedImage : `data:image/jpeg;base64,${processedImage}`} 
                    alt="Thermal Map" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <p className="text-xs text-slate-500 px-4 text-center">Waiting for Satellite Image Upload...</p>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: ISRO AI Expert Assessment (Direct String Support) */}
          <div className="bg-[#1e293b]/50 border border-slate-800 rounded-xl p-4 md:p-6 backdrop-blur-sm w-full">
            <h2 className="text-sm font-semibold mb-4 text-white">💡 ISRO AI Expert Assessment</h2>
            
            {reportText ? (
              <div className="text-xs md:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap bg-[#0f172a]/60 p-4 rounded-lg border border-slate-800 font-mono">
                {reportText}
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