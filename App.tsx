
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { UploadZone } from './components/UploadZone';
import { ControlsPanel } from './components/ControlsPanel';
import { ImageCard } from './components/ImageCard';
import { Loader } from './components/Loader';
import { OriginalImageDisplay } from './components/OriginalImageDisplay';
import { describeImage } from './services/geminiService';
import { fileToBase64, formatBytes, getImageDimensions } from './utils/imageUtils';
import type { ImageInfo, OptimizedImageResult } from './types';

const App: React.FC = () => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalImageInfo, setOriginalImageInfo] = useState<ImageInfo | null>(null);
  const [optimizedImages, setOptimizedImages] = useState<OptimizedImageResult[]>([]);
  const [imageDescription, setImageDescription] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(80);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setOptimizedImages([]);
    setImageDescription(null);
    setOriginalFile(file);

    try {
      const imageUrl = URL.createObjectURL(file);
      const dimensions = await getImageDimensions(imageUrl);
      setOriginalImageInfo({
        url: imageUrl,
        size: file.size,
        dimensions,
        type: file.type.split('/')[1].toUpperCase(),
      });
    } catch (err) {
      setError('Could not process the selected file. Please try another image.');
      setOriginalFile(null);
      setOriginalImageInfo(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleOptimize = useCallback(async () => {
    if (!originalFile || !originalImageInfo) return;

    setIsLoading(true);
    setError(null);
    setOptimizedImages([]);
    setImageDescription(null);

    try {
      const base64Data = await fileToBase64(originalFile);
      const descriptionPromise = describeImage(base64Data, originalFile.type);
      
      const results: OptimizedImageResult[] = [];
      const originalSize = originalImageInfo.size;
      const qualityFactor = quality / 100;

      // Simulate WebP
      results.push({
        format: 'WebP',
        size: originalSize * 0.75 * qualityFactor,
        quality,
        url: originalImageInfo.url,
        dimensions: originalImageInfo.dimensions,
        savings: 1 - (originalSize * 0.75 * qualityFactor) / originalSize,
      });

      // Simulate AVIF
      results.push({
        format: 'AVIF',
        size: originalSize * 0.5 * qualityFactor,
        quality,
        url: originalImageInfo.url,
        dimensions: originalImageInfo.dimensions,
        savings: 1 - (originalSize * 0.5 * qualityFactor) / originalSize,
      });

      setOptimizedImages(results);

      const description = await descriptionPromise;
      setImageDescription(description);

    } catch (err) {
      console.error(err);
      setError('An error occurred during optimization or AI analysis.');
    } finally {
      setIsLoading(false);
    }
  }, [originalFile, originalImageInfo, quality]);

  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-8 space-y-6">
                <ControlsPanel
                    quality={quality}
                    setQuality={setQuality}
                    onOptimize={handleOptimize}
                    isLoading={isLoading}
                    isImageLoaded={!!originalFile}
                />
                 {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-lg text-sm">{error}</div>}
            </div>
          </div>
          <div className="lg:col-span-8 xl:col-span-9">
            {!originalImageInfo && !isLoading && (
              <UploadZone onImageUpload={handleImageUpload} />
            )}
             {isLoading && !originalImageInfo && <Loader text="Processing Upload..." />}
            {originalImageInfo && (
              <div className="space-y-8">
                <OriginalImageDisplay 
                    imageInfo={originalImageInfo} 
                    description={imageDescription}
                    isLoadingDescription={isLoading && !imageDescription}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {optimizedImages.map((img) => (
                    <ImageCard
                      key={img.format}
                      title={`${img.format} Output`}
                      imageUrl={img.url}
                      info={{
                        format: img.format,
                        size: formatBytes(img.size),
                        dimensions: `${img.dimensions.w} x ${img.dimensions.h}`,
                        quality: `${img.quality}%`,
                        savings: `${(img.savings * 100).toFixed(1)}%`,
                      }}
                      onDownload={() => {
                        const link = document.createElement('a');
                        link.href = img.url;
                        link.download = `optimized_image.${img.format.toLowerCase()}`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    />
                  ))}
                </div>
                {isLoading && optimizedImages.length === 0 && (
                    <div className="mt-8 flex justify-center">
                        <Loader text="Optimizing & Analyzing..." />
                    </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
