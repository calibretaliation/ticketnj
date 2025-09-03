const imageElement = document.getElementById('slideshow-image');
const images = ['image1.png', 'image2.png'];
const intervalTime = 500; // 0.5 seconds
let currentIndex = 0;

function changeImage() {
    // Fade the current image out
    imageElement.classList.add('fade-out');

    // Wait for the fade to finish before changing the source
    setTimeout(() => {
        // Cycle to the next image
        currentIndex = (currentIndex + 1) % images.length;
        
        // Update the image source
        imageElement.src = images[currentIndex];
        
        // Fade the new image in
        imageElement.classList.remove('fade-out');
    }, 700); // Must match CSS transition time
}

// Start the slideshow
setInterval(changeImage, intervalTime);