/* ==================================================
CUSTOM CURSOR + INTERACTIVE BACKGROUND
The cursor blob follows the mouse.
The background glow also follows the mouse.
================================================== */
const blob = document.querySelector(".cursor-blob");

if (blob) {
document.addEventListener("mousemove", function (event) {
blob.style.left = event.clientX + "px";
blob.style.top = event.clientY + "px";

document.documentElement.style.setProperty("--mouse-x", event.clientX + "px");
document.documentElement.style.setProperty("--mouse-y", event.clientY + "px");
});
}

/* ==================================================
CURSOR GROW EFFECT
The cursor blob becomes larger over clickable items.
================================================== */
const hoverItems = document.querySelectorAll(
"a, button, input, textarea, .project-card, .skill-card, .connect-card, .message-box, .project-spotlight, .stopmotion-stage, .hero-photo, .detail-photo"
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
SCROLL REVEAL FOR ELEMENTS
Adds the .show class when smaller elements enter view.
================================================== */
const revealElements = document.querySelectorAll(".reveal");

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

/* ==================================================
SCROLL REVEAL FOR FULL SECTIONS
Adds the .section-visible class when each section enters view.
================================================== */
const sectionPanels = document.querySelectorAll(".section-panel");

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

/* ==================================================
ACTIVE NAVIGATION LINK
Highlights the nav link for the section currently on screen.
================================================== */
const sections = document.querySelectorAll(".section-panel");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", function () {
let currentSection = "";

sections.forEach(function (section) {
const sectionTop = section.offsetTop - 180;
const sectionHeight = section.offsetHeight;

if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
currentSection = section.getAttribute("id");
}
});

navLinks.forEach(function (link) {
link.classList.remove("active-link");

if (link.getAttribute("href") === "#" + currentSection) {
link.classList.add("active-link");
}
});
});

/* ==================================================
ABOUT STOP-MOTION IMAGE SEQUENCE
Cycles through standing, starting jump, and jumped images.
================================================== */
const aboutSectionElement = document.querySelector("#about");
const jumpFrames = document.querySelectorAll(".jump-frame");

let aboutSequenceStarted = false;
let currentJumpFrame = 0;

function showJumpFrame(index) {
jumpFrames.forEach(function (frame) {
frame.classList.remove("active");
});

if (jumpFrames[index]) {
jumpFrames[index].classList.add("active");
}
}

function startAboutSequence() {
if (aboutSequenceStarted) return;
aboutSequenceStarted = true;

showJumpFrame(0);

setInterval(function () {
currentJumpFrame = (currentJumpFrame + 1) % jumpFrames.length;
showJumpFrame(currentJumpFrame);
}, 380);
}

if (aboutSectionElement && jumpFrames.length > 0) {
const aboutSequenceObserver = new IntersectionObserver(
function (entries) {
entries.forEach(function (entry) {
if (entry.isIntersecting) {
startAboutSequence();
}
});
},
{
threshold: 0.35
}
);

aboutSequenceObserver.observe(aboutSectionElement);
}

/* ==================================================
PROJECT CARD 3D TILT
Cards tilt depending on the mouse position.
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
Updates the right-side project spotlight when hovering.
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
The numbers in the About section count up when visible.
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

const aboutSection = document.querySelector("#about");

if (aboutSection) {
window.addEventListener("scroll", function () {
const aboutPosition = aboutSection.getBoundingClientRect().top;

if (aboutPosition < window.innerHeight - 120) {
countUpNumbers();
}
});
}

/* ==================================================
MESSAGE BOX CHARACTER COUNTER
Shows how many characters are typed in the message.
================================================== */
const messageInput = document.querySelector("#message");
const characterCount = document.querySelector("#character-count");
const formStatus = document.querySelector("#form-status");

if (messageInput && characterCount) {
messageInput.addEventListener("input", function () {
characterCount.textContent = messageInput.value.length + " / 220";

if (messageInput.value.length > 0) {
formStatus.textContent = "Message is looking good ✦";
} else {
formStatus.textContent = "Message ready when you are ✦";
}
});
}

/* ==================================================
CONTACT FORM
Opens an email draft to Maryam when the form is submitted.
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

formStatus.textContent = "Opening your email app now ✦";

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
Opens and closes the mobile navigation dropdown.
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
