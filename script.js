document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       MOBILE NAVIGATION
       ========================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("active");

            const isOpen = navMenu.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        // Close menu when navigation link is clicked

        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =========================
       SEARCH
       ========================= */

    const searchInput = document.getElementById("searchInput");
    const resourceCards = document.querySelectorAll(".resource-card");
    const noResults = document.getElementById("noResults");

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const searchTerm =
                searchInput.value.toLowerCase().trim();

            let visibleCount = 0;

            resourceCards.forEach(function (card) {

                const cardText =
                    card.textContent.toLowerCase();

                if (cardText.includes(searchTerm)) {

                    card.style.display = "";

                    visibleCount++;

                } else {

                    card.style.display = "none";

                }

            });


            if (noResults) {

                noResults.style.display =
                    visibleCount === 0 ? "block" : "none";

            }

        });

    }


    /* =========================
       CATEGORY FILTER
       ========================= */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const category =
                button.getAttribute("data-category");


            // Remove active state from all buttons

            filterButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });


            // Add active state to selected button

            button.classList.add("active");


            // Clear search

            if (searchInput) {

                searchInput.value = "";

            }


            let visibleCount = 0;


            resourceCards.forEach(function (card) {

                const cardCategory =
                    card.getAttribute("data-category");


                if (
                    category === "all" ||
                    cardCategory === category
                ) {

                    card.style.display = "";

                    visibleCount++;

                } else {

                    card.style.display = "none";

                }

            });


            if (noResults) {

                noResults.style.display =
                    visibleCount === 0 ? "block" : "none";

            }

        });

    });


    /* =========================
       SMOOTH SCROLLING
       ========================= */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =========================
       ACTIVE NAVIGATION
       ========================= */

    const sections =
        document.querySelectorAll("main section[id]");

    const navigationLinks =
        document.querySelectorAll(".nav-menu a");


    function updateActiveNavigation() {

        let currentSection = "home";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {

                currentSection = section.id;

            }

        });


        navigationLinks.forEach(function (link) {

            link.classList.remove("active");

            const linkTarget =
                link.getAttribute("href");

            if (linkTarget === "#" + currentSection) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    /* =========================
       BACK TO TOP
       ========================= */

    const backToTop =
        document.getElementById("backToTop");


    if (backToTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 450) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        });


        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =========================
       CURRENT YEAR
       ========================= */

    const currentYear =
        document.querySelector(".current-year");


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =========================
       CLOSE MENU WHEN CLICKING
       OUTSIDE
       ========================= */

    document.addEventListener("click", function (event) {

        if (!menuToggle || !navMenu) {
            return;
        }


        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);


        if (
            !clickedInsideMenu &&
            !clickedToggle
        ) {

            navMenu.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* =========================
       ESCAPE KEY
       ========================= */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            if (navMenu) {

                navMenu.classList.remove("active");

            }

            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    });


    /* =========================
       CONSOLE CONFIRMATION
       ========================= */

    console.log(
        "DI-Textbook Resource Portal loaded successfully."
    );

});
