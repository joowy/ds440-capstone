import * as React from "react";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import Webcam from "react-webcam";

import "./styles.scss";

// function runPythonCode() {
//   fetch("http://localhost:8000/");
// }

const Popup = () => {
  //   const [captureVideo, setCaptureVideo] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(0);
  const [text, setText] = React.useState("not detecting");

  const [count, setCount] = React.useState(0);
  const [model, setModels] = React.useState(null);

  const [maxLeft, setMaxLeft] = React.useState(0);
  const [maxRight, setMaxRight] = React.useState(0);

  const videoRef = React.useRef();

  React.useEffect(() => {
    const loadModels = async () => {
      await tf.setBackend("webgl");

      const model_f = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
      const detectorConfig = {
        runtime: "tfjs",
        solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh",
        maxFaces: 1,
      };

      const net = await faceLandmarksDetection.createDetector(
        model_f,
        detectorConfig
      );
      console.log(net);
      setModels(net);
    };
    if (model === null) {
      loadModels().catch(console.error);
    }
    console.log(model);
    console.log("models loaded");
  }, [model]);

  const calculateDistance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  };
  const detectBlink = () => {
    // point around left eye
    const leftEye_left = 263;
    const leftEye_right = 362;
    const leftEye_top = 386;
    const leftEye_bottom = 374;
    // point around right eye
    const rightEye_left = 133;
    const rightEye_right = 33;
    const rightEye_top = 159;
    const rightEye_bottom = 145;

    const leftVertical = calculateDistance(
      keyPoints[leftEye_top][0],
      keyPoints[leftEye_top][1],
      keyPoints[leftEye_bottom][0],
      keyPoints[leftEye_bottom][1]
    );
    const leftHorizontal = calculateDistance(
      keyPoints[leftEye_left][0],
      keyPoints[leftEye_left][1],
      keyPoints[leftEye_right][0],
      keyPoints[leftEye_right][1]
    );
    const eyeLeft = leftVertical / (2 * leftHorizontal);

    const rightVertical = calculateDistance(
      keyPoints[rightEye_top][0],
      keyPoints[rightEye_top][1],
      keyPoints[rightEye_bottom][0],
      keyPoints[rightEye_bottom][1]
    );
    const rightHorizontal = calculateDistance(
      keyPoints[rightEye_left][0],
      keyPoints[rightEye_left][1],
      keyPoints[rightEye_right][0],
      keyPoints[rightEye_right][1]
    );
    const eyeRight = rightVertical / (2 * rightHorizontal);

    // TODO :: Need more efficient implmentation
    const baseCloseEye = 0.1;
    const limitOpenEye = 0.14;
    if (maxLeft < eyeLeft) {
      setMaxLeft(eyeLeft);
    }
    if (maxRight < eyeRight) {
      setMaxRight(eyeRight);
    }

    let result = false;
    if (maxLeft > limitOpenEye && maxRight > limitOpenEye) {
      if (eyeLeft < baseCloseEye && eyeRight < baseCloseEye) {
        result = true;
      }
    }
    console.log(result, "here1");

    return result;
  };

  const detectPoints = async () => {
    if (
      typeof videoRef.current !== "undefined" &&
      videoRef.current !== null
      //  &&  videoRef.current.video.readyState === 4
    ) {
      const video = await videoRef.current.video;

      const videoWidth = videoRef.current.video.videoWidth;
      const videoHeight = videoRef.current.video.videoHeight;

      video.width = 480;
      video.height = 720;

      console.log(video);
      const predictions = await model.estimateFaces(video);
      console.log(predictions);
    } else {
      console.log(videoRef.current.video.readyState);
      console.log("camera cannot be used");
    }

    if (predictions.length > 0) {
      // Somente 1 face
      const keyPoints = predictions[0].scaledMesh;
      if (detectBlink(keyPoints)) {
        // TODO :: Found blink, do someting
        const countN = count + 1;
        setCount(countN);
        if (!isOpen) {
          // stop detection
          setText("not detecting");
          return null;
        }
      }
    } else {
      setMaxLeft(0);
      setMaxRight(0);
    }

    setTimeout(async () => {
      await detectPoints();
    }, 40);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
    setCount(isOpen ? count : 0);
    console.log(model, "onclick");
    if (!isOpen) {
      setTimeout(() => {
        setText("detecting");
        detectPoints();
      }, 2000);
    }
  };

  const videoConstraints = {
    width: 720,
    height: 480,
    // facingMode: "user",
    facingMode: "environment",
  };

  return (
    <section id="popup">
      <h2>Drowsiness.TV</h2>
      {/* <button
        id="options__button"
        type="button"
        onClick={() => {
          return runPythonCode();
        }}
      >
        Run code
      </button> */}

      <button
        id="camera_button"
        type="button"
        onClick={() => {
          handleClick();
        }}
      >
        Start video
        <b> {text} </b>
        <b> :: Count blink = {count} d</b>
      </button>
      {/* <Webcam /> */}
      {isOpen ? (
        <Webcam
          audio={false}
          ref={videoRef}
          height={480}
          width={720}
          videoConstraints={videoConstraints}
          screenshotFormat="image/jpeg"
          screenshotQuality={1}
        />
      ) : null}
    </section>
  );
};

export default Popup;
