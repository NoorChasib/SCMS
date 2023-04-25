import ml5 from "ml5";

const initObjectDetector = async (videoRef, onPrediction) => {
  const objectDetector = await ml5.objectDetector("cocossd", {}, () => {});

  const detectObjects = async () => {
    if (!videoRef.current) return;

    try {
      const predictions = await objectDetector.detect(videoRef.current);
      const personPredictions = predictions.filter(
        (prediction) =>
          prediction.label === "person" && prediction.confidence >= 0.6,
      );
      onPrediction(personPredictions);
    } catch (err) {}

    setTimeout(detectObjects, 1000);
  };

  detectObjects();
};

export default initObjectDetector;
