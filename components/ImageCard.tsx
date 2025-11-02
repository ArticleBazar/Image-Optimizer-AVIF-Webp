import React from 'react';

interface ImageCardProps {
  title: string;
  imageUrl: string;
  info: { [key: string]: string };
  onDownload: () => void;
}

const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);


export const ImageCard: React.FC<ImageCardProps> = ({ title, imageUrl, info, onDownload }) => {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <button onClick={onDownload} className="p-2 rounded-full hover:bg-slate-800 transition-colors">
          <DownloadIcon className="w-5 h-5 text-slate-400" />
        </button>
      </div>
      <div className="p-4">
        <div className="aspect-w-16 aspect-h-9 mb-4">
            <img src={imageUrl} alt={title} className="w-full h-full object-contain rounded-lg bg-black/20" />
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          {Object.entries(info).map(([key, value]) => (
            <div key={key}>
              <span className="capitalize text-slate-500">{key.replace('_', ' ')}:</span>
              {/* Fix: Corrected type error by treating `value` as a string and simplified logic to color positive savings green. */}
              <span className={`ml-2 font-semibold ${key === 'savings' ? 'text-green-400' : 'text-slate-200'}`}>{String(value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};