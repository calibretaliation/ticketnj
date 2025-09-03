const imageElement = document.getElementById('slideshow-image');
const images = ['image1.png', 'image2.png'];
const intervalTime = 5000;
let currentIndex = 0;

// --- DYNAMIC HEIGHT: For better mobile display ---
const setAppHeight = () => {
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
};
window.addEventListener('resize', setAppHeight);
setAppHeight(); // Set initial height

// --- Slideshow Logic (Unchanged) ---
function changeImage() {
    imageElement.classList.add('fade-out');
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length;
        imageElement.src = images[currentIndex];
        imageElement.classList.remove('fade-out');
    }, 700);
}
setInterval(changeImage, intervalTime);

// --- Simulated Fullscreen Toggle ---
imageElement.addEventListener('click', () => {
    // Toggles the 'fullscreen-mode' class on the body element
    document.body.classList.toggle('fullscreen-mode');
});