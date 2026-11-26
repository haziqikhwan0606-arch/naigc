const { spawn } = require('child_process');
const fs = require('fs');

async function testZeroReloadStage() {
  const port = 9822;
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=/tmp/cdp_test_zeroreload_' + Date.now(),
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

    console.log('1. Loading Homepage...');
    await send('Page.navigate', { url: 'http://localhost/naigc/index.html' });

    // Wait for initial load
    for (let i = 0; i < 25; i++) {
      const check = await send('Runtime.evaluate', {
        expression: 'document.documentElement.scrollHeight > 2000',
        returnByValue: true
      });
      if (check.result.value) break;
      await new Promise(r => setTimeout(r, 300));
    }

    // Wait for pillars to mount in DOM
    console.log('2. Waiting for pillars to mount and scrolling to stage...');
    for (let i = 0; i < 30; i++) {
      const check = await send('Runtime.evaluate', {
        expression: `(() => {
          const p = document.querySelector('a[data-pillar="1"]');
          return { hasPillarLink: !!p, scrollHeight: document.documentElement.scrollHeight };
        })()`,
        returnByValue: true
      });
      if (check.result.value.hasPillarLink && check.result.value.scrollHeight > 2000) break;
      await new Promise(r => setTimeout(r, 400));
    }

    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 5120);' });
    await new Promise(r => setTimeout(r, 800));

    // Click Pillar 1 (Left Wing)
    console.log('3. Clicking Pillar 1 (Academy)...');
    await send('Runtime.evaluate', {
      expression: `(() => {
        const link = document.querySelector('a[data-pillar="1"]');
        if (link) link.click();
      })()`
    });

    // Wait for slider to open
    await new Promise(r => setTimeout(r, 800));
    const sliderCheck = await send('Runtime.evaluate', {
      expression: `(() => {
        const s = document.getElementById('naigc-pillar-slider');
        const f = document.getElementById('naigc-pillar-frame');
        return {
          isOpen: s ? s.classList.contains('is-open') : false,
          hasFrame: !!f,
          frameSrc: f ? f.src : null
        };
      })()`,
      returnByValue: true
    });
    console.log('Slider Status:', sliderCheck.result.value);

    // Wait for iframe content to be completely ready
    console.log('Waiting for iframe to load completely...');
    for (let i = 0; i < 20; i++) {
      const ready = await send('Runtime.evaluate', {
        expression: `(() => {
          const f = document.getElementById('naigc-pillar-frame');
          if (!f || !f.contentDocument) return false;
          return f.contentDocument.readyState === 'complete' && !!f.contentDocument.querySelector('.at-back-home-pill');
        })()`,
        returnByValue: true
      });
      if (ready.result.value) {
        console.log(`Iframe ready at ${i * 300}ms!`);
        break;
      }
      await new Promise(r => setTimeout(r, 300));
    }
    await new Promise(r => setTimeout(r, 500));

    // Click "BACK TO HOME" inside the iframe
    console.log('4. Clicking BACK TO HOME inside pillar iframe...');
    const clickBackRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const f = document.getElementById('naigc-pillar-frame');
        if (!f || !f.contentDocument) return { error: 'No iframe doc' };
        const btn = f.contentDocument.querySelector('.at-back-home-pill');
        if (!btn) return { error: 'No back button found in iframe' };
        btn.click();
        return { clicked: true };
      })()`,
      returnByValue: true
    });
    console.log('Click result:', clickBackRes.result.value);

    // Wait 500ms for slider to slide away
    await new Promise(r => setTimeout(r, 500));

    // Check homepage state
    const homeState = await send('Runtime.evaluate', {
      expression: `(() => {
        const s = document.getElementById('naigc-pillar-slider');
        const p = document.getElementById('naigc-pillars');
        const loader = document.getElementById('mq4-loader');
        return {
          sliderOpen: s ? s.classList.contains('is-open') : false,
          scrollY: window.scrollY,
          pillarsActive: p ? p.classList.contains('is-stage-active') : false,
          loaderVisible: loader ? (window.getComputedStyle(loader).display !== 'none' && window.getComputedStyle(loader).opacity !== '0') : false
        };
      })()`,
      returnByValue: true
    });
    console.log('5. Homepage State after returning:', homeState.result.value);

    // Capture screenshot
    const ss = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/instant_return_zero_loader.png', Buffer.from(ss.data, 'base64'));
    console.log('Saved instant_return_zero_loader.png');

    ws.close();
  } finally {
    chrome.kill();
  }
}

testZeroReloadStage();
