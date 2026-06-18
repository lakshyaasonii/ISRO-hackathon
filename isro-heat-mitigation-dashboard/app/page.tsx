"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Upload, AlertTriangle, Lightbulb, BarChart3, ChevronRight, RefreshCw } from "lucide-react"

export default function Page() {
  const [image, setImage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [report, setReport] = useState<string | null>(null)
  const [chartsData, setChartsData] = useState<{ label: string; value: string }[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setImage(URL.createObjectURL(selectedFile))
      // Reset old states
      setProcessedImage(null)
      setReport(null)
      setChartsData([])
    }
  }

  const handleAnalyze = async () => {
    if (!file) return
    setLoading(true)

    const formData = new FormData()
    formData.append("file", file)

    try {
      // 🚀 CONNECTING TO YOUR PYTHON FASTAPI BACKEND
      const response = await fetch("http://127.0.0.1:8000/analyze-heat", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Backend connection failed")

      const data = await response.json()

      if (data.success) {
        setProcessedImage(data.processed_image)
        parseReportData(data.report)
      }
    } catch (error) {
      console.error("Error analyzing image:", error)
      alert("Backend se connect nahi ho paya. Check karo ki uvicorn server chal raha hai ya nahi!")
    } finally {
      setLoading(false)
    }
  }

  // Helper function to extract text and charts dynamically from Gemini report
  const parseReportData = (text: string) => {
    setReport(text)
    const charts: { label: string; value: string }[] = []
    const lines = text.split("\n")
    lines.forEach((line) => {
      if (line.includes("Concrete Area:") || line.includes("Green Cover:") || line.includes("Water Bodies:")) {
        const parts = line.replace("- ", "").split(":")
        if (parts.length === 2) {
          charts.push({ label: parts[0].trim(), value: parts[1].trim() })
        }
      }
    })
    setChartsData(charts)
  }

  return (
    <div className="flex min-h-screen bg-[#0B0F19] text-slate-100 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-[#111827] border-r border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center font-bold text-white shadow-lg shadow-red-900/30">
              ISRO
            </div>
            <div>
              <h2 className="font-bold text-sm tracking-wide text-slate-200">ISRO Urban Heat</h2>
              <p className="text-xs text-slate-500">Heat Mitigation Tool</p>
            </div>
          </div>
          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-red-600/20 to-amber-600/10 text-red-400 border border-red-500/20 transition-all">
              <BarChart3 className="h-4 w-4" /> Dashboard
            </button>
          </nav>
        </div>
        <div className="text-xs text-slate-600 text-center border-t border-slate-800/60 pt-4">
          v1.0.0 • ISRO Heat AI
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
            Urban Heat Analysis Dashboard
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Analyze satellite imagery to identify urban heat islands and generate mitigation strategies.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Upload Section */}
          <div className="space-y-6">
            <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <Upload className="h-5 w-5 text-red-500" /> Upload Satellite Image
              </h3>
              
              <div className="border-2 border-dashed border-slate-800 hover:border-red-500/40 rounded-xl p-8 flex flex-col items-center justify-center gap-4 bg-[#0D1321] transition-all cursor-pointer relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                {image ? (
                  <img src={image} alt="Preview" className="max-h-60 rounded-lg object-cover shadow-md" />
                ) : (
                  <>
                    <div className="h-12 w-12 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform">
                      <Upload className="h-5 w-5" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-slate-300">Drag & drop your satellite image here</p>
                      <p className="text-xs text-slate-500 mt-1">Supported formats: JPG, PNG, GeoTIFF</p>
                    </div>
                  </>
                )}
              </div>

              {file && (
                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="w-full mt-5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-red-900/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin" /> Processing AI Analysis...
                    </>
                  ) : (
                    <>Analyze Heat Signature <ChevronRight className="h-4 w-4" /></>
                  )}
                </button>
              )}
            </div>

            {/* Processed Thermal Output */}
            {processedImage && (
              <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" /> AI Processed Thermal Map
                </h3>
                <div className="rounded-xl overflow-hidden bg-slate-950 p-2 border border-slate-800">
                  <img src={processedImage} alt="Thermal Mapping" className="w-full object-cover rounded-lg" />
                </div>
              </div>
            )}
          </div>

          {/* Right: AI Analysis Report */}
          <div className="space-y-6">
            {report ? (
              <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
                <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Lightbulb className="h-5 w-5 text-amber-400" /> ISRO AI Expert Assessment
                </h3>
                
                {/* Dynamically generated charts if data exists */}
                {chartsData.length > 0 && (
                  <div className="space-y-3 bg-[#0D1321] p-4 rounded-xl border border-slate-800/60">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Land Cover Estimation</h4>
                    {chartsData.map((chart, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-slate-300">{chart.label}</span>
                          <span className="text-amber-400 font-bold">{chart.value}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full" 
                            style={{ width: chart.value.includes('%') ? chart.value : '50%' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Main Text Report */}
                <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line bg-[#0D1321]/40 p-4 rounded-xl border border-slate-800/40 max-h-[500px] overflow-y-auto">
                  {report}
                </div>
              </div>
            ) : (
              <div className="bg-[#111827]/40 border border-dashed border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
                <BarChart3 className="h-12 w-12 text-slate-700 mb-3" />
                <p className="text-sm font-medium text-slate-400">Waiting for Satellite Image Upload</p>
                <p className="text-xs text-slate-600 mt-1">Upload a patch to view thermal hotspots and metric splits.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}