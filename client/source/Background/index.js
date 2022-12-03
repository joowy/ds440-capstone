import "emoji-log";
import browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener(() => {
  console.emoji("🦄", "extension installed");
});

const listOfSites = ["youtube.com/watch?", "netflix.com", "hulu.com/watch"];

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    activateCV(tab.url);
  });
});

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
  if (tab.active && change.url) {
    activateCV(tab.url);
  }
});

const activateCV = async (currentTab) => {
  console.log(typeof currentTab, currentTab);
  chrome.storage.local.get("drowsinessTVActive", async function (data) {
    if (data["drowsinessTVActive"]) {
      for (const site of listOfSites) {
        if (currentTab.includes(site)) {
          await fetch("http://localhost:8000/");
          chrome.storage.local.set({ drowsinessTVActive: false });
        }
      }
    }
  });
};
