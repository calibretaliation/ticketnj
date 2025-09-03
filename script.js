const imageElement = document.getElementById('slideshow-image');
const images = ['image1.png', 'image2.png'];
const intervalTime = 5000; // 5 seconds
let currentIndex = 0;

// --- Slideshow Logic (Unchanged) ---
function changeImage() {
    imageElement.classList.add('fade-out');
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length;
        imageElement.src = images[currentIndex];
        imageElement.classList.remove('fade-out');
    }, 700);
}

// Start the slideshow
setInterval(changeImage, intervalTime);

// --- Fullscreen Toggle Logic (New) ---
imageElement.addEventListener('click', () => {
    // Check if the page is NOT currently in fullscreen mode
    if (!document.fullscreenElement) {
        // If not, request to enter fullscreen
        // We request it on the main document element for best compatibility
        document.documentElement.requestFullscreen().catch((err) => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        // If it IS in fullscreen, exit fullscreen
        document.exitFullscreen();
    }
});