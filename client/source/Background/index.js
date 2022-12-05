import "emoji-log";
import browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener(() => {
  console.emoji("🦄", "extension installed");
  window.open("http://127.0.0.1:5500/PROJECT/Index.html");
});

// list of supported sites
const listOfSites = [
  "youtube.com/watch?",
  "netflix.com",
  "hulu.com/watch",
  "disneyplus.com",
  "amazon.com/Prime-Video/b?",
  "amazon.com/gp/video/",
];

// check if navigated to supported site
chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    activateCV(tab.url);
  });
});

// check if navigated to supported site
chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
  if (tab.active && change.url) {
    activateCV(tab.url);
  }
});

const activateCV = async (currentTab) => {
  // set extension active
  chrome.storage.local.get("drowsinessTVActive", async function (data) {
    if (data["drowsinessTVActive"]) {
      for (const site of listOfSites) {
        if (currentTab.includes(site)) {
          // call express server
          await fetch("http://localhost:8000/");
          //   set extension not active
          chrome.storage.local.set({ drowsinessTVActive: false });
        }
      }
    }
  });
};
