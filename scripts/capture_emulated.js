const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targetDir = 'C:\\Users\\chira\\.gemini\\antigravity\\brain\\7d258d2e-307f-4236-ac6d-fc116759d5b2\\screenshots';

async function captureDevice(device) {
  return new Promise((resolve, reject) => {
    const proc = exec(`"${chrome}" --headless --remote-debugging-port=9222 http://localhost:3000`);
    
    setTimeout(async () => {
      try {
        const listRes = await fetch('http://127.0.0.1:9222/json');
        const tabs = await listRes.json();
        const tab = tabs.find(t => t.url.includes('localhost')) || tabs[0];
        const ws = new WebSocket(tab.webSocketDebuggerUrl);

        ws.on('open', () => {
          // Set device metrics
          ws.send(JSON.stringify({
            id: 1,
            method: 'Emulation.setDeviceMetricsOverride',
            params: {
              width: device.w,
              height: device.h,
              deviceScaleFactor: 2,
              mobile: device.mobile
            }
          }));

          // Wait 600ms then capture screenshot
          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 2,
              method: 'Page.captureScreenshot',
              params: { format: 'png' }
            }));
          }, 800);
        });

        ws.on('message', (data) => {
          const res = JSON.parse(data);
          if (res.id === 2 && res.result && res.result.data) {
            const buffer = Buffer.from(res.result.data, 'base64');
            const dest = path.join(targetDir, device.file);
            fs.writeFileSync(dest, buffer);
            console.log(`Saved emulated screenshot: ${device.file}`);
            ws.close();
            proc.kill();
            resolve();
          }
        });
      } catch (err) {
        proc.kill();
        reject(err);
      }
    }, 1500);
  });
}

async function runAll() {
  const devices = [
    { file: 'verify_true_mobile_390.png', w: 390, h: 844, mobile: true },
    { file: 'verify_true_tablet_768.png', w: 768, h: 1024, mobile: true }
  ];

  for (const d of devices) {
    console.log(`Capturing ${d.file} (${d.w}x${d.h})...`);
    await captureDevice(d);
    await new Promise(r => setTimeout(r, 1000));
  }
  console.log('All emulated captures complete.');
}

runAll().catch(console.error);
