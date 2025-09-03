// --- Elements & Config ---
const container = document.getElementById('slideshow-container');
const images = ['image1.png', 'image2.png'];
const intervalTime = 500;
let currentIndex = 0;

// --- Logic ---

// 1. DYNAMIC HEIGHT: Sets the --app-height CSS variable. (No changes here)
const setAppHeight = () => {
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
};
window.addEventListener('resize', setAppHeight);
setAppHeight();

// 2. SLIDESHOW: The image changing logic is slightly different now.
function changeImage() {
    container.classList.add('fade-out');
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length;
        // Update the background-image property instead of src
        container.style.backgroundImage = `url('${images[currentIndex]}')`;
        container.classList.remove('fade-out');
    }, 700);
}

// Set the initial image
container.style.backgroundImage = `url('${images[0]}')`;
// Start the slideshow
setInterval(changeImage, intervalTime);

// 3. FULLSCREEN: Enter true fullscreen on user tap. (No changes here)
document.body.addEventListener('click', () => {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
        document.documentElement.webkitRequestFullscreen();
    }
});