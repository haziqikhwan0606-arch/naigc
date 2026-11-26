const { spawn } = require('child_process');
const fs = require('fs');

async function testReturnToStage() {
  const port = 9833;
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=/tmp/cdp_test_stage_journey_' + Date.now(),
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

    console.log('1. Navigating to Pillar 1 (Academy)...');
    await send('Page.navigate', { url: 'http://localhost/naigc/pillars/academy.html' });
    await new Promise(r => setTimeout(r, 1500));

    console.log('2. Clicking BACK TO HOME...');
    await send('Runtime.evaluate', {
      expression: 'document.querySelector(".at-back-home-pill").click()'
    });

    // Wait for navigation and stage restoration
    console.log('3. Waiting for homepage to load and restore stage position...');
    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 300));
      const res = await send('Runtime.evaluate', {
        expression: `(() => {
          const p = document.getElementById('naigc-pillars');
          return {
            url: window.location.href,
            scrollY: window.scrollY,
            scrollHeight: document.documentElement.scrollHeight,
            hasPillars: !!p,
            isActive: p ? p.classList.contains('is-stage-active') : false
          };
        })()`,
        returnByValue: true
      });
      console.log(`Poll ${i}:`, res.result.value);
      if (res.result.value.scrollY >= 4500 && res.result.value.isActive) {
        console.log('SUCCESS! Directly landed on 8 pillars stage!');
        break;
      }
    }

    await new Promise(r => setTimeout(r, 500));
    const ss = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/returned_directly_to_stage.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved returned_directly_to_stage.png');

    ws.close();
  } finally {
    chrome.kill();
  }
}

testReturnToStage();
