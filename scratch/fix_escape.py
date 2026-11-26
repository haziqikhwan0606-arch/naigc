with open('scratch/build_all_active_theory_pillars.js', 'r', encoding='utf-8') as f:
    content = f.read()

target = '<div class="at-card-inner" style="animation-delay: ${(0.04 + i * 0.07).toFixed(2)}s">'
repl = '<div class="at-card-inner" style="animation-delay: \\${(0.04 + i * 0.07).toFixed(2)}s">'

if target in content:
    content = content.replace(target, repl)
    with open('scratch/build_all_active_theory_pillars.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print('Successfully escaped with python file')
else:
    print('Target not found')

