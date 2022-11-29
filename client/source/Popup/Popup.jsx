import * as React from "react";
import "./styles.scss";
// import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import Switch from "react-switch";

const Popup = () => {
  const [check, setCheck] = React.useState(false);

  React.useEffect(() => {
    chrome.storage.local.get("drowsinessTVActive", function (data) {
      setCheck(data["drowsinessTVActive"]);
    });
  }, [check]);

  const handleSwitch = () => {
    setCheck(!check);
    chrome.storage.local.set({ drowsinessTVActive: !check }, function () {});
  };

  return (
    <section id="popup">
      <h2>Drowsiness.TV</h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Switch onChange={handleSwitch} checked={check} />
      </div>
    </section>
  );
};

export default Popup;
