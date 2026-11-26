const { spawn } = require('child_process');
const fs = require('fs');

async function testHeadTracking() {
  const port = 9899;
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

    // Wait for page, mascot and 3D scene to fully load
    await new Promise(r => setTimeout(r, 4500));

    // Test 1: Move mouse to upper right
    console.log('Dispatching mouse to top-right (x: 1200, y: 250)...');
    await send('Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      x: 1200,
      y: 250
    });
    // Wait for lerp to catch up
    await new Promise(r => setTimeout(r, 600));
    const ssRight = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/mascot_head_right.png', Buffer.from(ssRight.data, 'base64'));
    console.log('Saved mascot_head_right.png');

    // Test 2: Move mouse to middle-left
    console.log('Dispatching mouse to left (x: 240, y: 350)...');
    await send('Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      x: 240,
      y: 350
    });
    // Wait for lerp to catch up
    await new Promise(r => setTimeout(r, 600));
    const ssLeft = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/mascot_head_left.png', Buffer.from(ssLeft.data, 'base64'));
    console.log('Saved mascot_head_left.png');

    console.log('Done test!');
  } catch (err) {
    console.error('Error during test:', err);
  } finally {
    chromeProcess.kill();
  }
}

testHeadTracking();

