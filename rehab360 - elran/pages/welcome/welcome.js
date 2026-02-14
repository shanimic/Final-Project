// Welcome page script
// Small student-style note: We keep navigation simple (Patient uses a normal link).

(function () {
  const uiOnlyBtn = document.querySelector('[data-tooltip="Physiotherapist UI is not part of this task"]');
  if (!uiOnlyBtn) return;

  uiOnlyBtn.addEventListener('click', function () {
    // In a real system, this would go to the physiotherapist flow.
    // For this assignment, we only show a friendly message.
    window.dispatchEvent(new CustomEvent('rehab360:toast', {
      detail: { message: 'Physiotherapist Home (patient list) is not implemented yet.' }
    }));
  });
})();
