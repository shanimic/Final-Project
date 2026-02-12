function initPhysioHome() {
    if (document.body.dataset.page !== "physio-home") return;

    const search = document.getElementById("patientSearch");
    const countOut = document.getElementById("patientsCount");
    const grid = document.getElementById("patientsGrid");
    const hint = document.getElementById("liveHint");

    // 1) אירועים + העברת נתונים בין מסכים
    document.addEventListener("click", (e) => {
        const viewAlert = e.target.closest("[data-action='view-alert']");
        if (viewAlert) {
            const p = viewAlert.dataset.patient || "";
            localStorage.setItem("selectedPatient", p); // העברה בין מסכים
            toast(`Opening patient: ${p}`);

            // jQuery feedback
            if (window.$) $(viewAlert).closest(".alert").fadeOut(140).fadeIn(220);

            // מעבר למסך הבא בתרחיש (פרופיל/אנליטיקס)
            window.location.href = "analytics.html";
        }

        const card = e.target.closest("[data-action='open-patient']");
        if (card) {
            const p = card.dataset.patient || "";
            localStorage.setItem("selectedPatient", p); // העברה בין מסכים
            toast(`Opening analytics for ${p}`);

            // 2) עיצוב דינמי באמצעות class
            document.querySelectorAll(".patient-card").forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");

            // 3) כתיבה לתוך אלמנט
            if (hint) hint.textContent = `Selected: ${p} — Redirecting to Analytics...`;

            if (window.$) $(card).hide().fadeIn(260);

            window.location.href = "analytics.html";
        }
    });

    // 4) קליטת נתונים מהמשתמש + class דינמי + כתיבה לאלמנט
    if (search && grid && countOut) {
        const cards = Array.from(grid.querySelectorAll(".patient-card"));

        search.addEventListener("input", () => {
            const q = search.value.trim().toLowerCase();
            let shown = 0;

            cards.forEach(card => {
                const name = (card.dataset.patient || "").toLowerCase();
                const program = (card.dataset.program || "").toLowerCase();
                const match = name.includes(q) || program.includes(q);

                card.classList.toggle("is-hidden", !match); // class דינמי
                if (match) shown++;
            });

            countOut.textContent = `Showing ${shown} patients`; // כתיבה לאלמנט
        });
    }
}

// לקרוא לזה ב-DOMContentLoaded יחד עם שאר init-ים שלך:
document.addEventListener("DOMContentLoaded", () => {
    initPhysioHome();
});
function setActiveSideNav() {
    const page = document.body.dataset.page;
    document.querySelectorAll(".side-link").forEach(a => {
        a.classList.remove("active");
        const href = a.getAttribute("href") || "";
        if (page === "physio-home" && href.includes("physio-home")) a.classList.add("active");
        if (page === "analytics" && href.includes("analytics")) a.classList.add("active");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setActiveSideNav();
});


function initSideMenu() {
    const toggle = document.getElementById("menuToggle");
    const sideNav = document.getElementById("sideNav");
    const overlay = document.getElementById("menuOverlay");

    if (!toggle || !sideNav || !overlay) return;

    function openMenu() {
        sideNav.classList.add("open");
        overlay.hidden = false;
        toggle.setAttribute("aria-expanded", "true");
        sideNav.setAttribute("aria-hidden", "false");
    }

    function closeMenu() {
        sideNav.classList.remove("open");
        overlay.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
        sideNav.setAttribute("aria-hidden", "true");
    }

    toggle.addEventListener("click", () => {
        sideNav.classList.contains("open") ? closeMenu() : openMenu();
    });

    overlay.addEventListener("click", closeMenu);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
    });
}

document.addEventListener("DOMContentLoaded", initSideMenu);
