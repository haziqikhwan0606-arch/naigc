const { spawn } = require('child_process');
const fs = require('fs');

async function testScreenPaint() {
  const port = 9666;
  const chromeProcess = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=/tmp/chrome_cdp_profile_' + Date.now(),
    '--window-size=1440,900',
    'http://localhost/naigc/'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const listRes = await fetch(`http://localhost:${port}/json`);
    const tabs = await listRes.json();
    const wsUrl = tabs[0].webSocketDebuggerUrl;

    const ws = new WebSocket(wsUrl);
    await new Promise(resolve => ws.onopen = resolve);

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const curId = id++;
        const handler = (evt) => {
          const msg = JSON.parse(evt.data);
          if (msg.id === curId) {
            ws.removeEventListener('message', handler);
            resolve(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    }

    await send('Runtime.enable');
    await send('Page.enable');
    await new Promise(r => setTimeout(r, 3000));

    // Move mouse across a smooth figure-8 / curved path
    for (let t = 0; t <= 1; t += 0.025) {
      const x = 720 + Math.sin(t * Math.PI * 4) * 280;
      const y = 450 + Math.sin(t * Math.PI * 2) * 160;
      await send('Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        x: Math.round(x),
        y: Math.round(y)
      });
      await new Promise(r => setTimeout(r, 16));
    }

    const screenshot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/cursor_trail_test.png', Buffer.from(screenshot.data, 'base64'));
    console.log('Saved cursor_trail_test.png');
  } catch (err) {
    console.error('CDP Error:', err.message);
  } finally {
    chromeProcess.kill();
  }
}

testScreenPaint();

