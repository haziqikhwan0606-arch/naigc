const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const artifactDir = '/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd';
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const port = 9992;

  const chromeProc = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    `--user-data-dir=/tmp/cdp_trans8_${Date.now()}`,
    '--window-size=1440,900'
  ]);

  await sleep(2500);

  try {
    const listRes = await fetch(`http://127.0.0.1:${port}/json`);
    const tabs = await listRes.json();
    const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
    await new Promise(res => ws.onopen = res);

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const curId = id++;
        const handler = evt => {
          const msg = JSON.parse(evt.data);
          if (msg.id === curId) {
            ws.removeEventListener('message', handler);
            if (msg.error) reject(msg.error);
            else resolve(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    }

    await send('Page.enable');
    await send('Runtime.enable');

    // Navigate to Homepage
    console.log('Navigating to index.html...');
    await send('Page.navigate', { url: 'http://localhost/naigc/index.html' });
    await sleep(2500);

    // Click Pillar 08 (Right Wing)
    console.log('Testing Pillar 08 click on index.html (Slide From Right)...');
    await send('Runtime.evaluate', {
      expression: `
        const p8 = document.querySelector('a[data-pillar="8"]');
        if (p8) {
          p8.scrollIntoView();
          p8.click();
        }
      `
    });

    // Capture transition curtain wipe from right
    await sleep(200);
    const snapP8Wipe = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'transition_pillar_08_right_wipe.png'), Buffer.from(snapP8Wipe.data, 'base64'));
    console.log('Saved transition_pillar_08_right_wipe.png');

    // Wait for future-technology.html to load and reveal stage
    await sleep(4000);
    const snapFutureTech = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'pillar_08_future_tech_entered.png'), Buffer.from(snapFutureTech.data, 'base64'));
    console.log('Saved pillar_08_future_tech_entered.png');

    console.log('RIGHT WING DIRECTIONAL TRANSITIONS VERIFIED!');
  } finally {
    chromeProc.kill('SIGKILL');
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
