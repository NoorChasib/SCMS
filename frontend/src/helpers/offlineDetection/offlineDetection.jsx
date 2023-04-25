// Define a function that checks if a given video element contains a certain threshold of black pixels
const checkBlackPixels = (videoElement, threshold = 0.7) => {
  // Create a new canvas element and a 2D drawing context for the canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  // Set the canvas width and height to match the video element's dimensions
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  // Draw the video element onto the canvas
  ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

  // Get the image data for the canvas
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  let blackPixels = 0;
  let totalPixels = canvas.width * canvas.height;

  // Loop through all the pixels in the image data and count the number of black pixels
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    if (r === 0 && g === 0 && b === 0) {
      blackPixels += 1;
    }
  }

  // Calculate the percentage of black pixels in the image and return whether it exceeds the threshold
  const blackPixelPercentage = blackPixels / totalPixels;
  return blackPixelPercentage >= threshold;
};

export default checkBlackPixels;
