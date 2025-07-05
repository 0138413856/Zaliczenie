document.addEventListener('DOMContentLoaded', async () => {
    const randomizeButton = document.getElementById('randomize-button');
    const imageElements = {
        'first-image': document.querySelector('#first-image'),
        'second-image': document.querySelector('#second-image'),
        'third-image': document.querySelector('#third-image'),
        'fourth-image': document.querySelector('#fourth-image')
    };

    const imageSources = {
        'first-image': { dir: 'images/first-section/', files: [] },
        'second-image': { dir: 'images/second-section/', files: [] },
        'third-image': { dir: 'images/third-section/', files: [] },
        'fourth-image': { dir: 'images/fourth-section/', files: [] }
    };

    function checkImageExists(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }

    console.log("Starting dynamic image detection...");
    for (const sectionKey in imageSources) {
        if (imageSources.hasOwnProperty(sectionKey)) {
            const sectionData = imageSources[sectionKey];
            let i = 1;
            while (true) {
                const imageName = "image" + i + ".png";
                const imagePath = sectionData.dir + imageName;
                const exists = await checkImageExists(imagePath);
                
                if (exists) {
                    sectionData.files.push(imageName);
                    i++;
                } else {
                    break; 
                }
            }
            if (sectionData.files.length > 0) {
                console.log("For section '" + sectionKey + "', found images:", sectionData.files);
            } else {
                console.warn("No 'imageX.png' files found for section '" + sectionKey + "' in " + sectionData.dir);
            }
        }
    }
    console.log("Dynamic image detection finished.");

    function getRandomElement(arr) {
        if (!arr || arr.length === 0) {
            return null;
        }
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function randomizeImages() {
        for (const imageClass in imageElements) {
            if (imageElements.hasOwnProperty(imageClass) && imageSources.hasOwnProperty(imageClass)) {
                const imgElement = imageElements[imageClass];
                const sourceData = imageSources[imageClass];
                
                if (imgElement && sourceData.files.length > 0) {
                    const randomImageFile = getRandomElement(sourceData.files);
                    if (randomImageFile) {
                        imgElement.src = sourceData.dir + randomImageFile;
                    } else {
                        console.warn("No image could be selected for " + imageClass + " in " + sourceData.dir);
                        imgElement.src = "";
                    }
                } else if (imgElement && sourceData.files.length === 0) {
                    console.warn("Image files array for " + imageClass + " is empty. Add image filenames to script.js or ensure they follow 'imageX.png' pattern.");
                    imgElement.src = "";
                }
            }
        }
    }

    if (randomizeButton) {
        randomizeButton.addEventListener('click', randomizeImages);
    } else {
        console.error('Randomize button not found!');
    }
    randomizeImages();
});
