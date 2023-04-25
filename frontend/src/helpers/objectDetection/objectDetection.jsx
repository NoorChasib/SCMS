// Import necessary modules and packages
import ml5 from "ml5";

// Initialize object detection using ml5's objectDetector
const initObjectDetector = async (videoRef, onPrediction) => {
  // Load the COCO-SSD model with ml5's objectDetector
  const objectDetector = await ml5.objectDetector("cocossd", {}, () => {});

  // Define a function that detects objects in the video feed
  const detectObjects = async () => {
    // If the video reference is not set, exit the function
    if (!videoRef.current) return;

    try {
      // Use the objectDetector to detect objects in the video feed
      const predictions = await objectDetector.detect(videoRef.current);
      // Filter the predictions to only include objects labeled as "person" with a confidence score of at least 0.6
      const personPredictions = predictions.filter(
        (prediction) =>
          prediction.label === "person" && prediction.confidence >= 0.6,
      );
      // Call the onPrediction function, passing in the filtered personPredictions
      onPrediction(personPredictions);
    } catch (err) {}

    // Call the detectObjects function again after 1 second
    setTimeout(detectObjects, 1000);
  };

  // Start detecting objects in the video feed
  detectObjects();
};

export default initObjectDetector;
