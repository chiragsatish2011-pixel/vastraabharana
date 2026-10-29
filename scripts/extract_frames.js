const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ffmpegPath = 'C:\\Users\\chira\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0.2-full_build\\bin\\ffmpeg.exe';
const videoFile = 'C:\\Users\\chira\\.gemini\\antigravity\\brain\\7d258d2e-307f-4236-ac6d-fc116759d5b2\\.user_uploaded\\media_1793187465322_07e7f702.mp4';

const outDir = path.resolve('./extracted_video_frames');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Also copy/symlink to artifact brain directory so images can be viewed
const brainDir = 'C:\\Users\\chira\\.gemini\\antigravity\\brain\\7d258d2e-307f-4236-ac6d-fc116759d5b2\\video_frames';
if (!fs.existsSync(brainDir)) fs.mkdirSync(brainDir, { recursive: true });

console.log('Extracting frames from video at 2 fps (approx 46 frames)...');
const cmd = `"${ffmpegPath}" -y -i "${videoFile}" -vf "fps=2" -q:v 2 "${outDir}\\frame_%03d.jpg"`;
execSync(cmd, { stdio: 'inherit' });

// Also copy to brainDir for artifact embedding
const files = fs.readdirSync(outDir);
console.log(`Extracted ${files.length} frames.`);
for (const f of files) {
  fs.copyFileSync(path.join(outDir, f), path.join(brainDir, f));
}

console.log('Frames copied to brain directory for artifact embedding.');
