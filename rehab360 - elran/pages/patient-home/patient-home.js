// Patient Home script
// Student-style: tiny enhancements (date + mock pain label based on last bar).

(function () {
  const dateEl = document.getElementById('todayDate');
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  }

  // Read the last pain bar height and set a simple label.
  const bars = Array.from(document.querySelectorAll('.spark__bar'));
  if (bars.length) {
    const last = bars[bars.length - 1];
    const heightStr = (last.style.height || '0%').replace('%', '');
    const value = Number(heightStr);

    const labelEl = document.getElementById('painLabel');
    const noteEl = document.getElementById('painNote');

    if (labelEl && noteEl) {
      if (value >= 65) {
        labelEl.textContent = 'High';
        noteEl.textContent = 'Higher pain today — consider a lighter pace.';
      } else if (value >= 45) {
        labelEl.textContent = 'Moderate';
        noteEl.textContent = 'Stable trend — monitor after exercises.';
      } else {
        labelEl.textContent = 'Low';
        noteEl.textContent = 'Lower pain — keep consistent form.';
      }
    }
  }
})();
