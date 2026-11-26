const { spawn } = require('child_process');
const fs = require('fs');

async function verifyFinal() {
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9980',
    '--user-data-dir=/tmp/chrome_verify_tapered_final',
    '--window-size=1440,900',
    'http://localhost/naigc/#academy'
  ]);
  await new Promise(r => setTimeout(r, 3500));
  try {
    const listRes = await fetch('http://127.0.0.1:9980/json');
    const tabs = await listRes.json();
    const ws = new globalThis.WebSocket(tabs[0].webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);
    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const curId = id++;
        const onMessage = (event) => {
          const msg = JSON.parse(event.data);
          if (msg.id === curId) {
            ws.removeEventListener('message', onMessage);
            resolve(msg.result);
          }
        };
        ws.addEventListener('message', onMessage);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    }

    // Wait until loader is gone
    for (let i = 0; i < 30; i++) {
      const res = await send('Runtime.evaluate', {
        expression: `(function() {
          const loader = document.getElementById("mq4-loader");
          const isDone = !loader || loader.style.display === "none" || !document.body.contains(loader);
          return isDone && !!document.getElementById("naigc-pillars");
        })()`,
        returnByValue: true
      });
      if (res.result?.value) break;
      await new Promise(r => setTimeout(r, 1000));
    }

    // Scroll to pillars showcase
    await send('Runtime.evaluate', {
      expression: `(function() {
        const p = document.getElementById("naigc-pillars");
        if (p) {
          p.scrollIntoView({ block: "center", behavior: "instant" });
        }
      })()`
    });

    await new Promise(r => setTimeout(r, 1500));

    const snap = await send('Page.captureScreenshot', { format: 'png' });
    const outPath = '/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/tapered_enhanced_verified.png';
    fs.writeFileSync(outPath, Buffer.from(snap.data, 'base64'));
    console.log('Saved verified screenshot to', outPath);
  } finally {
    chrome.kill();
  }
}
verifyFinal();
