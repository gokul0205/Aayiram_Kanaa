/**
 * Aayiram Kanaa — Theme Switcher (Dark / Light / Cyan-Gold)
 * Supports: sidebar dot-picker, topbar cycle button, localStorage persistence
 */
(function () {
    const STORAGE_KEY = 'chirpy-theme';
    const THEMES = ['dark', 'light', 'cyan-gold'];
    const CLASS_MAP = {
        dark: '',            // no extra class (default)
        light: 'light-mode',
        'cyan-gold': 'cyan-gold-mode'
    };
    const body = document.getElementById('body') || document.body;

    // --- Apply stored theme immediately (prevents flash) ---
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && CLASS_MAP[stored]) {
        body.classList.add(CLASS_MAP[stored]);
    }

    // --- Core: set theme ---
    function setTheme(theme) {
        // Remove all theme classes
        Object.values(CLASS_MAP).forEach(cls => {
            if (cls) body.classList.remove(cls);
        });
        // Add new theme class
        if (CLASS_MAP[theme]) {
            body.classList.add(CLASS_MAP[theme]);
        }
        // Toggle glass background image (only visible in cyan-gold)
        const glassBg = document.getElementById('glass-bg-image');
        if (glassBg) {
            glassBg.style.display = (theme === 'cyan-gold') ? 'block' : 'none';
        }
        localStorage.setItem(STORAGE_KEY, theme);
        updateUI(theme);
    }

    // --- Update all UI indicators ---
    function updateUI(theme) {
        // Sidebar dots
        document.querySelectorAll('.theme-dot').forEach(dot => {
            dot.classList.toggle('active', dot.dataset.theme === theme);
        });

        // Topbar icon — show theme-appropriate icon
        const topIcon = document.getElementById('topbar-theme-icon');
        if (topIcon) {
            if (theme === 'dark') topIcon.className = 'fa-solid fa-moon';
            else if (theme === 'light') topIcon.className = 'fa-solid fa-sun';
            else topIcon.className = 'fa-solid fa-star'; // gold star for cyan-gold
        }
    }

    // --- Cycle to next theme ---
    function cycleTheme() {
        const current = localStorage.getItem(STORAGE_KEY) || 'dark';
        const idx = THEMES.indexOf(current);
        const next = THEMES[(idx + 1) % THEMES.length];
        setTheme(next);
    }

    // --- DOM ready ---
    document.addEventListener('DOMContentLoaded', function () {
        const current = localStorage.getItem(STORAGE_KEY) || 'dark';
        updateUI(current);

        // Sidebar dot clicks
        document.querySelectorAll('.theme-dot').forEach(dot => {
            dot.addEventListener('click', function () {
                setTheme(this.dataset.theme);
            });
        });

        // Mobile topbar cycle button
        const cycleBtn = document.getElementById('topbar-theme-cycle');
        if (cycleBtn) {
            cycleBtn.addEventListener('click', cycleTheme);
        }
    });
})();
