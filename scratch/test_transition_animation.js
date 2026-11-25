const { spawn } = require('child_process');
const fs = require('fs');

async function testTransition() {
  const port = 9911;
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
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
      return new Promise(resolve => {
        const curId = id++;
        const handler = evt => {
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

    // Wait until loader finishes and removes .mq4-lock
    for (let i = 0; i < 30; i++) {
      const isLocked = await send('Runtime.evaluate', {
        expression: 'document.documentElement.classList.contains(\"mq4-lock\") || !!document.getElementById(\"mq4-loader\")',
        returnByValue: true
      });
      if (!isLocked.result.value) break;
      await new Promise(r => setTimeout(r, 500));
    }
    await new Promise(r => setTimeout(r, 1000));

    // Phase 1: Test scroll = 0 (Arcade Start)
    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' });
    await new Promise(r => setTimeout(r, 1000));
    const ss0 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/phase_0_start.png', Buffer.from(ss0.data, 'base64'));
    console.log('Saved phase_0_start.png');

    // Phase 2: Visor closeup (Image 1) at scroll = 4150
    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 4150)' });
    await new Promise(r => setTimeout(r, 1200));
    const ssVisor = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/phase_1_visor.png', Buffer.from(ssVisor.data, 'base64'));
    console.log('Saved phase_1_visor.png');

    // Phase 3: Transition trigger at scroll = 4550 (midway fly-in & shockwave)
    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 4550)' });
    await new Promise(r => setTimeout(r, 400)); // capture mid-animation
    const ssMid = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/phase_2_mid_transition.png', Buffer.from(ssMid.data, 'base64'));
    console.log('Saved phase_2_mid_transition.png');

    // Phase 4: Full deployment at scroll = 5120 (Image 2 fully docked)
    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 5120)' });
    await new Promise(r => setTimeout(r, 1500));
    const ssFinal = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/phase_3_full_stage.png', Buffer.from(ssFinal.data, 'base64'));
    console.log('Saved phase_3_full_stage.png');

    ws.close();
  } catch (err) {
    console.error(err);
  } finally {
    chrome.kill();
  }
}

testTransition();

