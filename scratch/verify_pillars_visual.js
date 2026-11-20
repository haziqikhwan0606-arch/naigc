const { spawn } = require('child_process');
const fs = require('fs');

async function captureView(width, height, outFile) {
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9445',
    '--user-data-dir=/tmp/chrome_verify_profile_' + width,
    `--window-size=${width},${height}`,
    'http://localhost/naigc/'
  ]);

  await new Promise(r => setTimeout(r, 3500));

  try {
    const listRes = await fetch('http://127.0.0.1:9445/json');
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

    // Wait until loading is done and pillars container is mounted
    for (let i = 0; i < 30; i++) {
      const res = await send('Runtime.evaluate', {
        expression: `(function() {
          const loader = document.getElementById('mq4-loader');
          const isLoaderHidden = !loader || loader.style.display === 'none' || loader.classList.contains('is-loaded') || !document.body.contains(loader);
          const pillars = document.getElementById('naigc-pillars');
          if (pillars) {
            pillars.scrollIntoView({ block: 'center', behavior: 'instant' });
          }
          return {
            loaderHidden: isLoaderHidden,
            pillarsMounted: !!pillars
          };
        })()`,
        returnByValue: true
      });
      if (res.result?.value?.loaderHidden && res.result?.value?.pillarsMounted) {
        break;
      }
      await new Promise(r => setTimeout(r, 1000));
    }

    await new Promise(r => setTimeout(r, 2000));

    const screenshot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(outFile, Buffer.from(screenshot.data, 'base64'));
    console.log('Saved screenshot to', outFile);
  } finally {
    chrome.kill();
  }
}

async function run() {
  console.log('Capturing Desktop View...');
  await captureView(1440, 900, '/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/pillars_unified_desktop.png');
  await new Promise(r => setTimeout(r, 1500));
  console.log('Capturing Mobile View...');
  await captureView(390, 844, '/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/pillars_unified_mobile.png');
  console.log('All captures complete!');
}

run();
