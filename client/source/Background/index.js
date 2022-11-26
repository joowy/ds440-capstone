import "emoji-log";
import browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener(() => {
  console.emoji("🦄", "extension installed");

  chrome.tabs.create({
    url: chrome.extension.getURL("options.html"),
    active: true,
  });
});
