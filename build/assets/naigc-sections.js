/**
 * NAIGC Futuristic Navigation Dispatcher
 * Directly connects menu items and links to the dedicated experiential pages (about.html, pillars/*.html)
 */

(function () {
  'use strict';
  // Sync Theme preference from localStorage across all NAIGC pages
  try {
    const savedTheme = localStorage.getItem('naigc_theme');
    if (savedTheme === 'bright') {
      document.documentElement.classList.add('at-bright-mode');
      if (document.body) document.body.classList.add('at-bright-mode');
    }
  } catch (e) {}


  // Global Navigation Hook for 3D Menu
  window.openAboutUs = function () {
    window.location.href = './about.html';
  };

  window.naigcNavigate = function (targetId) {
    if (targetId === 'games' || targetId === 'about') {
      window.location.href = './about.html';
      return true; // handled completely by navigating to dedicated experiential page
    } else if (targetId === 'start') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return false; // let 3D engine return to start
    } else if (targetId === 'opties') {
      window.scrollTo({ top: 4350, behavior: 'smooth' });
      return true; // handled by jumping to 8 pillars
    } else {
      return false;
    }
  };

  // Delegated click listener for any link pointing to about or games
  document.addEventListener('click', function (e) {
    const target = e.target.closest('a, button');
    if (!target) return;
    const href = target.getAttribute('href');
    const text = (target.textContent || '').trim().toLowerCase();
    if (href === '#about' || href === '#games' || text === 'about us') {
      e.preventDefault();
      window.location.href = './about.html';
    }
  });

  // Auto-Open Menu Overlay when requested via #menu or sessionStorage
  function checkAndOpenMenu() {
    const shouldOpen = window.location.hash === '#menu' ||
                       window.location.search.indexOf('menu=1') !== -1 ||
                       sessionStorage.getItem('naigc_open_menu') === '1';
    if (!shouldOpen) return false;

    // If native Vue method is ready
    if (typeof window.openNaigcMenu === 'function') {
      sessionStorage.removeItem('naigc_open_menu');
      window.openNaigcMenu();
      return true;
    }

    // Secondary DOM fallback: click the menu burger toggle
    const toggle = document.querySelector('.mq4-menu__toggle:not(.is-open)');
    if (toggle) {
      sessionStorage.removeItem('naigc_open_menu');
      toggle.click();
      return true;
    }
    return false;
  }

  // Hook into lifecycle events
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndOpenMenu);
  } else {
    checkAndOpenMenu();
  }
  window.addEventListener('load', checkAndOpenMenu);
  window.addEventListener('hashchange', function () {
    if (window.location.hash === '#menu') checkAndOpenMenu();
  });

  // Watch for dynamic mounting of .mq4-menu__toggle
  let tries = 0;
  const menuObserverTimer = setInterval(function () {
    tries++;
    if (checkAndOpenMenu() || tries > 40) {
      clearInterval(menuObserverTimer);
    }
  }, 100);

  // --- Mount Core Hub Theme Switcher for index.html ---
  function mountCoreHubThemeToggle() {
    if (document.getElementById('at-theme-toggle')) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'at-theme-toggle-btn naigc-corehub-theme-btn';
    btn.id = 'at-theme-toggle';
    btn.setAttribute('aria-label', 'Toggle Bright / Dark Mode');
    btn.setAttribute('title', 'Switch Theme');
    btn.innerHTML = '<span class="at-theme-indicator"><span class="at-theme-icon-sun">☀</span><span class="at-theme-icon-moon">☾</span></span><span class="at-theme-mode-text" id="at-theme-label">BRIGHT MODE</span>';

    document.body.appendChild(btn);

    function applyCoreTheme(theme) {
      const isBright = (theme === 'bright');
      if (isBright) {
        document.documentElement.classList.add('at-bright-mode');
        document.body.classList.add('at-bright-mode');
      } else {
        document.documentElement.classList.remove('at-bright-mode');
        document.body.classList.remove('at-bright-mode');
      }
      const label = document.getElementById('at-theme-label');
      if (label) label.textContent = isBright ? 'DARK MODE' : 'BRIGHT MODE';
      btn.setAttribute('title', isBright ? 'Switch to Dark Mode' : 'Switch to Bright Mode');
      btn.setAttribute('aria-label', isBright ? 'Switch to Dark Mode' : 'Switch to Bright Mode');
      try { localStorage.setItem('naigc_theme', theme); } catch (e) {}
    }

    let saved = 'dark';
    try { saved = localStorage.getItem('naigc_theme') || 'dark'; } catch (e) {}
    applyCoreTheme(saved);

    btn.addEventListener('click', function() {
      const next = document.body.classList.contains('at-bright-mode') ? 'dark' : 'bright';
      applyCoreTheme(next);
    });
  }

  // Hook into lifecycle for Core Hub
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountCoreHubThemeToggle);
  } else {
    mountCoreHubThemeToggle();
  }

})();
