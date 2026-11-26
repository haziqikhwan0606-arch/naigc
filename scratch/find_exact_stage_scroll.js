const { spawn } = require('child_process');
const fs = require('fs');

async function testExactStage() {
  const port = 9866;
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=/tmp/cdp_exact_stage_' + Date.now(),
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
    await send('Page.navigate', { url: 'http://localhost/naigc/index.html' });

    // Wait until loader disappears
    for (let i = 0; i < 40; i++) {
      const check = await send('Runtime.evaluate', {
        expression: `(() => {
          const loader = document.getElementById('mq4-loader');
          const isLocked = document.documentElement.classList.contains('mq4-lock');
          return { hasLoader: !!loader, isLocked, scrollHeight: document.documentElement.scrollHeight };
        })()`,
        returnByValue: true
      });
      console.log(`Poll ${i}:`, check.result.value);
      if (!check.result.value.isLocked && check.result.value.scrollHeight > 2000) break;
      await new Promise(r => setTimeout(r, 500));
    }

    // Now test scrolling to the stage
    const scrollTargets = [4500, 5000, 5120, 5200];
    for (const target of scrollTargets) {
      await send('Runtime.evaluate', {
        expression: `window.scrollTo(0, ${target});`
      });
      await new Promise(r => setTimeout(r, 800));

      const stageInfo = await send('Runtime.evaluate', {
        expression: `(() => {
          const pillars = document.getElementById('naigc-pillars');
          return {
            scrollY: window.scrollY,
            isActive: pillars ? pillars.classList.contains('is-stage-active') : false
          };
        })()`,
        returnByValue: true
      });
      console.log(`Target ${target}:`, stageInfo.result.value);

      const ss = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/stage_scroll_${target}.png`, Buffer.from(ss.data, 'base64'));
    }

    ws.close();
  } finally {
    chrome.kill();
  }
}

testExactStage();

