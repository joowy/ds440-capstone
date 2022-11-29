import * as React from "react";
import "./styles.scss";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";

function runPythonCode() {
  fetch("http://localhost:8000/");
}

// let page = chrome.extension.getBackgroundPage();

const Popup = () => {
  let currentTab = "no tab";

  //   chrome.tabs.query({ active: true, audible: true }, (tabs) => {
  //     currentTab = tabs[0].url;
  //     // use `url` here inside the callback because it's asynchronous!
  //     console.log(currentTab);
  //   });

  const [check, setCheck] = React.useState(false);

  console.log("here");
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
        Run code {currentTab} 
      </button> */}
      <ToggleSwitch label={" "} check={check} setCheck={setCheck} />
    </section>
  );
};

export default Popup;
