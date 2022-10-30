import * as React from "react";

import "./styles.scss";

function runPythonCode() {
  fetch("http://localhost:8000/");
}

const Popup = () => {
  return (
    <section id="popup">
      <h2>Drowsiness.TV</h2>
      <button
        id="options__button"
        type="button"
        onClick={() => {
          return runPythonCode();
        }}
      >
        Run code
      </button>
    </section>
  );
};

export default Popup;
