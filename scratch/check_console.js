const { spawn } = require('child_process');

async function checkConsole() {
  const port = 9993;
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=/tmp/cdp_acad_' + Date.now(),
    '--window-size=1440,900'
  ]);

  await new Promise(r => setTimeout(r, 2000));

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

    ws.addEventListener('message', evt => {
      const msg = JSON.parse(evt.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        console.log('Console:', msg.params.type, msg.params.args);
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        console.log('Exception:', msg.params.exceptionDetails);
      }
    });

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Page.navigate', { url: 'http://localhost/naigc/pillars/academy.html' });

    // Wait 3.5 seconds
    await new Promise(r => setTimeout(r, 3500));
    
    const evalRes = await send('Runtime.evaluate', {
      expression: `({
        isLoadedClass: document.getElementById('at-loader').classList.contains('is-loaded'),
        loaderOpacity: getComputedStyle(document.getElementById('at-loader')).opacity,
        cardsCount: document.querySelectorAll('.at-card').length
      })`,
      returnByValue: true
    });
    console.log('Eval result:', evalRes.result.value);

    ws.close();
  } catch(e) {
    console.error(e);
  } finally {
    chrome.kill();
  }
}

checkConsole();

