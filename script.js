// --- Elements & Config ---
const imageElement = document.getElementById('slideshow-image');
const images = ['image1.png', 'image2.png'];
const intervalTime = 5000;
let currentIndex = 0;

// --- Logic ---

// 1. DYNAMIC HEIGHT: Fixes the viewport height issue on mobile.
const setAppHeight = () => {
    // Calculate the actual inner height and set it as a CSS variable.
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
};
// Run on load and whenever the window is resized.
window.addEventListener('resize', setAppHeight);
setAppHeight(); // Run it once on initial load.

// 2. SLIDESHOW: The image changing logic (no changes here).
function changeImage() {
    imageElement.classList.add('fade-out');
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length;
        imageElement.src = images[currentIndex];
        imageElement.classList.remove('fade-out');
    }, 700);
}
setInterval(changeImage, intervalTime);

// 3. FULLSCREEN: Enter true fullscreen on user tap.
document.body.addEventListener('click', () => {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
        document.documentElement.webkitRequestFullscreen();
    }
});