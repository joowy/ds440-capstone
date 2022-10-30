import * as React from "react";
import browser from "webextension-polyfill";

import "./styles.scss";

import { PythonShell } from "python-shell";

function runPythonCode() {
  //   return browser.tabs.create({ url });

  //   PythonShell.runString("x=1+1;print(x)", null, function (err) {
  //     if (err) throw err;
  //     console.log("finished");
  //   });

  PythonShell.run("../../test.py", null, function (err) {
    if (err) throw err;
    console.log("finished");
  });
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
