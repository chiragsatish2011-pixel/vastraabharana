const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ffmpegPath = 'C:\\Users\\chira\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0.2-full_build\\bin\\ffmpeg.exe';
const ffprobePath = 'C:\\Users\\chira\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0.2-full_build\\bin\\ffprobe.exe';

let videoFile = path.resolve('Best Shopify Theme for Clothing Brands ???? #shopifythemes #shopifytemplate #ecommerce - Materia Themes (1080p, h264).mp4');
if (!fs.existsSync(videoFile)) {
  const alt = 'C:\\Users\\chira\\.gemini\\antigravity\\brain\\7d258d2e-307f-4236-ac6d-fc116759d5b2\\.user_uploaded\\media_1793187465322_07e7f702.mp4';
  if (fs.existsSync(alt)) videoFile = alt;
}

console.log('Video file:', videoFile);
const probeCmd = `"${ffprobePath}" -v error -show_entries format=duration:stream=width,height,r_frame_rate,nb_frames -of json "${videoFile}"`;
try {
  const out = execSync(probeCmd, { encoding: 'utf-8' });
  const data = JSON.parse(out);
  console.log('Probe results:', JSON.stringify(data, null, 2));
  fs.writeFileSync('./data/video_probe.json', JSON.stringify(data, null, 2), 'utf-8');
} catch (e) {
  console.error('Error probing:', e.message);
}
