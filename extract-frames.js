const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configuration
const VIDEO_PATH = 'C:\\home\\claude\\porsche_project\\render\\frame_0001-1200.mkv';
const OUTPUT_DIR = path.join(__dirname, 'public', 'frames');
const FRAME_COUNT = 1200;
const FPS = 30; // Frames per second to extract
const EXTENSION = 'jpg';

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`Created directory: ${OUTPUT_DIR}`);
}

// Check if FFmpeg is available
try {
  execSync('ffmpeg -version', { stdio: 'ignore' });
  console.log('FFmpeg is available');
} catch (error) {
  console.error('FFmpeg is not installed or not in PATH');
  console.error('Please install FFmpeg: https://ffmpeg.org/download.html');
  process.exit(1);
}

// Extract frames using FFmpeg
console.log(`Extracting ${FRAME_COUNT} frames from video...`);
console.log(`Video: ${VIDEO_PATH}`);
console.log(`Output: ${OUTPUT_DIR}`);

const ffmpegCommand = `ffmpeg -i "${VIDEO_PATH}" -vf fps=${FPS} -q:v 2 "${OUTPUT_DIR}/frame_%04d.${EXTENSION}"`;

try {
  execSync(ffmpegCommand, { stdio: 'inherit' });
  console.log('Frame extraction completed successfully!');
} catch (error) {
  console.error('Error extracting frames:', error.message);
  process.exit(1);
}

// Verify frames were created
const files = fs.readdirSync(OUTPUT_DIR).filter(file => file.endsWith(`.${EXTENSION}`));
console.log(`Created ${files.length} frames`);

if (files.length === 0) {
  console.error('No frames were created. Please check the video path and FFmpeg installation.');
  process.exit(1);
}

console.log('Done! You can now run npm run dev to test the site.');
