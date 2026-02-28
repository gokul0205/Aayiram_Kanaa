/**
 * Chirpy 2026 — Table of Contents Generator
 * Builds TOC from h2/h3 in #post-body, highlights active heading on scroll
 * Collapse/expand on toggle button
 */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        const postBody = document.getElementById('post-body');
        const tocList = document.getElementById('toc-list');
        const toggleBtn = document.getElementById('toc-toggle');
        const toggleIcon = document.getElementById('toc-toggle-icon');

        if (!postBody || !tocList) return;

        // --- Build TOC ---
        const headings = postBody.querySelectorAll('h2, h3');
        if (headings.length === 0) {
            const tocPanel = document.getElementById('toc-panel');
            if (tocPanel) tocPanel.style.display = 'none';
            return;
        }

        headings.forEach(function (h, i) {
            // Ensure each heading has an id
            if (!h.id) {
                h.id = 'heading-' + i + '-' + h.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
            }

            const li = document.createElement('li');
            li.className = h.tagName === 'H3' ? 'toc-h3' : 'toc-h2';

            const a = document.createElement('a');
            a.href = '#' + h.id;
            a.textContent = h.textContent;
            a.addEventListener('click', function (e) {
                e.preventDefault();
                h.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });

            li.appendChild(a);
            tocList.appendChild(li);
        });

        // --- Active heading highlight on scroll ---
        const tocLinks = tocList.querySelectorAll('a');
        let ticking = false;

        function highlightActive() {
            const scrollY = window.scrollY + 120; // offset for progress bar

            let activeIdx = 0;
            headings.forEach(function (h, i) {
                if (h.offsetTop <= scrollY) activeIdx = i;
            });

            tocLinks.forEach(function (a, i) {
                a.classList.toggle('active', i === activeIdx);
            });

            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                requestAnimationFrame(highlightActive);
                ticking = true;
            }
        }, { passive: true });

        highlightActive();

        // --- Collapse / Expand ---
        let collapsed = false;
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function () {
                collapsed = !collapsed;
                tocList.classList.toggle('collapsed', collapsed);
                if (toggleIcon) {
                    toggleIcon.className = collapsed ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-up';
                }
            });
        }

        // Auto-collapse on mobile
        if (window.innerWidth <= 768) {
            collapsed = true;
            tocList.classList.add('collapsed');
            if (toggleIcon) toggleIcon.className = 'fa-solid fa-chevron-down';
        }
    });
})();
