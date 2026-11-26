const fs = require('fs');
let lines = fs.readFileSync('scratch/build_all_active_theory_pillars.js', 'utf-8').split('\n');
console.log('Target line 2732 was:', lines[2732]);
console.log('Target line 2752 was:', lines[2752]);
lines[2732] = '        <div class="at-card-inner" style="animation-delay: ${(0.04 + i * 0.07).toFixed(2)}s">\n        <div>';
lines[2752] = '        </div>\n        </div>';
fs.writeFileSync('scratch/build_all_active_theory_pillars.js', lines.join('\n'), 'utf-8');
console.log('Successfully wrapped at-card-inner');

