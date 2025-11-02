
export interface ImageDimensions {
  w: number;
  h: number;
}

export interface ImageInfo {
  url: string;
  size: number;
  dimensions: ImageDimensions;
  type: string;
}

export interface OptimizedImageResult {
  format: 'WebP' | 'AVIF';
  size: number;
  quality: number;
  url: string;
  dimensions: ImageDimensions;
  savings: number;
}
