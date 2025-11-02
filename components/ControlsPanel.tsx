
import React from 'react';

interface ControlsPanelProps {
  quality: number;
  setQuality: (quality: number) => void;
  onOptimize: () => void;
  isLoading: boolean;
  isImageLoaded: boolean;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
  quality,
  setQuality,
  onOptimize,
  isLoading,
  isImageLoaded,
}) => {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 space-y-6">
      <h2 className="text-xl font-bold text-white">Optimization Settings</h2>
      
      <div>
        <label htmlFor="quality" className="block text-sm font-medium text-slate-300 mb-2 flex justify-between">
          <span>Quality</span>
          <span className="font-bold text-brand-secondary">{quality}</span>
        </label>
        <input
          id="quality"
          type="range"
          min="1"
          max="100"
          value={quality}
          onChange={(e) => setQuality(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-secondary"
          disabled={!isImageLoaded}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-slate-300 mb-2">Output Formats</h3>
        <div className="space-y-2">
            <div className="flex items-center">
                <input id="webp" name="webp" type="checkbox" checked readOnly className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-brand-secondary focus:ring-brand-secondary" />
                <label htmlFor="webp" className="ml-3 block text-sm text-slate-400">WebP</label>
            </div>
            <div className="flex items-center">
                <input id="avif" name="avif" type="checkbox" checked readOnly className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-brand-secondary focus:ring-brand-secondary" />
                <label htmlFor="avif" className="ml-3 block text-sm text-slate-400">AVIF</label>
            </div>
        </div>
      </div>
      
      <button
        onClick={onOptimize}
        disabled={!isImageLoaded || isLoading}
        className="w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-secondary transition-colors duration-300 disabled:bg-slate-700 disabled:cursor-not-allowed disabled:text-slate-500 flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : 'Optimize Image'}
      </button>
    </div>
  );
};
