// --- Get all the necessary elements ---
const colorSelectionScreen = document.getElementById('color-selection-screen');
const slideshowScreen = document.getElementById('slideshow-screen');
const container = document.getElementById('image-container');
const imageElement = document.getElementById('slideshow-image');
const datetimeBox = document.getElementById('datetime-box');
const colorButtonsContainer = document.getElementById('color-buttons-container');
let availableColors = [];

// --- Config ---
let images = []; // Will be set based on selected color
let selectedColor = '';
const slideshowIntervalTime = 500; // 0.5 seconds
const clockIntervalTime = 1000; // 1 second
let currentIndex = 0;
let slideshowInterval = null;
let clockInterval = null;
let countdownInterval = null;

// --- Dynamic Color Loading (Client-side for GitHub Pages) ---
const colorPresets = {
    'red': { backgroundColor: '#ff4444', displayName: 'Red' },
    'blue': { backgroundColor: '#4444ff', displayName: 'Blue' },
    'green': { backgroundColor: '#44ff44', displayName: 'Green' },
    'yellow': { backgroundColor: '#ffff44', displayName: 'Yellow' },
    'purple': { backgroundColor: '#ff44ff', displayName: 'Purple' },
    'orange': { backgroundColor: '#ff8844', displayName: 'Orange' },
    'pink': { backgroundColor: '#ff88cc', displayName: 'Pink' },
    'cyan': { backgroundColor: '#44ffff', displayName: 'Cyan' },
    'brown': { backgroundColor: '#8b4513', displayName: 'Brown' },
    'black': { backgroundColor: '#333333', displayName: 'Black' },
    'white': { backgroundColor: '#e0e0e0', displayName: 'White' },
    'gray': { backgroundColor: '#888888', displayName: 'Gray' },
    'grey': { backgroundColor: '#888888', displayName: 'Grey' },
    'gold': { backgroundColor: '#ffd700', displayName: 'Gold' },
    'silver': { backgroundColor: '#c0c0c0', displayName: 'Silver' },
    'lime': { backgroundColor: '#32cd32', displayName: 'Lime' },
    'navy': { backgroundColor: '#000080', displayName: 'Navy' },
    'maroon': { backgroundColor: '#800000', displayName: 'Maroon' },
    'teal': { backgroundColor: '#008080', displayName: 'Teal' },
    'olive': { backgroundColor: '#808000', displayName: 'Olive' }
};

// List of potential color names to check
const potentialColors = [
    'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan',
    'brown', 'black', 'white', 'gray', 'grey', 'gold', 'silver', 'lime',
    'navy', 'maroon', 'teal', 'olive', 'violet', 'indigo', 'coral', 'salmon',
    'khaki', 'plum', 'tan', 'mint', 'rose', 'sky', 'forest', 'crimson'
];

// Function to check if an image exists
function checkImageExists(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

// Function to generate color from string (for unknown colors)
function generateColorFromString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 70%, 50%)`;
}

// Function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Main function to discover available colors
async function loadAvailableColors() {
    try {
        // Try to load from index file first (more efficient for GitHub Pages)
        const response = await fetch('colors/index.txt');
        if (response.ok) {
            const indexText = await response.text();
            const colorNames = indexText.trim().split('\n')
                .map(line => line.trim())
                .filter(line => line && !line.startsWith('#'));
            
            await loadColorsFromList(colorNames);
        } else {
            // Fallback to scanning predefined color names
            await loadColorsFromScanning();
        }
    } catch (error) {
        console.log('Index file not found, falling back to scanning...');
        await loadColorsFromScanning();
    }
}

// Load colors from a provided list (from index file)
async function loadColorsFromList(colorNames) {
    const discoveredColors = [];
    
    for (const colorName of colorNames) {
        const image1Path = `colors/${colorName}/image1.png`;
        const image2Path = `colors/${colorName}/image2.png`;
        
        // Check if both images exist for this color
        const [image1Exists, image2Exists] = await Promise.all([
            checkImageExists(image1Path),
            checkImageExists(image2Path)
        ]);
        
        if (image1Exists && image2Exists) {
            const preset = colorPresets[colorName.toLowerCase()];
            discoveredColors.push({
                name: colorName,
                displayName: preset ? preset.displayName : capitalizeFirstLetter(colorName),
                backgroundColor: preset ? preset.backgroundColor : generateColorFromString(colorName)
            });
        }
    }
    
    finalizeFolderLoading(discoveredColors);
}

// Load colors by scanning predefined names (fallback method)
async function loadColorsFromScanning() {
    const discoveredColors = [];
    
    // Check each potential color
    for (const colorName of potentialColors) {
        const image1Path = `colors/${colorName}/image1.png`;
        const image2Path = `colors/${colorName}/image2.png`;
        
        // Check if both images exist for this color
        const [image1Exists, image2Exists] = await Promise.all([
            checkImageExists(image1Path),
            checkImageExists(image2Path)
        ]);
        
        if (image1Exists && image2Exists) {
            const preset = colorPresets[colorName.toLowerCase()];
            discoveredColors.push({
                name: colorName,
                displayName: preset ? preset.displayName : capitalizeFirstLetter(colorName),
                backgroundColor: preset ? preset.backgroundColor : generateColorFromString(colorName)
            });
        }
    }
    
    finalizeFolderLoading(discoveredColors);
}

// Finalize the color loading process
function finalizeFolderLoading(discoveredColors) {
    // Sort colors alphabetically by display name
    discoveredColors.sort((a, b) => a.displayName.localeCompare(b.displayName));
    
    availableColors = discoveredColors;
    
    if (availableColors.length === 0) {
        // Fallback: if no colors are discovered, show an error message
        showErrorMessage('No color folders with valid images found!');
        return;
    }
    
    generateColorButtons();
    console.log(`Discovered ${availableColors.length} colors:`, availableColors.map(c => c.name));
}

function generateColorButtons() {
    // Clear existing buttons and error messages
    colorButtonsContainer.innerHTML = '';
    
    // Generate buttons for each available color
    availableColors.forEach(color => {
        const button = document.createElement('button');
        button.className = 'color-btn';
        button.setAttribute('data-color', color.name);
        button.style.backgroundColor = color.backgroundColor;
        button.textContent = color.displayName;
        
        // Add click event listener
        button.addEventListener('click', () => {
            selectColor(color.name);
        });
        
        colorButtonsContainer.appendChild(button);
    });
}

function showLoadingMessage() {
    colorButtonsContainer.innerHTML = `
        <div class="loading-message">
            <div class="spinner"></div>
            <h2>🔍 Discovering Available Colors...</h2>
            <p>Scanning for color folders and images</p>
        </div>
    `;
}

function showErrorMessage(message) {
    colorButtonsContainer.innerHTML = `
        <div class="error-message">
            <h2>⚠️ ${message}</h2>
            <p>Please add color folders with image1.png and image2.png in each folder.</p>
            <p>Expected structure:</p>
            <pre>colors/
├── red/
│   ├── image1.png
│   └── image2.png
├── blue/
│   ├── image1.png
│   └── image2.png
└── ...</pre>
        </div>
    `;
}

// --- Color Selection Logic ---
function selectColor(color) {
    selectedColor = color;
    images = [`colors/${color}/image1.png`, `colors/${color}/image2.png`];
    
    // Hide color selection screen
    colorSelectionScreen.style.display = 'none';
    
    // Show slideshow screen
    slideshowScreen.style.display = 'block';
    
    // Initialize slideshow with first image
    currentIndex = 0;
    imageElement.src = images[currentIndex];
    
    // Add error handling for missing images
    imageElement.onerror = () => {
        console.warn(`Image not found: ${images[currentIndex]}`);
        // Try the next image or show a placeholder
        currentIndex = (currentIndex + 1) % images.length;
        if (currentIndex !== 0) {
            imageElement.src = images[currentIndex];
        } else {
            console.error('No valid images found for color:', color);
            // Go back to color selection if no images are available
            goBackToColorSelection();
        }
    };
    
    // Start all intervals
    startSlideshow();
}

function startSlideshow() {
    // Setup event listeners
    window.addEventListener('resize', matchWidths);
    imageElement.addEventListener('load', matchWidths);
    
    // Start intervals
    slideshowInterval = setInterval(changeImage, slideshowIntervalTime);
    
    updateTime(); // Run once immediately
    clockInterval = setInterval(updateTime, clockIntervalTime);
    
    // Initialize countdown
    initializeCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
    
    // Initial width matching
    matchWidths();
}

// Color button event listeners are now added dynamically in generateColorButtons()

// Back button functionality
function goBackToColorSelection() {
    // Clear all intervals
    if (slideshowInterval) clearInterval(slideshowInterval);
    if (clockInterval) clearInterval(clockInterval);
    if (countdownInterval) clearInterval(countdownInterval);
    
    // Reset variables
    slideshowInterval = null;
    clockInterval = null;
    countdownInterval = null;
    
    // Hide slideshow screen
    slideshowScreen.style.display = 'none';
    
    // Show color selection screen
    colorSelectionScreen.style.display = 'flex';
    
    // Clear image source
    imageElement.src = '';
}

// Initialize app when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    // Show loading message while discovering colors
    showLoadingMessage();
    
    // Load available colors and generate buttons
    loadAvailableColors();
    
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', goBackToColorSelection);
    }
    
    // Add double-click on slideshow image to go back
    imageElement.addEventListener('dblclick', goBackToColorSelection);
    
    // Add keyboard shortcut (Escape key) to go back
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && slideshowScreen.style.display !== 'none') {
            goBackToColorSelection();
        }
    });
});

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


// --- INITIALIZATION ---
// The app now starts with color selection screen
// Slideshow will start after user selects a color

// --- 4. Countdown Timer Logic ---

// Get the new countdown box element
const countdownBox = document.getElementById('countdown-box');

// Expiration time will be set when slideshow starts
let expirationTime = 0;

function initializeCountdown() {
    // Set the expiration time to 25 minutes from now
    expirationTime = new Date().getTime() + 25 * 60 * 1000;
}

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

// Countdown will be started when slideshow begins