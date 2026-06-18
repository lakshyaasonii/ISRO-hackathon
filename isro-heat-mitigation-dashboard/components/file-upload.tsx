'use client';

import { Upload, Cloud } from 'lucide-react';
import { useState } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

export function FileUpload({ onFileSelect, isProcessing }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-2xl p-12 transition-all ${
        isDragging
          ? 'border-blue-500 bg-blue-500/5'
          : 'border-card-foreground/20 bg-card/50 hover:border-blue-500/50'
      } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        disabled={isProcessing}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />

      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-pink-500/20 flex items-center justify-center">
          <Cloud className="w-8 h-8 text-blue-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Upload Satellite Image
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop your Google Earth or Bhuvan satellite image here
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Upload className="w-4 h-4" />
            <span>or click to browse</span>
          </div>
        </div>
        <div className="mt-4 text-xs text-muted-foreground/70">
          <p>Supported formats: JPG, PNG, GeoTIFF (up to 50MB)</p>
        </div>
      </div>
    </div>
  );
}
