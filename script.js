// --- Configuration ---
const imageElement = document.getElementById('slideshow-image');
const images = ['image1.png', 'image2.png']; // Array of your image files
const intervalTime = 500; // Time in milliseconds (5000ms = 5 seconds)
let currentIndex = 0;

// --- Logic ---
function changeImage() {
    // Fade the current image out
    imageElement.classList.add('fade-out');

    // Wait for the fade-out transition to complete
    setTimeout(() => {
        // Increment index, looping back to 0 if it's the last image
        currentIndex = (currentIndex + 1) % images.length;
        
        // Change the image source
        imageElement.src = images[currentIndex];
        
        // Fade the new image in
        imageElement.classList.remove('fade-out');
    }, 700); // This must match the CSS transition time
}

// Start the slideshow
setInterval(changeImage, intervalTime);