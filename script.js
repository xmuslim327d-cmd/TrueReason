// ===============================
// Typing Effect
// ===============================
let words = ["Muslim", "programmer"];
let currentIndex = 0;
let charIndex = 0;
let isDeleting = false;
const changingText = document.getElementById("changing-text");

function typeEffect() {
    if (!changingText) return;

    let currentWord = words[currentIndex];

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    changingText.textContent = currentWord.substring(0, charIndex);

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % words.length;
        setTimeout(typeEffect, 200);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}
if (changingText) typeEffect();


// ===============================
// Side Menu Toggle
// ===============================
function toggleMenu() {
    document.getElementById("side-menu").classList.toggle("open");
}


// ===============================
// Loading Screen System
// ===============================
const loadingScreen = document.getElementById("loading-screen");

function showLoading() {
    if (loadingScreen) {
        loadingScreen.classList.add("show");
    }
}

function hideLoading() {
    if (loadingScreen) {
        loadingScreen.classList.remove("show");
    }
}


// ===============================
// Menu Link Loading Animation
// ===============================
document.querySelectorAll('#side-menu a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        showLoading(); // fade in

        const target = this.getAttribute('href');

        // Smooth controlled transition
        setTimeout(() => {
            window.location.href = target;
        }, 800); // slower = smoother
    });
});


// ===============================
// Contact Form Handling
// ===============================
const form = document.getElementById("contactForm");

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        showLoading();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        fetch('/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message })
        })
        .then(response => response.text())
        .then(data => {
            hideLoading();
            alert("Form submitted successfully!");
            form.reset();
        })
        .catch(error => {
            hideLoading();
            alert("Error submitting the form. Please try again.");
        });
    });
}