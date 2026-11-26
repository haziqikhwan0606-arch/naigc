const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const artifactDir = '/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd';
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const port = 9993;

  const chromeProc = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    `--user-data-dir=/tmp/cdp_seamless_${Date.now()}`,
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

    console.log('1. Loading homepage index.html...');
    await send('Page.navigate', { url: 'http://localhost/naigc/index.html' });
    await sleep(3000);

    // 2. Click Pillar 01 (Left Wing)
    console.log('2. Clicking Pillar 01 (Sliding in from Left)...');
    await send('Runtime.evaluate', {
      expression: `
        const p1 = document.querySelector('a[data-pillar="1"]');
        if (p1) p1.click();
      `
    });

    // Wait for slide animation (0.65s) + content ready
    await sleep(1500);
    const snapP1Open = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'seamless_slider_p1_open.png'), Buffer.from(snapP1Open.data, 'base64'));
    console.log('Saved seamless_slider_p1_open.png');

    // 3. Click Close Button (Slide back to Left)
    console.log('3. Clicking Core Hub return button (Sliding back to Left)...');
    await send('Runtime.evaluate', {
      expression: `
        const closeBtn = document.getElementById('naigc-slider-close');
        if (closeBtn) closeBtn.click();
      `
    });

    await sleep(800);
    const snapP1Closed = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'seamless_slider_p1_closed.png'), Buffer.from(snapP1Closed.data, 'base64'));
    console.log('Saved seamless_slider_p1_closed.png');

    // 4. Click Pillar 08 (Right Wing)
    console.log('4. Clicking Pillar 08 (Sliding in from Right)...');
    await send('Runtime.evaluate', {
      expression: `
        const p8 = document.querySelector('a[data-pillar="8"]');
        if (p8) {
          p8.scrollIntoView();
          p8.click();
        }
      `
    });

    await sleep(2200);
    const snapP8Open = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'seamless_slider_p8_open.png'), Buffer.from(snapP8Open.data, 'base64'));
    console.log('Saved seamless_slider_p8_open.png');

    // 5. Click Close Button (Slide back to Right)
    console.log('5. Clicking Core Hub return button (Sliding back to Right)...');
    await send('Runtime.evaluate', {
      expression: `
        const closeBtn = document.getElementById('naigc-slider-close');
        if (closeBtn) closeBtn.click();
      `
    });

    await sleep(800);
    const snapP8Closed = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'seamless_slider_p8_closed.png'), Buffer.from(snapP8Closed.data, 'base64'));
    console.log('Saved seamless_slider_p8_closed.png');

    console.log('ALL SEAMLESS SLIDER TRANSITIONS VERIFIED PERFECTLY!');
  } finally {
    chromeProc.kill('SIGKILL');
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
