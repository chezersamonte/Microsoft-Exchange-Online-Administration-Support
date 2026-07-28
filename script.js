/*=====================================================
    DOM ELEMENTS
=====================================================*/

const header = document.querySelector(".header");
const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".navbar a");
const sections = document.querySelectorAll("section");


/*=====================================================
    STICKY HEADER
=====================================================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/*=====================================================
    MOBILE MENU
=====================================================*/

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navbar.classList.contains("active")) {

        icon.classList.remove("bx-menu");
        icon.classList.add("bx-x");

    } else {

        icon.classList.remove("bx-x");
        icon.classList.add("bx-menu");

    }

});


/*=====================================================
    CLOSE MENU AFTER CLICKING A LINK
=====================================================*/

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("bx-x");
        icon.classList.add("bx-menu");

    });

});


/*=====================================================
    ACTIVE NAVIGATION
=====================================================*/

function setActiveNav() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {

            currentSection = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", setActiveNav);


/*=====================================================
    CLOSE MENU WHEN CLICKING OUTSIDE
=====================================================*/

document.addEventListener("click", (event) => {

    const clickedInsideMenu = navbar.contains(event.target);
    const clickedMenuButton = menuBtn.contains(event.target);

    if (
        navbar.classList.contains("active") &&
        !clickedInsideMenu &&
        !clickedMenuButton
    ) {

        navbar.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("bx-x");
        icon.classList.add("bx-menu");

    }

});


/*=====================================================
    INITIALIZE
=====================================================*/

setActiveNav();


/*=====================================================
    ANIMATED STATISTICS COUNTER
=====================================================*/

const counters = document.querySelectorAll(".stat-card h2");

const counterObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = Number(counter.dataset.target);

        const suffix = counter.dataset.suffix || "";

        let current = 0;

        const increment = Math.max(1, Math.ceil(target / 80));

        const updateCounter = () => {

            current += increment;

            if (current >= target) {

                counter.textContent = target + suffix;

                return;

            }

            counter.textContent = current + suffix;

            requestAnimationFrame(updateCounter);

        };

        updateCounter();

        observer.unobserve(counter);

    });

}, {

    threshold: 0.5

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});


/*=====================================================
    SCROLL REVEAL ANIMATION
=====================================================*/

const revealElements = document.querySelectorAll(

    ".section-title," +
    ".stat-card," +
    ".about-content," +
    ".about-card," +
    ".skill-card," +
    ".project-card," +
    ".timeline-item," +
    ".tool-card," +
    ".contact-card," +
    ".cta-content"

);

revealElements.forEach(element => {

    element.classList.add("fade-up");

});


const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("show");

    });

}, {

    threshold: 0.15

});

revealElements.forEach(element => {

    revealObserver.observe(element);

});


/*=====================================================
    STAGGER ANIMATION
=====================================================*/

const staggerGroups = [

    ".stat-card",
    ".about-card",
    ".skill-card",
    ".project-card",
    ".timeline-item",
    ".tool-card",
    ".contact-card"

];

staggerGroups.forEach(selector => {

    document.querySelectorAll(selector).forEach((item, index) => {

        item.style.transitionDelay = `${index * 70}ms`;

    });

});


/*=====================================================
    HERO CARD FLOATING ANIMATION
=====================================================*/

const heroCard = document.querySelector(".hero-card");

if (heroCard) {

    let direction = 1;

    let position = 0;

    function floatCard() {

        position += direction * 0.15;

        if (position >= 10) direction = -1;

        if (position <= 0) direction = 1;

        heroCard.style.transform = `translateY(${position}px)`;

        requestAnimationFrame(floatCard);

    }

    floatCard();

}


/*=====================================================
    SECTION FADE-IN
=====================================================*/

document.querySelectorAll("section").forEach(section => {

    section.classList.add("fade-up");

    revealObserver.observe(section);

});

/*=====================================================
    SMOOTH SCROLL FOR NAVIGATION
=====================================================*/

navLinks.forEach(link => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (!targetId.startsWith("#")) return;

        event.preventDefault();

        const targetSection = document.querySelector(targetId);

        if (!targetSection) return;

        const headerHeight = header.offsetHeight;

        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});


/*=====================================================
    CLOSE MOBILE MENU WITH ESC KEY
=====================================================*/

document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") return;

    navbar.classList.remove("active");

    const icon = menuBtn.querySelector("i");

    icon.classList.remove("bx-x");
    icon.classList.add("bx-menu");

});


/*=====================================================
    REMOVE TRANSITION DELAYS ON MOBILE
=====================================================*/

function optimizeAnimations() {

    if (window.innerWidth <= 768) {

        document.querySelectorAll(

            ".stat-card," +
            ".about-card," +
            ".skill-card," +
            ".project-card," +
            ".timeline-item," +
            ".tool-card," +
            ".contact-card"

        ).forEach(card => {

            card.style.transitionDelay = "0ms";

        });

    }

}

window.addEventListener("resize", optimizeAnimations);

optimizeAnimations();


/*=====================================================
    UPDATE COPYRIGHT YEAR
=====================================================*/

const copyright = document.querySelector(".copyright");

if (copyright) {

    copyright.innerHTML =
        `&copy; ${new Date().getFullYear()} Chezer O. Samonte. All Rights Reserved.`;

}


/*=====================================================
    INITIAL PAGE STATE
=====================================================*/

window.addEventListener("load", () => {

    setActiveNav();

    header.classList.toggle("scrolled", window.scrollY > 80);

});


/*=====================================================
    PERFORMANCE
=====================================================*/

// Prevent dragging images

document.querySelectorAll("img").forEach(image => {

    image.setAttribute("draggable", "false");

});


// Lazy loading

document.querySelectorAll("img").forEach(image => {

    if (!image.hasAttribute("loading")) {

        image.loading = "lazy";

    }

});


/*=====================================================
    CONSOLE MESSAGE
=====================================================*/

console.log(
`%cMicrosoft Exchange Online Administration Portfolio`,
"color:#0078D4;font-size:18px;font-weight:bold;"
);

console.log(
"%cDesigned and Developed by Chezer O. Samonte",
"color:#00BCF2;font-size:13px;"
);


/*=====================================================
    IMAGE LIGHTBOX
=====================================================*/

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const closeLightbox = document.querySelector(".lightbox-close");

document.querySelectorAll(".clickable-image").forEach(image => {

    image.addEventListener("click", () => {

        lightbox.classList.add("active");
        lightboxImage.src = image.dataset.full || image.src;

        document.body.style.overflow = "hidden";

    });

});

closeLightbox.addEventListener("click", () => {

    lightbox.classList.remove("active");
    document.body.style.overflow = "";

});

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        lightbox.classList.remove("active");
        document.body.style.overflow = "";

    }

});

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        lightbox.classList.remove("active");
        document.body.style.overflow = "";

    }

});


/*=====================================================
    BACK TO TOP
=====================================================*/

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topBtn.classList.add("show");

    } else {

        topBtn.classList.remove("show");

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/*=====================================================
                SKILLS
=====================================================*/

const skillBars = document.querySelectorAll(".skill-progress");

const skillsSection = document.querySelector(".skills");

const skillsObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            skillBars.forEach(bar=>{

                bar.style.width = bar.dataset.progress;

            });

        }

    });

},{threshold:.3});

skillsObserver.observe(skillsSection);
