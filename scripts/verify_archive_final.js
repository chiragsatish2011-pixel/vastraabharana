const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const targetDir = 'C:\\Users\\chira\\.gemini\\antigravity\\brain\\7d258d2e-307f-4236-ac6d-fc116759d5b2\\screenshots';

async function testArchive() {
  return new Promise((resolve, reject) => {
    const proc = exec(`"${chrome}" --headless --remote-debugging-port=9222 http://localhost:3000`);
    
    setTimeout(async () => {
      try {
        const listRes = await fetch('http://127.0.0.1:9222/json');
        const tabs = await listRes.json();
        const tab = tabs.find(t => t.url.includes('localhost')) || tabs[0];
        const ws = new WebSocket(tab.webSocketDebuggerUrl);

        ws.on('open', () => {
          ws.send(JSON.stringify({
            id: 1,
            method: 'Emulation.setDeviceMetricsOverride',
            params: { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false }
          }));

          // 1. Scroll right above archive
          setTimeout(() => {
            ws.send(JSON.stringify({
              id: 2,
              method: 'Runtime.evaluate',
              params: {
                expression: `
                  const el = document.getElementById('archive2026');
                  if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
                `
              }
            }));

            // 2. Capture closed
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 10,
                method: 'Page.captureScreenshot',
                params: { format: 'png' }
              }));
            }, 600);

            // 3. Scroll halfway through archive track
            setTimeout(() => {
              ws.send(JSON.stringify({
                id: 3,
                method: 'Runtime.evaluate',
                params: {
                  expression: `
                    window.scrollBy(0, 350);
                  `
                }
              }));

              setTimeout(() => {
                ws.send(JSON.stringify({
                  id: 20,
                  method: 'Page.captureScreenshot',
                  params: { format: 'png' }
                }));
              }, 600);

              // 4. Scroll to unlock permanently
              setTimeout(() => {
                ws.send(JSON.stringify({
                  id: 4,
                  method: 'Runtime.evaluate',
                  params: {
                    expression: `
                      window.scrollBy(0, 600);
                    `
                  }
                }));

                setTimeout(() => {
                  ws.send(JSON.stringify({
                    id: 30,
                    method: 'Page.captureScreenshot',
                    params: { format: 'png' }
                  }));
                }, 600);
              }, 1000);
            }, 1200);
          }, 600);
        });

        ws.on('message', (data) => {
          const res = JSON.parse(data);
          if (res.id === 10 && res.result?.data) {
            fs.writeFileSync(path.join(targetDir, 'final_proof_archive_1_white_shutters.png'), Buffer.from(res.result.data, 'base64'));
            console.log('Saved 1: White Shutters Closed');
          }
          if (res.id === 20 && res.result?.data) {
            fs.writeFileSync(path.join(targetDir, 'final_proof_archive_2_parting.png'), Buffer.from(res.result.data, 'base64'));
            console.log('Saved 2: Parting Reveal');
          }
          if (res.id === 30 && res.result?.data) {
            fs.writeFileSync(path.join(targetDir, 'final_proof_archive_3_impact_2026.png'), Buffer.from(res.result.data, 'base64'));
            console.log('Saved 3: Impact 2026 Revealed');
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

testArchive().catch(console.error);
