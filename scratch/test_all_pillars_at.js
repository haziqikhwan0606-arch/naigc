const { spawn } = require('child_process');
const fs = require('fs');

async function testEnhancedPillars() {
  const port = 9996;
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=/tmp/cdp_enh_' + Date.now(),
    '--window-size=1440,900'
  ]);

  await new Promise(r => setTimeout(r, 2000));

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
    await send('Runtime.enable');

    console.log('Navigating to academy.html...');
    await send('Page.navigate', { url: 'http://localhost/naigc/pillars/academy.html' });
    await new Promise(r => setTimeout(r, 3800));

    // Capture main view with Floating Dock, Dial, Equalizer
    const ss1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/academy_enhanced_at.png', Buffer.from(ss1.data, 'base64'));
    console.log('Saved academy_enhanced_at.png');

    // Open detail drawer to verify English metrics, WhatsApp CTA and status badge
    await send('Runtime.evaluate', {
      expression: 'document.querySelector(".at-btn-select").click()'
    });
    await new Promise(r => setTimeout(r, 800));

    const ss2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/academy_enhanced_drawer.png', Buffer.from(ss2.data, 'base64'));
    console.log('Saved academy_enhanced_drawer.png');

    ws.close();
  } catch(e) {
    console.error(e);
  } finally {
    chrome.kill();
  }
}

testEnhancedPillars();
