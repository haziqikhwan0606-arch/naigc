with open('scratch/build_all_active_theory_pillars.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace .at-back-home-pill CSS with super-prominent, eye-catching glowing design
old_css_pill = """    .at-back-home-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.65rem;
      background: rgba(3, 10, 24, 0.88);
      border: 1.5px solid rgba(0, 240, 255, 0.5);
      color: #00F0FF;
      padding: 0.55rem 1.25rem;
      border-radius: 30px;
      font-family: var(--at-font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6), 0 0 16px rgba(0, 240, 255, 0.25);
    }

    .at-back-home-pill:hover {
      background: rgba(0, 240, 255, 0.22);
      border-color: #00F0FF;
      color: #FFFFFF;
      transform: translateX(-4px);
      box-shadow: 0 4px 25px rgba(0, 240, 255, 0.5);
    }

    .at-back-home-arrow {
      font-size: 1.05rem;
      line-height: 1;
      transition: transform 0.2s ease;
    }

    .at-back-home-pill:hover .at-back-home-arrow {
      transform: translateX(-3px);
    }"""

new_css_pill = """    .at-back-home-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      background: linear-gradient(135deg, rgba(0, 240, 255, 0.25) 0%, rgba(3, 14, 34, 0.95) 100%);
      border: 2px solid #00F0FF;
      color: #FFFFFF;
      padding: 0.75rem 1.6rem;
      border-radius: 40px;
      font-family: var(--at-font-mono);
      font-size: 0.85rem;
      font-weight: 800;
      letter-spacing: 0.16em;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 0 25px rgba(0, 240, 255, 0.55), inset 0 0 15px rgba(0, 240, 255, 0.2);
      animation: atHomePulse 2.5s infinite alternate ease-in-out;
    }

    @keyframes atHomePulse {
      0% { box-shadow: 0 0 18px rgba(0, 240, 255, 0.4), inset 0 0 10px rgba(0, 240, 255, 0.15); border-color: rgba(0, 240, 255, 0.6); }
      100% { box-shadow: 0 0 35px rgba(0, 240, 255, 0.85), inset 0 0 20px rgba(0, 240, 255, 0.3); border-color: #00F0FF; }
    }

    .at-back-home-pill:hover {
      background: #00F0FF;
      color: #010408;
      transform: translateX(-5px) scale(1.04);
      box-shadow: 0 0 45px rgba(0, 240, 255, 0.95);
    }

    .at-back-home-arrow {
      font-size: 1.25rem;
      font-weight: 900;
      line-height: 1;
      transition: transform 0.2s ease;
    }

    .at-back-home-pill:hover .at-back-home-arrow {
      transform: translateX(-4px);
    }

    .at-back-home-text {
      text-shadow: 0 0 10px rgba(0, 240, 255, 0.8);
    }

    .at-back-home-pill:hover .at-back-home-text {
      text-shadow: none;
      color: #010408;
    }"""

if old_css_pill in content:
    content = content.replace(old_css_pill, new_css_pill)
    print("Replaced .at-back-home-pill CSS")
else:
    print("Warning: old_css_pill not found")

# 2. Add styles for .at-dock-home-node and .at-dock-divider
dock_css_target = ".at-pillar-dock {\n      display: flex;\n      align-items: center;\n      gap: 0.65rem;"
dock_css_repl = """.at-dock-home-node {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.4rem 0.95rem;
      border-radius: 20px;
      background: rgba(0, 240, 255, 0.16);
      border: 1.5px solid #00F0FF;
      color: #FFFFFF;
      font-family: var(--at-font-mono);
      font-size: 0.68rem;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-decoration: none;
      transition: all 0.25s ease;
      box-shadow: 0 0 15px rgba(0, 240, 255, 0.4);
    }

    .at-dock-home-node:hover {
      background: #00F0FF;
      color: #010408;
      box-shadow: 0 0 25px #00F0FF;
      transform: translateY(-2px);
    }

    .at-dock-home-icon {
      width: 13px;
      height: 13px;
      stroke: currentColor;
    }

    .at-dock-divider {
      width: 1px;
      height: 20px;
      background: rgba(0, 240, 255, 0.3);
      margin: 0 0.25rem;
    }

    .at-pillar-dock {
      display: flex;
      align-items: center;
      gap: 0.65rem;"""

if dock_css_target in content:
    content = content.replace(dock_css_target, dock_css_repl)
    print("Inserted dock home node CSS")
else:
    print("Warning: dock_css_target not found")

# 3. Add home button into the dock HTML markup
old_dock_html = """      <!-- Floating Pillar Mini-Dock (01 to 08) -->
      <nav class="at-pillar-dock" aria-label="Ecosystem Pillar Dock">
        ${allPillarsList.map(item => `
        <a href="${item.slug}" class="at-dock-node ${item.num === p.num ? 'is-current' : ''}" data-tooltip="${item.num}. ${item.name}">
          ${item.num}
        </a>
        `).join('')}
      </nav>"""

new_dock_html = """      <!-- Floating Pillar Mini-Dock (01 to 08 with Home Shortcut) -->
      <nav class="at-pillar-dock" aria-label="Ecosystem Pillar Dock">
        <a href="../index.html" class="at-dock-home-node" data-tooltip="Return to Homepage Hub">
          <svg class="at-dock-home-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>HOME</span>
        </a>
        <span class="at-dock-divider"></span>
        ${allPillarsList.map(item => `
        <a href="${item.slug}" class="at-dock-node ${item.num === p.num ? 'is-current' : ''}" data-tooltip="${item.num}. ${item.name}">
          ${item.num}
        </a>
        `).join('')}
      </nav>"""

if old_dock_html in content:
    content = content.replace(old_dock_html, new_dock_html)
    print("Updated Dock HTML with HOME button")
else:
    print("Warning: old_dock_html not found")

with open('scratch/build_all_active_theory_pillars.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Saved build_all_active_theory_pillars.js")

