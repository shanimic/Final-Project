
document.addEventListener("DOMContentLoaded", () => {
    initSideMenu();
    initPatientCardsNavigation();
    initPatientSearch();
});

function initPatientSearch() {
    const input = document.getElementById("patientSearch");
    const grid = document.getElementById("patientsGrid");

    if (!input || !grid) return;

    const cards = Array.from(grid.querySelectorAll(".patient-card"));
    if (cards.length === 0) return;

    let emptyState = document.getElementById("patientsEmptyState");
    if (!emptyState) {
        emptyState = document.createElement("p");
        emptyState.id = "patientsEmptyState";
        emptyState.className = "muted";
        emptyState.style.marginTop = "12px";
        emptyState.style.display = "none";
        emptyState.textContent = "No patients found.";
        grid.parentElement.appendChild(emptyState);
    }

    const normalize = (s) => (s || "").toLowerCase().trim();

    function applyFilter() {
        const q = normalize(input.value);
        let visibleCount = 0;

        cards.forEach((card) => {
            const name = normalize(
                card.getAttribute("data-patient") ||
                card.querySelector(".card-name")?.textContent
            );
            const program = normalize(
                card.getAttribute("data-program") ||
                card.querySelector(".card-sub")?.textContent
            );

            const match = q === "" || name.includes(q) || program.includes(q);
            card.style.display = match ? "" : "none";
            if (match) visibleCount++;
        });

        emptyState.style.display = visibleCount === 0 ? "block" : "none";
    }

    input.addEventListener("input", applyFilter);
    applyFilter();
}

function initPatientCardsNavigation() {
    const cards = document.querySelectorAll('[data-action="open-patient"]');
    if (!cards || cards.length === 0) return;

    cards.forEach((card) => {
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "link");

        const goToDetails = () => {
            window.location.href = "patient-details.html";
        };

        card.addEventListener("click", goToDetails);
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                goToDetails();
            }
        });
    });
}

function initSideMenu() {
    const toggle = document.getElementById("menuToggle");
    const sideNav = document.getElementById("sideNav");
    const overlay = document.getElementById("menuOverlay");

    if (!toggle || !sideNav || !overlay) return;

    function isMobile() {
        return window.innerWidth < 900;
    }

    function openMenu() {
        sideNav.classList.add("open");
        if (isMobile()) {
            overlay.hidden = false;
        }
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

    let wasDesktop = !isMobile();
    window.addEventListener("resize", () => {
        const isDesktop = !isMobile();
        if (isDesktop && !wasDesktop) {
            overlay.hidden = true;
        }
        wasDesktop = isDesktop;
    });
}
