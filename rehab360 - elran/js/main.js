// Global JS (shared)
// Demo links: prevent navigation for href="#".
// Tooltips are handled by CSS on hover via data-tip / data-tooltip.

document.addEventListener('click', function (e) {
  const el = e.target.closest('[data-tip], [data-tooltip]');
  if (!el) return;

  if (el.tagName === 'A' && el.getAttribute('href') === '#') {
    e.preventDefault();
  }
});
