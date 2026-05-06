/* ==================================================
MARYAM ALHASHMI PORTFOLIO - FINAL JAVASCRIPT
================================================== */

document.addEventListener("DOMContentLoaded", function () {

/* ==================================================
CUSTOM CURSOR + INTERACTIVE BACKGROUND
================================================== */

const blob = document.querySelector(".cursor-blob");

document.addEventListener("mousemove", function (event) {
document.documentElement.style.setProperty("--mouse-x", event.clientX + "px");
document.documentElement.style.setProperty("--mouse-y", event.clientY + "px");

if (blob) {
blob.style.left = event.clientX + "px";
blob.style.top = event.clientY + "px";
}
});

const hoverItems = document.querySelectorAll(
"a, button, input, textarea, .project-card, .skill-card, .connect-card, .message-box, .project-spotlight, .stopmotion-stage, .hero-photo, .skill-visual-panel"
);

hoverItems.forEach(function (item) {
item.addEventListener("mouseenter", function () {
if (blob) {
blob.classList.add("grow");
}
});

item.addEventListener("mouseleave", function () {
if (blob) {
blob.classList.remove("grow");
}
});
});

/* ==================================================
SCROLL REVEAL EFFECT
================================================== */

const revealElements = document.querySelectorAll(".reveal");
const sectionPanels = document.querySelectorAll(".section-panel");

const revealObserver = new IntersectionObserver(
function (entries) {
entries.forEach(function (entry) {
if (entry.isIntersecting) {
entry.target.classList.add("show");
}
});
},
{
threshold: 0.15
}
);

revealElements.forEach(function (element) {
revealObserver.observe(element);
});

const sectionObserver = new IntersectionObserver(
function (entries) {
entries.forEach(function (entry) {
if (entry.isIntersecting) {
entry.target.classList.add("section-visible");
}
});
},
{
threshold: 0.12
}
);

sectionPanels.forEach(function (section) {
sectionObserver.observe(section);
});

const homeSection = document.querySelector("#home");

if (homeSection) {
homeSection.classList.add("section-visible");

const homeRevealItems = homeSection.querySelectorAll(".reveal");

homeRevealItems.forEach(function (item) {
item.classList.add("show");
});
}

/* ==================================================
STOP-MOTION ABOUT ANIMATION
================================================== */

const jumpFrames = document.querySelectorAll(".jump-frame");
let currentJumpFrame = 0;

function showJumpFrame(index) {
jumpFrames.forEach(function (frame) {
frame.classList.remove("active");
});

if (jumpFrames[index]) {
jumpFrames[index].classList.add("active");
}
}

if (jumpFrames.length > 0) {
showJumpFrame(0);

setInterval(function () {
currentJumpFrame = (currentJumpFrame + 1) % jumpFrames.length;
showJumpFrame(currentJumpFrame);
}, 260);
}

/* ==================================================
SKILLS DETAIL IMAGE TEXT
================================================== */

const skillCards = document.querySelectorAll(".skill-card");
const skillVisualTitle = document.querySelector("#skill-visual-title");
const skillVisualNote = document.querySelector("#skill-visual-note");

skillCards.forEach(function (card) {
card.addEventListener("mouseenter", function () {
if (skillVisualTitle && skillVisualNote) {
skillVisualTitle.textContent = card.dataset.skillTitle;
skillVisualNote.textContent = card.dataset.skillNote;
}
});
});

/* ==================================================
PROJECT CARD 3D TILT
================================================== */

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(function (card) {
card.addEventListener("mousemove", function (event) {
const rect = card.getBoundingClientRect();

const x = event.clientX - rect.left;
const y = event.clientY - rect.top;

const centerX = rect.width / 2;
const centerY = rect.height / 2;

const rotateX = (y - centerY) / 14;
const rotateY = (centerX - x) / 14;

card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

card.addEventListener("mouseleave", function () {
card.style.transform = "rotateX(0deg) rotateY(0deg)";
});
});

/* ==================================================
PROJECT SPOTLIGHT
================================================== */

const spotlightTitle = document.querySelector("#spotlight-title");
const spotlightType = document.querySelector("#spotlight-type");
const spotlightDescription = document.querySelector("#spotlight-description");
const spotlightTools = document.querySelector("#spotlight-tools");

projectCards.forEach(function (card) {
card.addEventListener("mouseenter", function () {
projectCards.forEach(function (item) {
item.classList.remove("active-project");
});

card.classList.add("active-project");

if (spotlightTitle && spotlightType && spotlightDescription && spotlightTools) {
spotlightTitle.textContent = card.dataset.title;
spotlightType.textContent = card.dataset.type;
spotlightDescription.textContent = card.dataset.description;
spotlightTools.textContent = card.dataset.tools;
}
});
});

/* ==================================================
COUNT-UP NUMBERS
================================================== */

const numbers = document.querySelectorAll("[data-target]");
let counted = false;

function countUpNumbers() {
if (counted) return;

numbers.forEach(function (number) {
const target = Number(number.dataset.target);
let count = 0;
const speed = target / 80;

function updateNumber() {
if (count < target) {
count += speed;
number.textContent = Math.ceil(count);
requestAnimationFrame(updateNumber);
} else {
number.textContent = target;
}
}

updateNumber();
});

counted = true;
}

window.addEventListener("scroll", function () {
const aboutSection = document.querySelector("#about");

if (aboutSection) {
const aboutPosition = aboutSection.getBoundingClientRect().top;

if (aboutPosition < window.innerHeight - 120) {
countUpNumbers();
}
}
});

window.addEventListener("load", function () {
const aboutSection = document.querySelector("#about");

if (aboutSection) {
const aboutPosition = aboutSection.getBoundingClientRect().top;

if (aboutPosition < window.innerHeight) {
countUpNumbers();
}
}
});

/* ==================================================
MESSAGE FORM CHARACTER COUNTER
================================================== */

const messageInput = document.querySelector("#message");
const characterCount = document.querySelector("#character-count");
const formStatus = document.querySelector("#form-status");

if (messageInput && characterCount) {
messageInput.addEventListener("input", function () {
characterCount.textContent = messageInput.value.length + " / 220";

if (formStatus) {
if (messageInput.value.length > 0) {
formStatus.textContent = "Message is looking good ✦";
} else {
formStatus.textContent = "Message ready when you are ✦";
}
}
});
}

/* ==================================================
CONTACT FORM MAILTO
================================================== */

const messageForm = document.querySelector("#message-form");

if (messageForm) {
messageForm.addEventListener("submit", function (event) {
event.preventDefault();

const name = document.querySelector("#name").value.trim();
const email = document.querySelector("#email").value.trim();
const message = document.querySelector("#message").value.trim();

const subject = "Portfolio Message from " + name;

const body =
"Name: " + name + "\n" +
"Email: " + email + "\n\n" +
"Message:\n" + message;

if (formStatus) {
formStatus.textContent = "Opening your email app now ✦";
}

setTimeout(function () {
window.location.href =
"mailto:maryammalhashmii@gmail.com?subject=" +
encodeURIComponent(subject) +
"&body=" +
encodeURIComponent(body);
}, 400);
});
}

/* ==================================================
MOBILE MENU
================================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav");
const navMenuLinks = document.querySelectorAll("nav a");

if (menuToggle && navMenu) {
menuToggle.addEventListener("click", function () {
navMenu.classList.toggle("open");

if (navMenu.classList.contains("open")) {
menuToggle.textContent = "×";
} else {
menuToggle.textContent = "☰";
}
});
}

navMenuLinks.forEach(function (link) {
link.addEventListener("click", function () {
if (navMenu) {
navMenu.classList.remove("open");
}

if (menuToggle) {
menuToggle.textContent = "☰";
}
});
});

});
