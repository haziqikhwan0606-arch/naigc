const { spawn } = require('child_process');
const fs = require('fs');

async function testFullStageHeadTracking() {
  const port = 9866;
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
    const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
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
    await new Promise(r => setTimeout(r, 3500));

    // Scroll to reveal/podium section
    // Let's find the exact scroll for reveal/hold
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          // Trigger smooth scroll or set scroll to reveal stage
          // Let's check window height * 4.2
          window.scrollTo(0, window.innerHeight * 4.2);
        })()
      `
    });

    await new Promise(r => setTimeout(r, 1500));

    // Test mouse right on stage
    await send('Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      x: 1250,
      y: 280
    });
    await new Promise(r => setTimeout(r, 600));

    const ss1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/stage_mascot_head_right.png', Buffer.from(ss1.data, 'base64'));
    console.log('Saved stage_mascot_head_right.png');

    // Test mouse left on stage
    await send('Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      x: 180,
      y: 400
    });
    await new Promise(r => setTimeout(r, 600));

    const ss2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/stage_mascot_head_left.png', Buffer.from(ss2.data, 'base64'));
    console.log('Saved stage_mascot_head_left.png');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    chromeProcess.kill();
  }
}

testFullStageHeadTracking();

