

export interface VideoSource {
  url: string;
  title: string;
  quality: string;
  description?: string;
}

export const HLS_SOURCES: VideoSource[] = [
  {
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    title: 'Mux Test Stream',
    quality: 'HD 1080p',
    description: 'High quality adaptive HLS stream from Mux'
  },
  {
    url: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
    title: 'Tears of Steel',
    quality: 'HD 720p',
    description: 'Open source film demo stream'
  },
  {
    url: 'https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8',
    title: 'Big Buck Bunny',
    quality: 'Multi-quality',
    description: 'Adaptive bitrate HLS stream'
  }
];

export const FALLBACK_SOURCES: VideoSource[] = [
  {
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    title: 'Big Buck Bunny (MP4)',
    quality: 'HD 720p',
    description: 'Standard MP4 video for compatibility'
  },
  {
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    title: 'Elephants Dream (MP4)',
    quality: 'HD 720p',
    description: 'Open source film in MP4 format'
  }
];

export const getPrimaryVideoSource = (): VideoSource => {
  return HLS_SOURCES[0];
};

export const getRandomVideoSource = (): VideoSource => {
  const allSources = [...HLS_SOURCES, ...FALLBACK_SOURCES];
  return allSources[Math.floor(Math.random() * allSources.length)];
};

export const getVideoSourceByQuality = (preferHD: boolean = true): VideoSource => {
  if (preferHD) {
    return HLS_SOURCES.find(source => source.quality.includes('1080p')) || HLS_SOURCES[0];
  }
  return HLS_SOURCES.find(source => source.quality.includes('720p')) || HLS_SOURCES[0];
};