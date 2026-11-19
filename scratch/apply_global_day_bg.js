const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Ensure daytime background is applied globally to stage, story, and body
const dayBgStyle = `
/* Malaysian Skyline Daytime Background */
body.mq4-body,
.mq4-stage,
.mq4-story {
  background: 
    linear-gradient(180deg, rgba(14, 45, 90, 0.12) 0%, rgba(12, 38, 80, 0.04) 35%, rgba(8, 24, 56, 0.20) 75%, rgba(4, 14, 38, 0.60) 100%),
    url('./build/assets/kl_skyline_day.jpg') no-repeat center center / cover !important;
}
`;

// Replace existing .mq4-stage blocks
html = html.replace(/\.mq4-stage\s*\{[\s\S]*?url\('\.\/build\/assets\/kl_skyline_day\.jpg'\)[^;]*;[\s\S]*?\}/g, dayBgStyle.trim());

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Applied global daytime background to stage and body');
