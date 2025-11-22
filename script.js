// Typing effect for "changing-text"
let words = ["Muslim", "programmer"];
let currentIndex = 0;
let charIndex = 0;
let isDeleting = false;
const changingText = document.getElementById("changing-text");

function typeEffect() {
    if (!changingText) return; // prevent error if element not found

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

// Side menu toggle
function toggleMenu() {
    document.getElementById("side-menu").classList.toggle("open");
}

// Add loading screen on menu link click
document.querySelectorAll('#side-menu a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
        const target = this.getAttribute('href');
        setTimeout(() => {
            window.location.href = target;
        }, 500);
    });
});

// Form handling system
const form = document.getElementById("contactForm"); // Make sure this ID matches the form in HTML

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Show loading screen during form submission
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }

        // Send the data to the server (example using fetch)
        fetch('/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })
        })
        .then(response => response.text())
        .then(data => {
            // Hide loading screen and alert success
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            }
            alert("Form submitted successfully!");
            form.reset(); // Optionally reset the form after submission
        })
        .catch(error => {
            // Hide loading screen and show error
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            }
            alert("Error submitting the form. Please try again.");
        });
    });
}