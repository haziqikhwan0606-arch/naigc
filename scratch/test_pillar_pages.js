const { spawn } = require('child_process');
const fs = require('fs');

async function testPillarScreenshots() {
  const port = 9944;
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=/tmp/cdp_pillar_' + Date.now(),
    '--window-size=1440,1100'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const listRes = await fetch(`http://localhost:${port}/json`);
    const tabs = await listRes.json();
    const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
    await new Promise(res => ws.onopen = res);

    let id = 1;
    function send(method, params = {}) {
      return new Promise(res => {
        const curId = id++;
        const handler = evt => {
          const msg = JSON.parse(evt.data);
          if (msg.id === curId) {
            ws.removeEventListener('message', handler);
            res(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    }

    await send('Page.enable');

    const testPages = [
      { url: 'http://localhost/naigc/pillars/academy.html', file: 'preview_pillar_01_academy.png' },
      { url: 'http://localhost/naigc/pillars/creative-studio.html', file: 'preview_pillar_02_creative_studio.png' },
      { url: 'http://localhost/naigc/pillars/future-technology.html', file: 'preview_pillar_08_future_tech.png' }
    ];

    for (const p of testPages) {
      await send('Page.navigate', { url: p.url });
      await new Promise(r => setTimeout(r, 1200));
      const ss = await send('Page.captureScreenshot', { format: 'png' });
      const outPath = `/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/${p.file}`;
      fs.writeFileSync(outPath, Buffer.from(ss.data, 'base64'));
      console.log(`Saved: ${p.file}`);
    }

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
  }
}

testPillarScreenshots();

