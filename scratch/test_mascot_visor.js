const { spawn } = require('child_process');
const fs = require('fs');

async function captureMascotVisor() {
  const port = 9996;
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=/tmp/cdp_visor_' + Date.now(),
    '--window-size=1440,900'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch(`http://localhost:${port}/json`);
    const tabs = await listRes.json();
    const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
    await new Promise(res => ws.onopen = res);

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const msgId = id++;
        const handler = (evt) => {
          const data = JSON.parse(evt.data);
          if (data.id === msgId) {
            ws.removeEventListener('message', handler);
            resolve(data.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await send('Page.enable');
    await send('Runtime.enable');

    console.log('1. Loading index.html...');
    await send('Page.navigate', { url: 'http://localhost/naigc/index.html' });

    // Wait until pillars are in the DOM
    for (let i = 0; i < 30; i++) {
      const chk = await send('Runtime.evaluate', {
        expression: '!!document.querySelector("a[data-pillar=\\"1\\"]")',
        returnByValue: true
      });
      if (chk.result.value) break;
      await new Promise(r => setTimeout(r, 300));
    }

    console.log('2. Scrolling to stage 5120...');
    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 5120)' });
    await new Promise(r => setTimeout(r, 2000));

    // Capture mascot stage screenshot
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    const outPath = '/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/mascot_stage_without_visor_logo.png';
    fs.writeFileSync(outPath, Buffer.from(shot.data, 'base64'));
    console.log('Saved mascot_stage_without_visor_logo.png');

    // Also capture a close-up of the mascot
    await send('Runtime.evaluate', {
      expression: `(() => {
        const canvas = document.querySelector('canvas');
        return { hasCanvas: !!canvas };
      })()`,
      returnByValue: true
    });

    ws.close();
  } finally {
    chrome.kill();
  }
}

captureMascotVisor().catch(console.error);
