import { initBackground } from "./bootstrap.js";

initBackground();

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});
