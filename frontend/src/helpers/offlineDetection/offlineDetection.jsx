const checkBlackPixels = (videoElement, threshold = 0.7) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  let blackPixels = 0;
  let totalPixels = canvas.width * canvas.height;

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    if (r === 0 && g === 0 && b === 0) {
      blackPixels += 1;
    }
  }

  const blackPixelPercentage = blackPixels / totalPixels;
  return blackPixelPercentage >= threshold;
};

export default checkBlackPixels;
