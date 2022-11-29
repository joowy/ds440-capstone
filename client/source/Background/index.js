import "emoji-log";
import browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener(() => {
  console.emoji("🦄", "extension installed");
});

const listOfSites = ["youtube.com/watch?", "netflix.com", "hulu.com/watch"];

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

const activateCV = async (currentTab) => {
  console.log(typeof currentTab, currentTab);
  for (const site of listOfSites) {
    console.log(currentTab.includes(site));
    if (currentTab.includes(site)) {
      await fetch("http://localhost:8000/");
    }
  }
};
