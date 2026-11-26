const { spawn } = require('child_process');
const fs = require('fs');

async function run() {
  const port = 9444;
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=/tmp/chrome_dbg_profile_' + Date.now(),
    '--window-size=1440,900',
    'http://localhost/naigc/'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  try {
    const listRes = await fetch(`http://localhost:${port}/json`);
    const tabs = await listRes.json();
    const wsUrl = tabs[0].webSocketDebuggerUrl;

    const ws = new WebSocket(wsUrl);
    await new Promise(r => ws.onopen = r);

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

    ws.addEventListener('message', (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        const text = msg.params.args.map(a => a.value !== undefined ? a.value : JSON.stringify(a)).join(' ');
        console.log(`[CONSOLE ${msg.params.type}]`, text);
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        console.error('[EXCEPTION]', JSON.stringify(msg.params.exceptionDetails));
      }
    });

    await send('Runtime.enable');
    await send('Page.enable');

    await new Promise(r => setTimeout(r, 6000));

    const check = await send('Runtime.evaluate', {
      expression: `({
        hasFallback: !!document.querySelector('.mq4-fallback'),
        hasLoader: !!document.querySelector('.mq4-loader'),
        hasCanvas: !!document.querySelector('canvas')
      })`,
      returnByValue: true
    });
    console.log('DOM state:', check?.result?.value);

    const screenshot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/current_state.png', Buffer.from(screenshot.data, 'base64'));
    console.log('Saved current_state.png');
  } catch (e) {
    console.error('Test error:', e);
  } finally {
    chrome.kill();
  }
}

run();
