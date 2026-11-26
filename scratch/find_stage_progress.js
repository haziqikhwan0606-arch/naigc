const { spawn } = require('child_process');
const fs = require('fs');

async function findStageProgress() {
  const port = 9877;
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

    // Check scroll height and test scrolls
    const info = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const pillars = document.getElementById('naigc-pillars');
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          return {
            maxScroll,
            scrollY: window.scrollY,
            pillarsRect: pillars ? pillars.getBoundingClientRect() : null
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Page info:', JSON.stringify(info.result.value, null, 2));

    // Test different scroll positions to see when the 8 pillars and full body appear
    const testScrolls = [0, 500, 1000, 1500, 2000, 2500, 3000];
    for (const sy of testScrolls) {
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${sy});` });
      await new Promise(r => setTimeout(r, 800));
      const res = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const p = document.getElementById('naigc-pillars');
            const intro = document.querySelector('.mq4-intro');
            return {
              scrollY: window.scrollY,
              pillarsOpacity: p ? window.getComputedStyle(p).opacity : null,
              pillarsDisplay: p ? window.getComputedStyle(p).display : null,
              pillarsTop: p ? p.getBoundingClientRect().top : null,
              introClass: intro ? intro.className : null
            };
          })()
        `,
        returnByValue: true
      });
      console.log(`ScrollY ${sy}:`, JSON.stringify(res.result.value));
      const ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/scroll_${sy}.png`, Buffer.from(ss.data, 'base64'));
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    chromeProcess.kill();
  }
}

findStageProgress();

