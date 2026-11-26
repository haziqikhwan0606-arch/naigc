const { spawn } = require('child_process');
const fs = require('fs');

async function testAutoScroll() {
  const port = 9855;
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=/tmp/cdp_test_autoscroll_' + Date.now(),
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

    // Test loading index.html?return=stage#naigc-pillars
    console.log('Navigating to index.html?return=stage#naigc-pillars');
    await send('Page.navigate', { url: 'http://localhost/naigc/index.html?return=stage#naigc-pillars' });

    // Monitor scrollY over 5 seconds
    for (let i = 0; i < 10; i++) {
      await new Promise(r => setTimeout(r, 500));
      const info = await send('Runtime.evaluate', {
        expression: `(() => {
          const p = document.getElementById('naigc-pillars');
          return {
            time: ${i * 500},
            scrollY: window.scrollY,
            hasPillars: !!p,
            isActive: p ? p.classList.contains('is-stage-active') : false
          };
        })()`,
        returnByValue: true
      });
      console.log('Status at', i * 500, 'ms:', info.result.value);
    }

    const ss = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/autoscroll_direct.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved autoscroll_direct.png');

    ws.close();
  } finally {
    chrome.kill();
  }
}

testAutoScroll();

