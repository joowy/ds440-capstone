import "emoji-log";
import browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener(() => {
  console.emoji("🦄", "extension installed");
});

let currentTab;

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    // currentTab = tab.url;
    activateCV(tab.url);
  });
});

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
  if (tab.active && change.url) {
    // currentTab = tab.url;
    activateCV(tab.url);
  }
});

const activateCV = (currentTab) => {
  console.log(currentTab);
  if (currentTab == "") {
    fetch("http://localhost:8000/");
  }
};

// class main {
//   constructor() {}

//   init = async () => {

//     console.log("current tab?" + currentTab);
//     if (currentTab == "https://www.youtube.com/") {
//       console.log("er");
//     } else {
//       console.log("asd");
//     }
//   };
// }

// const app = new main();
// app.init().catch(() => {});
