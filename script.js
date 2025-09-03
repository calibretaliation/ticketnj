// Get the elements
const container = document.getElementById('image-container');
const imageElement = document.getElementById('slideshow-image');

// Config
const images = ['image1.png', 'image2.png'];
const intervalTime = 400;
let currentIndex = 0;

// --- Slideshow Logic ---
function changeImage() {
    imageElement.classList.add('fade-out');
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length;
        imageElement.src = images[currentIndex];
        imageElement.classList.remove('fade-out');
    }, 700);
}
setInterval(changeImage, intervalTime);

// --- Fullscreen Toggle ---
// When the image is clicked, toggle the 'fullscreen' class on its container
imageElement.addEventListener('click', () => {
    container.classList.toggle('fullscreen');
});