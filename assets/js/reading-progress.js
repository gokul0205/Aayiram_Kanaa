/**
 * Chirpy 2026 — Reading Progress Bar
 * Updates the fixed top progress bar and percentage label on scroll
 */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        const bar = document.getElementById('reading-progress-bar');
        const label = document.getElementById('reading-progress-label');
        if (!bar) return;

        function update() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight <= 0 ? 0 : Math.min(100, Math.round((scrollTop / docHeight) * 100));

            bar.style.width = pct + '%';
            bar.setAttribute('aria-valuenow', pct);
            if (label) label.textContent = pct + '%';
        }

        window.addEventListener('scroll', update, { passive: true });
        update();
    });
})();
