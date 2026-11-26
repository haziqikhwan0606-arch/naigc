with open('scratch/build_all_active_theory_pillars.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add CSS for .at-top-left-cluster and .at-back-home-pill
css_target = ".at-top-bar {\n      display: flex;\n      justify-content: space-between;\n      align-items: flex-start;\n      width: 100%;\n    }"
css_repl = """.at-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .at-top-left-cluster {
      display: flex;
      align-items: center;
      gap: 1.4rem;
    }

    .at-back-home-pill {
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

if css_target in content:
    content = content.replace(css_target, css_repl)
    print("Replaced CSS")
else:
    print("Warning: css_target not found")

# 2. Update Header HTML with .at-top-left-cluster and prominent BACK TO HOME pill
header_target = """    <!-- Top Bar Navigation -->
    <header class="at-top-bar">
      <a href="../index.html" class="at-logo-group" title="Return to NAIGC Core Hub">
        <div class="at-logo-brand">
          <img src="../build/assets/logo-XvVq9OjC.png" alt="NAIGC Logo" class="at-logo-img">
          <span class="at-logo-title">NAIGC</span>
        </div>
        <span class="at-logo-sub">3°09'N 101°42'E &bull; ${p.tag}</span>
      </a>

      <div>
        <nav class="at-menu-capsule">
          <a href="#${p.shortName.toLowerCase()}" class="at-menu-item is-active">${p.shortName}</a>
          <svg class="at-sine-glyph" viewBox="0 0 30 10">
            <path d="M1 5 Q 8 -2, 15 5 T 29 5" />
          </svg>
          <a href="../index.html" class="at-menu-item">CORE HUB</a>
        </nav>"""

header_repl = """    <!-- Top Bar Navigation with Prominent BACK TO HOME Button -->
    <header class="at-top-bar">
      <div class="at-top-left-cluster">
        <a href="../index.html" class="at-back-home-pill" title="Return to Homepage (Esc)">
          <span class="at-back-home-arrow">&larr;</span>
          <span class="at-back-home-text">BACK TO HOME</span>
        </a>
        <a href="../index.html" class="at-logo-group" title="Return to NAIGC Homepage">
          <div class="at-logo-brand">
            <img src="../build/assets/logo-XvVq9OjC.png" alt="NAIGC Logo" class="at-logo-img">
            <span class="at-logo-title">NAIGC</span>
          </div>
          <span class="at-logo-sub">3°09'N 101°42'E &bull; ${p.tag}</span>
        </a>
      </div>

      <div>
        <nav class="at-menu-capsule">
          <a href="#${p.shortName.toLowerCase()}" class="at-menu-item is-active">${p.shortName}</a>
          <svg class="at-sine-glyph" viewBox="0 0 30 10">
            <path d="M1 5 Q 8 -2, 15 5 T 29 5" />
          </svg>
          <a href="../index.html" class="at-menu-item">BACK TO HOME</a>
        </nav>"""

if header_target in content:
    content = content.replace(header_target, header_repl)
    print("Replaced Header HTML")
else:
    print("Warning: header_target not found")

# 3. Add Escape key navigation to home if modal not open
esc_target = """      } else if (e.key === 'Escape') {
        closeDrawer();
        closeLightbox();
        closeSearch();
      }"""

esc_repl = """      } else if (e.key === 'Escape') {
        const drawerOpen = document.getElementById('at-drawer').classList.contains('is-open');
        const lightboxOpen = document.getElementById('at-lightbox').classList.contains('is-open');
        const searchOpen = document.getElementById('at-search-modal').classList.contains('is-open');
        if (drawerOpen || lightboxOpen || searchOpen) {
          closeDrawer();
          closeLightbox();
          closeSearch();
        } else {
          const returnWing = isCurrentLeft ? 'left' : 'right';
          const sweepDir = isCurrentLeft ? 'left' : 'right';
          navigateWithDirection('../index.html?return=' + returnWing, sweepDir);
        }
      }"""

if esc_target in content:
    content = content.replace(esc_target, esc_repl)
    print("Replaced Escape key handler")
else:
    print("Warning: esc_target not found")

with open('scratch/build_all_active_theory_pillars.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Saved build_all_active_theory_pillars.js")

