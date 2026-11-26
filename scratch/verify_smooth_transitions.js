const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`[${msg.type()}] ${msg.text()}`);
    }
  });
  page.on('pageerror', err => {
    errors.push(`[PAGE ERROR] ${err.message}`);
  });

  console.log('--- 1. Testing Homepage (index.html) ---');
  await page.goto('http://localhost/naigc/index.html', { waitUntil: 'networkidle2' });
  console.log('Homepage loaded. Current errors:', errors);

  console.log('--- 2. Clicking Pillar 01 (Left Wing) ---');
  await page.click('a[data-pillar="1"]');
  await new Promise(r => setTimeout(r, 600));

  console.log('Navigated to:', page.url());
  const p1Classes = await page.evaluate(() => {
    const track = document.getElementById('at-track');
    const firstCard = document.querySelector('.at-card');
    const firstInner = document.querySelector('.at-card-inner');
    return {
      trackClass: track ? track.className : null,
      cardClass: firstCard ? firstCard.className : null,
      innerAnimDelay: firstInner ? firstInner.style.animationDelay : null,
      hasLoader: !!document.getElementById('at-loader'),
      hasCurtain: !!document.getElementById('at-transition-curtain')
    };
  });
  console.log('Pillar 01 State:', p1Classes);
  await page.screenshot({ path: '/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/p1_smooth_left_entrance.png' });

  console.log('--- 3. Returning to Core Hub ---');
  await page.click('a[href*="index.html"]');
  await new Promise(r => setTimeout(r, 600));
  console.log('Returned to:', page.url());

  console.log('--- 4. Clicking Pillar 08 (Right Wing) ---');
  await page.click('a[data-pillar="8"]');
  await new Promise(r => setTimeout(r, 600));
  console.log('Navigated to:', page.url());

  const p8Classes = await page.evaluate(() => {
    const track = document.getElementById('at-track');
    const firstCard = document.querySelector('.at-card');
    const firstInner = document.querySelector('.at-card-inner');
    return {
      trackClass: track ? track.className : null,
      cardClass: firstCard ? firstCard.className : null,
      innerAnimDelay: firstInner ? firstInner.style.animationDelay : null,
      hasLoader: !!document.getElementById('at-loader'),
      hasCurtain: !!document.getElementById('at-transition-curtain')
    };
  });
  console.log('Pillar 08 State:', p8Classes);
  await page.screenshot({ path: '/Users/haziq0606/.gemini/antigravity/brain/124e1036-483a-4446-88df-1d5bd3e496cd/p8_smooth_right_entrance.png' });

  console.log('--- ALL CONSOLE ERRORS ---');
  console.log(errors.length === 0 ? 'ZERO CONSOLE ERRORS! PERFECT!' : errors);

  await browser.close();
})();

