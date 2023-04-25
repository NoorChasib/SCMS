import ml5 from "ml5";

const initObjectDetector = async (videoRef, onPrediction) => {
  const objectDetector = await ml5.objectDetector("cocossd", {}, () => {
    console.log("Object detection model loaded.");
  });

  const detectObjects = async () => {
    if (!videoRef.current) return;

    try {
      const predictions = await objectDetector.detect(videoRef.current);
      const personPredictions = predictions.filter(
        (prediction) =>
          prediction.label === "person" && prediction.confidence >= 0.6,
      );
      onPrediction(personPredictions);
    } catch (err) {
      console.error(err);
    }

    requestAnimationFrame(detectObjects);
  };

  detectObjects();
};

export default initObjectDetector;
