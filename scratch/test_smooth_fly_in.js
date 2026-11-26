const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const artifactDir = '/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd';
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const port = 9994;

  const chromeProc = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    `--user-data-dir=/tmp/cdp_smooth_${Date.now()}`,
    '--window-size=1440,900'
  ]);

  await sleep(2500);

  try {
    const listRes = await fetch(`http://127.0.0.1:${port}/json`);
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

    const consoleLogs = [];
    ws.addEventListener('message', evt => {
      const msg = JSON.parse(evt.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        consoleLogs.push(`[CONSOLE ${msg.params.type}] ${msg.params.args.map(a => a.value || a.description).join(' ')}`);
      } else if (msg.method === 'Runtime.exceptionThrown') {
        consoleLogs.push(`[EXCEPTION] ${JSON.stringify(msg.params.exceptionDetails)}`);
      }
    });

    await send('Page.enable');
    await send('Runtime.enable');

    console.log('1. Navigating to homepage...');
    await send('Page.navigate', { url: 'http://localhost/naigc/index.html' });
    await sleep(2000);

    console.log('2. Clicking Pillar 01 (Left Wing Entrance)...');
    await send('Runtime.evaluate', {
      expression: `
        const p1 = document.querySelector('a[data-pillar="1"]');
        if (p1) p1.click();
      `
    });

    // Capture mid-transition wipe from left
    await sleep(180);
    const snapP1Wipe = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'portal_wipe_left_departure.png'), Buffer.from(snapP1Wipe.data, 'base64'));
    console.log('Saved portal_wipe_left_departure.png (mid-wipe from left)');

    // Wait for arrival on academy.html and reveal
    await sleep(2000);

    const p1Eval = await send('Runtime.evaluate', {
      expression: `({
        url: window.location.href,
        trackClass: document.getElementById('at-track') ? document.getElementById('at-track').className : null,
        wiperClass: document.getElementById('naigc-portal-wipe') ? document.getElementById('naigc-portal-wipe').className : null,
        cardCount: document.querySelectorAll('.at-card').length
      })`,
      returnByValue: true
    });
    console.log('Pillar 01 evaluation:', p1Eval.result.value);

    const snapP1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'pillar_01_revealed.png'), Buffer.from(snapP1.data, 'base64'));
    console.log('Saved pillar_01_revealed.png');

    console.log('3. Returning to Core Hub (index.html)...');
    await send('Runtime.evaluate', {
      expression: `
        const homeLink = document.querySelector('a[href*="index.html"]');
        if (homeLink) homeLink.click();
      `
    });
    await sleep(180);
    const snapReturnWipe = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'portal_wipe_return.png'), Buffer.from(snapReturnWipe.data, 'base64'));
    console.log('Saved portal_wipe_return.png');

    await sleep(2000);

    console.log('4. Clicking Pillar 08 (Right Wing Entrance)...');
    await send('Runtime.evaluate', {
      expression: `
        const p8 = document.querySelector('a[data-pillar="8"]');
        if (p8) p8.click();
      `
    });
    await sleep(180);
    const snapP8Wipe = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'portal_wipe_right_departure.png'), Buffer.from(snapP8Wipe.data, 'base64'));
    console.log('Saved portal_wipe_right_departure.png (mid-wipe from right)');

    await sleep(2000);

    const p8Eval = await send('Runtime.evaluate', {
      expression: `({
        url: window.location.href,
        trackClass: document.getElementById('at-track') ? document.getElementById('at-track').className : null,
        wiperClass: document.getElementById('naigc-portal-wipe') ? document.getElementById('naigc-portal-wipe').className : null,
        cardCount: document.querySelectorAll('.at-card').length
      })`,
      returnByValue: true
    });
    console.log('Pillar 08 evaluation:', p8Eval.result.value);

    const snapP8 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'pillar_08_revealed.png'), Buffer.from(snapP8.data, 'base64'));
    console.log('Saved pillar_08_revealed.png');

    console.log('--- CONSOLE LOGS & EXCEPTIONS ---');
    const filteredLogs = consoleLogs.filter(l => !l.includes('WebGL'));
    console.log(filteredLogs.length > 0 ? filteredLogs.join('\n') : 'CLEAN CONSOLE! ZERO ERRORS!');

  } finally {
    chromeProc.kill('SIGKILL');
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
