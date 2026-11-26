const { spawn } = require('child_process');
const fs = require('fs');

async function testHomeButton() {
  const port = 9997;
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=/tmp/cdp_home_btn_' + Date.now(),
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
    for (let i = 0; i < 30; i++) {
      const chk = await send('Runtime.evaluate', {
        expression: '!!document.querySelector("a[data-pillar=\\"1\\"]")',
        returnByValue: true
      });
      if (chk.result.value) break;
      await new Promise(r => setTimeout(r, 300));
    }

    console.log('2. Scrolling to stage 5120...');
    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 5120)' });
    await new Promise(r => setTimeout(r, 800));

    console.log('3. Clicking Academy pillar link...');
    await send('Runtime.evaluate', {
      expression: `(() => {
        const link = document.querySelector('a[data-pillar="1"]');
        link.click();
      })()`
    });

    // Wait for navigation to academy.html
    await new Promise(r => setTimeout(r, 1500));

    const pillarUrl = await send('Runtime.evaluate', { expression: 'window.location.href' });
    console.log('Current URL on pillar:', pillarUrl.result.value);

    // Verify presence of buttons
    const buttonsCheck = await send('Runtime.evaluate', {
      expression: `(() => {
        const btnBackHome = document.getElementById('at-btn-back-home');
        const btnCoreHub = document.getElementById('at-btn-core-hub');
        const dockHomeBtn = document.getElementById('at-dock-home-btn');
        return {
          hasBackHomeBtn: !!btnBackHome,
          backHomeText: btnBackHome ? btnBackHome.innerText.trim() : null,
          hasCoreHubBtn: !!btnCoreHub,
          hasDockHomeBtn: !!dockHomeBtn
        };
      })()`,
      returnByValue: true
    });
    console.log('Buttons check:', buttonsCheck.result.value);

    const shotPillar = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/pillar_page_with_home_button.png', Buffer.from(shotPillar.data, 'base64'));
    console.log('Saved pillar_page_with_home_button.png');

    console.log('4. Clicking in-page #at-btn-back-home button...');
    const clickBackResult = await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.getElementById('at-btn-back-home');
        if (!btn) return { error: 'NO_BTN' };
        btn.click();
        return { clicked: true };
      })()`,
      returnByValue: true
    });
    console.log('Click on Home button:', clickBackResult.result.value);

    // Wait for history navigation
    await new Promise(r => setTimeout(r, 1500));

    const finalUrl = await send('Runtime.evaluate', { expression: 'window.location.href' });
    console.log('Final URL after clicking Home button:', finalUrl.result.value);

    const finalStageCheck = await send('Runtime.evaluate', {
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
    console.log('Homepage stage status after clicking Home button:', finalStageCheck.result.value);

    const shotStage = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/stage_after_clicking_inpage_home_btn.png', Buffer.from(shotStage.data, 'base64'));
    console.log('Saved stage_after_clicking_inpage_home_btn.png');

    ws.close();
  } finally {
    chrome.kill();
  }
}

testHomeButton().catch(console.error);
