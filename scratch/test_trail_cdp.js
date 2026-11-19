const http = require('http');
const { execSync, spawn } = require('child_process');
const fs = require('fs');

async function testScreenPaint() {
  // Launch Chrome with remote debugging
  const chromeProcess = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    '--user-data-dir=/tmp/chrome_cdp_profile',
    '--window-size=1440,900',
    'http://localhost/naigc/'
  ]);

  // Wait 3 seconds for chrome to start
  await new Promise(r => setTimeout(r, 3500));

  try {
    const listRes = await fetch('http://localhost:9222/json');
    const tabs = await listRes.json();
    const wsUrl = tabs[0].webSocketDebuggerUrl;

    const WebSocket = require('ws');
    const ws = new WebSocket(wsUrl);

    await new Promise(resolve => ws.on('open', resolve));

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const curId = id++;
        const handler = (data) => {
          const msg = JSON.parse(data.toString());
          if (msg.id === curId) {
            ws.off('message', handler);
            resolve(msg.result);
          }
        };
        ws.on('message', handler);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    }

    // Move mouse across a smooth ribbon path
    for (let t = 0; t <= 1; t += 0.05) {
      const x = 300 + t * 800;
      const y = 350 + Math.sin(t * Math.PI * 2) * 120;
      await send('Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        x: x,
        y: y
      });
      await new Promise(r => setTimeout(r, 16));
    }

    // Capture screenshot
    const screenshot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/screenpaint_mouse_trail.png', Buffer.from(screenshot.data, 'base64'));
    console.log('Successfully captured screenpaint trail!');
  } catch (err) {
    console.error('CDP Error:', err.message);
  } finally {
    chromeProcess.kill();
  }
}

testScreenPaint();

