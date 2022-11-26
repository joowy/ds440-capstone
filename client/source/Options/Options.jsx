import * as React from "react";

import "./styles.scss";

const onSuccess = () => {};

const onFail = () => {
  alert("could not connect to stream. Please allow camera permission!");
};

const init = () => {
  if (navigator.webkitGetUserMedia) {
    navigator.webkitGetUserMedia(
      { video: true, audio: true },
      onSuccess,
      onFail
    );
  } else {
    alert("Camera is not available");
  }
};

const Options = () => {
  React.useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <form>
        <p>
          <label htmlFor="username">Your Name</label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            spellCheck="false"
            autoComplete="off"
            required
          />
        </p>
        <p>
          <label htmlFor="logging">
            <input type="checkbox" name="logging" /> Show the features enabled
            on each page in the console
          </label>
        </p>
      </form>
    </div>
  );
};

export default Options;
