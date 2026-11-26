const { spawn } = require('child_process');
const fs = require('fs');

async function testClickBackHome() {
  const port = 9993;
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=/tmp/cdp_back_click_' + Date.now(),
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
    await send('Page.navigate', { url: 'http://localhost/naigc/pillars/academy.html' });

    // Wait 1.5s for page to settle
    await new Promise(r => setTimeout(r, 1500));

    // Check what element is at the position of the back button
    const inspectRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.querySelector('.at-back-home-pill');
        if (!btn) return { error: 'No .at-back-home-pill found' };
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const elAtPoint = document.elementFromPoint(centerX, centerY);
        return {
          rect: { left: rect.left, top: rect.top, width: rect.width, height: rect.height },
          centerX,
          centerY,
          elAtPointTag: elAtPoint ? elAtPoint.tagName : null,
          elAtPointClass: elAtPoint ? elAtPoint.className : null,
          elAtPointId: elAtPoint ? elAtPoint.id : null,
          isContainedInBtn: btn.contains(elAtPoint)
        };
      })()`,
      returnByValue: true
    });
    console.log('Inspection result:', inspectRes.result.value);

    // Take screenshot of pillar page with back button visible
    const ssPillar = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/academy_clickable_back_btn.png', Buffer.from(ssPillar.data, 'base64'));
    console.log('Saved academy_clickable_back_btn.png');

    // Click the button using DOM click or dispatching mouse click
    console.log('Dispatching click to .at-back-home-pill...');
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.querySelector('.at-back-home-pill');
        btn.click();
      })()`
    });

    // Wait 800ms for transition animation and page navigation to complete
    await new Promise(r => setTimeout(r, 1000));

    // Get current URL
    const urlRes = await send('Runtime.evaluate', {
      expression: 'window.location.href',
      returnByValue: true
    });
    console.log('Navigated URL after click:', urlRes.result.value);

    // Capture homepage view
    const ssHome = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/returned_to_homepage_after_click.png', Buffer.from(ssHome.data, 'base64'));
    console.log('Saved returned_to_homepage_after_click.png');

    ws.close();
  } catch (err) {
    console.error('Error in test:', err);
  } finally {
    chrome.kill();
  }
}

testClickBackHome();

