
(function () {
  const NEXT_EXERCISE = {
    id: 1,
    name: 'Band External Rotation',
    sets: 3,
    reps: '15',
    video: 'https://www.youtube.com/watch?v=4tpl-huz060'
  };

  const dateEl = document.getElementById('todayDate');
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  }

  const titleEl = document.getElementById('nextExerciseTitle');
  const metaEl = document.getElementById('nextExerciseMeta');
  if (titleEl) titleEl.textContent = NEXT_EXERCISE.name;
  if (metaEl) metaEl.textContent = `${NEXT_EXERCISE.sets} sets × ${NEXT_EXERCISE.reps} reps · Shoulder external rotation with resistance band`;

  const startBtn = document.getElementById('startNextExercise');
  if (startBtn) {
    startBtn.addEventListener('click', function (e) {
      e.preventDefault();
      try {
        sessionStorage.setItem('selectedExercise', JSON.stringify(NEXT_EXERCISE));
      } catch (err) {
      }
      window.location.href = startBtn.getAttribute('href') || 'report-form.html';
    });
  }

  const bars = Array.from(document.querySelectorAll('.card--pain .spark__bar'));
  if (bars.length) {
    const last = bars[bars.length - 1];
    const heightStr = (last.style.height || '0%').replace('%', '');
    const value = Number(heightStr);

    const noteEl = document.getElementById('painNote');

    if (noteEl) {
      if (value >= 65) {
        noteEl.textContent = 'Higher pain today. Consider a lighter pace.';
      } else if (value >= 45) {
        noteEl.textContent = 'Stable trend. Monitor after exercises.';
      } else {
        noteEl.textContent = 'Lower pain. Keep consistent form.';
      }
    }
  }
})();
