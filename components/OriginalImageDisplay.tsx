
import React from 'react';
import type { ImageInfo } from '../types';
import { formatBytes } from '../utils/imageUtils';

interface OriginalImageDisplayProps {
    imageInfo: ImageInfo;
    description: string | null;
    isLoadingDescription: boolean;
}

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
  </svg>
);


export const OriginalImageDisplay: React.FC<OriginalImageDisplayProps> = ({ imageInfo, description, isLoadingDescription }) => {
    return (
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
            <h2 className="text-xl font-bold text-white mb-4">Original Image</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="aspect-w-16 aspect-h-9">
                    <img src={imageInfo.url} alt="Original upload" className="w-full h-full object-contain rounded-lg bg-black/20" />
                </div>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                            <span className="text-slate-500">Format:</span>
                            <span className="ml-2 font-semibold text-slate-200">{imageInfo.type}</span>
                        </div>
                        <div>
                            <span className="text-slate-500">Size:</span>
                            <span className="ml-2 font-semibold text-slate-200">{formatBytes(imageInfo.size)}</span>
                        </div>
                        <div className="col-span-2">
                            <span className="text-slate-500">Dimensions:</span>
                            <span className="ml-2 font-semibold text-slate-200">{`${imageInfo.dimensions.w} x ${imageInfo.dimensions.h} px`}</span>
                        </div>
                    </div>
                     <div className="bg-slate-800/50 p-4 rounded-lg">
                        <div className="flex items-center text-sm font-semibold text-brand-secondary mb-2">
                            <SparklesIcon className="w-5 h-5 mr-2"/>
                            <span>AI Analysis</span>
                        </div>
                        {isLoadingDescription && (
                             <div className="h-10 animate-pulse bg-slate-700 rounded w-full"></div>
                        )}
                        {description && (
                            <p className="text-slate-300 italic">"{description}"</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
