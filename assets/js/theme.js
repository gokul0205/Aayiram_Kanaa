/**
 * Chirpy 2026 — Theme Toggle (Dark / Light Mode)
 * Reads/writes localStorage 'chirpy-theme'
 */
(function () {
    const STORAGE_KEY = 'chirpy-theme';
    const body = document.getElementById('body') || document.body;

    // Apply stored theme immediately to prevent flash
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light') {
        body.classList.add('light-mode');
    }

    function updateUI(isLight) {
        // Sidebar toggle
        const pill = document.getElementById('theme-toggle-pill');
        const text = document.getElementById('toggle-text');
        const icon = document.getElementById('toggle-icon');
        const topIcon = document.getElementById('topbar-toggle-icon');

        if (pill) {
            pill.classList.toggle('light-active', isLight);
            pill.setAttribute('aria-checked', String(isLight));
        }
        if (text) text.textContent = isLight ? 'Light' : 'Dark';
        if (icon) {
            icon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
        if (topIcon) {
            topIcon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
    }

    function toggleTheme() {
        const isLight = body.classList.toggle('light-mode');
        localStorage.setItem(STORAGE_KEY, isLight ? 'light' : 'dark');
        updateUI(isLight);
    }

    document.addEventListener('DOMContentLoaded', function () {
        const isLight = body.classList.contains('light-mode');
        updateUI(isLight);

        // Sidebar pill
        const pill = document.getElementById('theme-toggle-pill');
        if (pill) {
            pill.addEventListener('click', toggleTheme);
            pill.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTheme(); }
            });
        }

        // Mobile topbar button
        const topBtn = document.getElementById('topbar-theme-toggle');
        if (topBtn) {
            topBtn.addEventListener('click', toggleTheme);
        }

        // Mobile FAB search
        const fab = document.getElementById('search-fab');
        if (fab) {
            fab.addEventListener('click', function () {
                const input = document.getElementById('sidebar-search-input');
                if (input) { input.focus(); }
            });
        }
    });
})();
