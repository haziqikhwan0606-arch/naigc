const { spawn } = require('child_process');
const fs = require('fs');

async function captureStage() {
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9333',
    '--user-data-dir=/tmp/chrome_stage_profile',
    '--window-size=1440,900',
    'http://localhost/naigc/'
  ]);

  await new Promise(r => setTimeout(r, 3000));

  try {
    const listRes = await fetch('http://localhost:9333/json');
    const tabs = await listRes.json();
    const wsUrl = tabs[0].webSocketDebuggerUrl;

    const WebSocket = require('ws');
    const ws = new WebSocket(wsUrl);
    await new Promise(r => ws.on('open', r));

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

    // Scroll down to reveal stage
    await send('Runtime.evaluate', {
      expression: `window.scrollTo({ top: 1800, behavior: 'instant' });`
    });

    await new Promise(r => setTimeout(r, 2000));

    const screenshot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/daytime_stage_scrolled.png', Buffer.from(screenshot.data, 'base64'));
    console.log('Saved daytime_stage_scrolled.png');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    chrome.kill();
  }
}

captureStage();
