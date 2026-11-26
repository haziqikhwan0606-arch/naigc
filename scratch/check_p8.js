const { spawn } = require('child_process');
const fs = require('fs');

async function checkPillar8() {
  const chromeProc = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--remote-debugging-port=9995',
    '--headless=new',
    '--disable-gpu',
    `--user-data-dir=/tmp/cdp_chk8_${Date.now()}`,
    '--window-size=1440,900',
    'http://localhost/naigc/index.html'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const listRes = await fetch('http://127.0.0.1:9995/json');
    const tabs = await listRes.json();
    const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
    await new Promise(res => ws.onopen = res);

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const curId = id++;
        const handler = evt => {
          const msg = JSON.parse(evt.data);
          if (msg.id === curId) {
            ws.removeEventListener('message', handler);
            if (msg.error) reject(msg.error);
            else resolve(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    }

    await send('Runtime.enable');
    await send('Page.enable');

    // Click Pillar 8 directly
    const res = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const p8 = document.querySelector('a[data-pillar="8"]');
          if (!p8) return { found: false };
          p8.click();
          const slider = document.getElementById('naigc-pillar-slider');
          return {
            found: true,
            sliderClass: slider.className,
            sliderOpen: slider.classList.contains('is-open'),
            frameSrc: document.getElementById('naigc-pillar-frame').src
          };
        })()
      `,
      returnByValue: true
    });

    console.log('Pillar 8 click evaluated:', res.result.value);

    await new Promise(r => setTimeout(r, 2000));

    const snap = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/pillar_08_direct_check.png', Buffer.from(snap.data, 'base64'));
    console.log('Saved pillar_08_direct_check.png');
  } finally {
    chromeProc.kill('SIGKILL');
  }
}

checkPillar8().catch(console.error);

