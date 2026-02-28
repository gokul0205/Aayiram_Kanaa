/**
 * Chirpy 2026 — Code Copy Button
 * Injects a "Copy" button into every <pre><code> block on post pages.
 * Works in both dark and light mode.
 */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        // Target all pre elements inside the post body
        var blocks = document.querySelectorAll('.post-body pre, .post-content pre');

        blocks.forEach(function (pre) {
            // Don't add a second button if already present
            if (pre.querySelector('.copy-code-btn')) return;

            // Create button
            var btn = document.createElement('button');
            btn.className = 'copy-code-btn';
            btn.setAttribute('aria-label', 'Copy code');
            btn.title = 'Copy code';
            btn.innerHTML =
                '<i class="fa-regular fa-copy"></i>' +
                '<span class="copy-label">Copy</span>';

            // Style the button
            btn.style.cssText = [
                'position:absolute',
                'top:0.55rem',
                'right:0.55rem',
                'display:flex',
                'align-items:center',
                'gap:0.3rem',
                'padding:0.25rem 0.65rem',
                'font-size:0.7rem',
                'font-family:inherit',
                'font-weight:500',
                'color:rgba(0,212,200,0.8)',
                'background:rgba(0,212,200,0.07)',
                'border:1px solid rgba(0,212,200,0.18)',
                'border-radius:6px',
                'cursor:pointer',
                'transition:all 0.15s',
                'z-index:2',
                'backdrop-filter:blur(4px)',
                'line-height:1',
            ].join(';');

            // Hover effect
            btn.addEventListener('mouseenter', function () {
                this.style.background = 'rgba(0,212,200,0.15)';
                this.style.borderColor = 'rgba(0,212,200,0.4)';
                this.style.color = '#00d4c8';
            });
            btn.addEventListener('mouseleave', function () {
                if (!this.classList.contains('copied')) {
                    this.style.background = 'rgba(0,212,200,0.07)';
                    this.style.borderColor = 'rgba(0,212,200,0.18)';
                    this.style.color = 'rgba(0,212,200,0.8)';
                }
            });

            // Click to copy
            btn.addEventListener('click', function () {
                var code = pre.querySelector('code');
                var text = code ? code.innerText : pre.innerText;

                navigator.clipboard.writeText(text).then(function () {
                    btn.classList.add('copied');
                    btn.innerHTML =
                        '<i class="fa-solid fa-check"></i>' +
                        '<span class="copy-label">Copied!</span>';
                    btn.style.background = 'rgba(0,212,200,0.18)';
                    btn.style.borderColor = 'rgba(0,212,200,0.5)';
                    btn.style.color = '#00d4c8';

                    setTimeout(function () {
                        btn.classList.remove('copied');
                        btn.innerHTML =
                            '<i class="fa-regular fa-copy"></i>' +
                            '<span class="copy-label">Copy</span>';
                        btn.style.background = 'rgba(0,212,200,0.07)';
                        btn.style.borderColor = 'rgba(0,212,200,0.18)';
                        btn.style.color = 'rgba(0,212,200,0.8)';
                    }, 2000);
                }).catch(function () {
                    // Fallback for older browsers
                    var ta = document.createElement('textarea');
                    ta.value = text;
                    ta.style.position = 'fixed';
                    ta.style.opacity = '0';
                    document.body.appendChild(ta);
                    ta.select();
                    document.execCommand('copy');
                    document.body.removeChild(ta);
                    btn.innerHTML = '<i class="fa-solid fa-check"></i><span class="copy-label">Copied!</span>';
                    setTimeout(function () {
                        btn.innerHTML = '<i class="fa-regular fa-copy"></i><span class="copy-label">Copy</span>';
                    }, 2000);
                });
            });

            // Make pre relative so button can be absolute-positioned inside
            if (getComputedStyle(pre).position === 'static') {
                pre.style.position = 'relative';
            }

            pre.appendChild(btn);
        });
    });
})();
