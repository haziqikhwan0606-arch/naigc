const { spawn } = require('child_process');
const fs = require('fs');

async function testBrowserBack() {
  const port = 9998;
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=/tmp/cdp_bb_final_' + Date.now(),
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
      return new Promise((resolve) => {
        const msgId = id++;
        const handler = (evt) => {
          const data = JSON.parse(evt.data);
          if (data.id === msgId) {
            ws.removeEventListener('message', handler);
            resolve(data.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await send('Page.enable');
    await send('Runtime.enable');

    console.log('1. Loading index.html...');
    await send('Page.navigate', { url: 'http://localhost/naigc/index.html' });

    // Wait until pillars are in the DOM
    console.log('Waiting for pillars to be in DOM...');
    for (let i = 0; i < 30; i++) {
      const chk = await send('Runtime.evaluate', {
        expression: '!!document.querySelector("a[data-pillar=\\"1\\"]")',
        returnByValue: true
      });
      if (chk.result.value) {
        console.log(`Pillars ready after ${(i + 1) * 300}ms`);
        break;
      }
      await new Promise(r => setTimeout(r, 300));
    }

    console.log('2. Scrolling to stage 5120...');
    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 5120)' });
    await new Promise(r => setTimeout(r, 800));

    console.log('3. Clicking Academy pillar link...');
    const clickInfo = await send('Runtime.evaluate', {
      expression: `(() => {
        const link = document.querySelector('a[data-pillar="1"]');
        if (!link) return { error: 'NO_LINK' };
        link.click();
        return {
          clicked: true,
          flag: sessionStorage.getItem('naigc_return_to_stage'),
          scroll: sessionStorage.getItem('naigc_stage_scroll')
        };
      })()`,
      returnByValue: true
    });
    console.log('Click result:', clickInfo.result.value);

    // Wait for navigation to complete
    await new Promise(r => setTimeout(r, 1200));

    const pillarUrl = await send('Runtime.evaluate', { expression: 'window.location.href' });
    console.log('Pillar page URL:', pillarUrl.result.value);

    // Verify top bar on clean pillar page
    const topBarCheck = await send('Runtime.evaluate', {
      expression: `(() => {
        const backPill = document.querySelector('.at-back-home-pill');
        const dockHome = document.querySelector('.at-dock-home-node');
        const logo = document.querySelector('.at-logo-brand');
        const dockNodes = document.querySelectorAll('.at-dock-node');
        return {
          hasBackPill: !!backPill,
          hasDockHome: !!dockHome,
          hasLogo: !!logo,
          dockNodesCount: dockNodes.length
        };
      })()`,
      returnByValue: true
    });
    console.log('Clean pillar page UI check:', topBarCheck.result.value);

    const shot1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/pillar_academy_clean.png', Buffer.from(shot1.data, 'base64'));
    console.log('Saved pillar_academy_clean.png');

    console.log('4. Pressing browser BACK button (window.history.back())...');
    await send('Runtime.evaluate', { expression: 'window.history.back()' });
    await new Promise(r => setTimeout(r, 1500));

    const returnUrl = await send('Runtime.evaluate', { expression: 'window.location.href' });
    console.log('Return URL:', returnUrl.result.value);

    const stageCheck = await send('Runtime.evaluate', {
      expression: `(() => {
        const pillars = document.getElementById('naigc-pillars');
        const loader = document.getElementById('mq4-loader');
        return {
          scrollY: window.scrollY,
          isStageActive: pillars ? pillars.classList.contains('is-stage-active') : false,
          loaderHidden: loader ? (window.getComputedStyle(loader).display === 'none' || window.getComputedStyle(loader).opacity === '0') : true
        };
      })()`,
      returnByValue: true
    });
    console.log('Homepage stage on back:', stageCheck.result.value);

    const shot2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/browser_back_to_stage_verified.png', Buffer.from(shot2.data, 'base64'));
    console.log('Saved browser_back_to_stage_verified.png');

    ws.close();
  } finally {
    chrome.kill();
  }
}
testBrowserBack().catch(console.error);
