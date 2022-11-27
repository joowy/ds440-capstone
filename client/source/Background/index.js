import "emoji-log";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import browser from "webextension-polyfill";

import ChromeApi from "../lib/chromApi";

browser.runtime.onInstalled.addListener(() => {
  console.emoji("🦄", "extension installed");

  //   chrome.tabs.create({
  //     url: chrome.extension.getURL("options.html"),
  //     active: true,
  //   });
});

let stream, video, model;

class Main extends ChromeApi {
  constructor() {
    super();
  }

  init = async () => {
    await tf.setBackend("webgl");

    const model_f = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    const detectorConfig = {
      runtime: "tfjs",
      solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh",
      maxFaces: 1,
    };

    model = await faceLandmarksDetection.createDetector(
      model_f,
      detectorConfig
    );

    this.setUpDetection();
    video.width = 480;
    video.height = 720;

    console.log(video);

    const predictions = await model.estimateFaces(video);

    console.log(predictions);
  };

  setUpDetection = () => {
    // start camera
    video = document.createElement("video");
    if (!!video.canPlayType && !!navigator.getUserMedia) {
      video.width = 300;
      video.height = 225;
      //   video.setAttribute("style", "visibility: hidden;");
      document.body.appendChild(video);
    } else {
      console.log("set up detection error");
      return false;
    }

    // navigator.getUserMedia(
    //   {
    //     audio: false,
    //     video: true,
    //   },

    //   (_LocalMediaStream) => {
    //     stream = _LocalMediaStream;

    //     window.URL = window.URL || window.webkitURL;
    //     video.srcObject = stream;
    //     //video.src = window.URL.createObjectURL(stream);
    //   },

    //   // errorCallback
    //   (error) => {
    //     console.log(error, "error in set up");
    //   }
    // );
  };
}

const main = new Main();
main.init();
