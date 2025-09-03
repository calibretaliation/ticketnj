// --- Get all the necessary elements ---
const container = document.getElementById('image-container');
const imageElement = document.getElementById('slideshow-image');
const datetimeBox = document.getElementById('datetime-box');

// --- Config ---
const images = ['image1.png', 'image2.png'];
const slideshowIntervalTime = 500; // 5 seconds
const clockIntervalTime = 1000; // 1 second
let currentIndex = 0;

// --- 1. Width Matching Logic ---
function matchWidths() {
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const imageNaturalWidth = imageElement.naturalWidth;
    const imageNaturalHeight = imageElement.naturalHeight;

    if (imageNaturalHeight === 0) {
        return;
    }

    const containerAspectRatio = containerWidth / containerHeight;
    const imageAspectRatio = imageNaturalWidth / imageNaturalHeight;
    let renderedImageWidth;

    if (imageAspectRatio > containerAspectRatio) {
        renderedImageWidth = containerWidth;
    } else {
        renderedImageWidth = containerHeight * imageAspectRatio;
    }
    datetimeBox.style.width = `${renderedImageWidth}px`;
    countdownBox.style.width = `${renderedImageWidth}px`;
}

// --- 2. Slideshow Logic ---
function changeImage() {
    imageElement.classList.add('fade-out');
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length;
        imageElement.src = images[currentIndex];
        imageElement.classList.remove('fade-out');
    }, 700);
}

// --- 3. Live Date & Time Logic ---
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    });
    const dateString = now.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
    });
    datetimeBox.innerHTML = `${timeString}<br>${dateString}`;
}


// --- START EVERYTHING ---

// Setup event listeners ONCE
window.addEventListener('resize', matchWidths);
imageElement.addEventListener('load', matchWidths);
window.addEventListener('load', matchWidths); // Fallback for initial load

// Start the slideshow interval
setInterval(changeImage, slideshowIntervalTime);

// Start the clock interval
updateTime(); // Run once immediately
setInterval(updateTime, clockIntervalTime);

// --- 4. Countdown Timer Logic ---

// Get the new countdown box element
const countdownBox = document.getElementById('countdown-box');

// Set the expiration time to 30 minutes from now
const expirationTime = new Date().getTime() + 30 * 60 * 1000;

function updateCountdown() {
    const now = new Date().getTime();
    const distance = expirationTime - now;

    // If the countdown is over, display "Expired"
    if (distance < 0) {
        countdownBox.innerHTML = "Expired";
        return; // Stop the function here
    }

    // Calculate hours, minutes, and seconds
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Format the numbers to always have two digits (e.g., 09, 05, 01)
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    // Update the HTML content
    countdownBox.innerHTML = `Expires in 00:${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// --- START THE COUNTDOWN ---
// Add this line with your other interval starters at the bottom of the file
setInterval(updateCountdown, 1000);