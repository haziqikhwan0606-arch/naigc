const { spawn } = require('child_process');
const fs = require('fs');

async function captureUpgrades() {
  const port = 9893;
  const chromeProcess = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=/tmp/chrome_cdp_profile_' + Date.now(),
    '--window-size=1440,900',
    'http://localhost/naigc/'
  ]);

  await new Promise(r => setTimeout(r, 3500));

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
    await new Promise(r => setTimeout(r, 4000));

    // Scroll to hold/8-pillars stage
    // In story, hold stage is around scrollY = 6600 - 7000
    for (const sc of [6200, 6600, 6900, 7200]) {
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${sc})` });
      await new Promise(r => setTimeout(r, 1200));

      const status = await send('Runtime.evaluate', {
        expression: `(() => {
          const intro = document.querySelector(".mq4-intro");
          const pad = document.querySelector(".naigc-quantum-pad");
          const s = intro ? window.getComputedStyle(intro) : null;
          return {
            scroll: ${sc},
            opacity: s ? s.opacity : null,
            vis: s ? s.visibility : null,
            pad: Boolean(pad)
          };
        })()`,
        returnByValue: true
      });
      console.log('Status at ' + sc + ':', status.result.value);

      if (status.result.value && status.result.value.opacity > 0.4) {
        const ss = await send('Page.captureScreenshot', { format: 'png' });
        const outPath = '/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/pillars_futuristic_upgrade.png';
        fs.writeFileSync(outPath, Buffer.from(ss.data, 'base64'));
        console.log('Saved 8 pillars upgrade screenshot at scroll ' + sc);
        break;
      }
    }

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    chromeProcess.kill();
  }
}

captureUpgrades();

