# Ticket NJ - Color-Based Image Slideshow

This is a Progressive Web App (PWA) that displays an image slideshow with color selection functionality.

## Features

### Color Selection Screen
- Users start with a color selection screen featuring three color options: Red, Blue, and Green
- Each color has its own pair of images (image1.png and image2.png)
- Responsive design that works on mobile and desktop devices

### Slideshow Features
- Automatic slideshow that cycles between two images based on the selected color
- QR code overlay in the top-right corner
- Live date and time display
- 25-minute countdown timer
- Fade transition effects between images
- Back button to return to color selection

## File Structure (GitHub Pages Ready)

```
ticketnj/
├── .github/
│   └── workflows/
│       └── update-colors.yml    # Auto-maintenance workflow
├── colors/
│   ├── index.txt               # Auto-generated color list
│   ├── red/
│   │   ├── image1.png
│   │   └── image2.png
│   ├── blue/
│   │   ├── image1.png
│   │   └── image2.png
│   └── .../                    # More color folders
├── index.html                  # Main HTML file
├── script.js                   # JavaScript functionality
├── style.css                   # CSS styles
├── manifest.json               # PWA manifest
├── qr.png                     # QR code image
├── icon-512x512.png           # App icon
└── README.md                   # Documentation
```

## Usage

1. Open the app in a web browser
2. Choose your preferred color from the selection screen
3. The slideshow will start with the images corresponding to your chosen color
4. Use the "Back to Colors" button to return and select a different color

## Adding New Colors (GitHub Pages Compatible)

The app now automatically detects colors using a pure client-side solution! To add new colors:

### Method 1: Automatic (Recommended for GitHub Pages)
1. Create a new folder in the `colors/` directory with your color name
2. Add `image1.png` and `image2.png` to that folder
3. Commit and push to GitHub
4. GitHub Actions will automatically update `colors/index.txt`
5. The website will automatically detect and display your new color!

### Method 2: Manual Index Update
1. Create a new folder in the `colors/` directory with your color name
2. Add `image1.png` and `image2.png` to that folder
3. Add the color name to `colors/index.txt`
4. Push changes to GitHub Pages

### How It Works

#### Client-Side Color Detection
- **Primary Method**: Reads from `colors/index.txt` for efficient loading
- **Fallback Method**: Scans predefined color names by testing image URLs
- **GitHub Actions**: Automatically maintains `colors/index.txt` when folders change
- **Smart Colors**: Known colors get predefined styles, unknown colors get auto-generated colors

#### GitHub Actions Integration
- Monitors changes to the `colors/` folder
- Automatically updates `colors/index.txt` when folders are added/removed
- Only includes folders that contain both `image1.png` and `image2.png`
- Sorts color names alphabetically

## Technical Details

- **Slideshow Interval**: 0.5 seconds between image transitions
- **Countdown Duration**: 25 minutes from slideshow start
- **PWA Ready**: Includes manifest.json for installation on mobile devices
- **Responsive Design**: Works on both desktop and mobile devices
- **GitHub Pages Compatible**: Pure client-side color detection
- **No Server Required**: Works entirely in the browser
- **Auto-Discovery**: Automatically finds and loads available colors

## Benefits of This Approach

### ✅ **GitHub Pages Compatible**
- No server-side scripts required
- Works with static hosting
- Automatic deployment with GitHub Actions

### ✅ **Performance Optimized**
- Uses efficient index file for quick loading
- Falls back to scanning only when needed
- Loads colors asynchronously with loading indicator

### ✅ **Maintenance Free**
- GitHub Actions automatically update color index
- No manual configuration needed
- Self-maintaining system

### ✅ **Developer Friendly**
- Simple folder-based organization
- Visual feedback during loading
- Error handling for missing files
- Supports 20+ predefined colors with automatic color generation for custom names

## 🚀 GitHub Pages Deployment

### Quick Deploy:
1. **Fork or clone this repository**
2. **Go to repository Settings → Pages**
3. **Select source: Deploy from a branch**
4. **Choose branch: main (or your default branch)**
5. **Folder: / (root)**
6. **Save and wait for deployment**

Your app will be available at: `https://yourusername.github.io/ticketnj`

### Adding Colors After Deployment:
1. Create new color folder: `colors/yourcolor/`
2. Add `image1.png` and `image2.png`
3. Commit and push changes
4. GitHub Actions will automatically update the color index
5. Your new color appears instantly on the live site!

### Zero Configuration Needed:
- ✅ All files are ready for deployment
- ✅ GitHub Actions workflow included
- ✅ Progressive Web App configured
- ✅ No build process required