/* =========================================================
   DI-TEXTBOOK RESOURCE PORTAL
   Main JavaScript
   Mabalacat City College - BEED
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("active");
            menuToggle.classList.toggle("active");

            const isOpen =
                navMenu.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        });


        // Close mobile menu when a link is clicked

        const navLinks =
            navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }



    /* =====================================================
       ACTIVE NAVIGATION LINK
       ===================================================== */

    const sections =
        document.querySelectorAll("main section[id]");

    const navigationLinks =
        document.querySelectorAll(".nav-menu a");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 120;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach(function (link) {

            link.classList.remove("active");

            const target =
                link.getAttribute("href");

            if (target === "#" + currentSection) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();



    /* =====================================================
       SEARCH RESOURCES
       ===================================================== */

    const searchInput =
        document.querySelector("#searchInput");

    const resourceCards =
        document.querySelectorAll(".resource-card");

    const noResults =
        document.querySelector("#noResults");


    if (searchInput && resourceCards.length > 0) {

        searchInput.addEventListener(
            "input",
            function () {

                const searchTerm =
                    searchInput.value
                        .toLowerCase()
                        .trim();

                let visibleCards = 0;


                resourceCards.forEach(function (card) {

                    const cardText =
                        card.textContent
                            .toLowerCase();

                    if (
                        cardText.includes(searchTerm)
                    ) {

                        card.style.display = "";
                        visibleCards++;

                    } else {

                        card.style.display = "none";

                    }

                });


                if (noResults) {

                    if (visibleCards === 0) {

                        noResults.style.display =
                            "block";

                    } else {

                        noResults.style.display =
                            "none";

                    }

                }

            }
        );

    }



    /* =====================================================
       RESOURCE CATEGORY FILTER
       ===================================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");


    if (
        filterButtons.length > 0 &&
        resourceCards.length > 0
    ) {

        filterButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function
