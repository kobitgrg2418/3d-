declare module 'mp4box' {
  export interface MP4BoxFile {
    tags: any;
    samples: any;
    onReady: (info: any) => void;
    onSegment: (id: number, buffer: ArrayBuffer, sampleNumber: number, isLast: boolean) => void;
    onError: (error: any) => void;
    setSegmentOptions: (id: number, options: any) => void;
    initializeSegmentation: () => void;
    flush: () => void;
  }

  export interface MP4BoxInfo {
    duration: number;
    timescale: number;
    width: number;
    height: number;
  }

  export function createFile(): MP4BoxFile;
  export function createFileBuffer(ab: ArrayBuffer): MP4BoxFile;
}
