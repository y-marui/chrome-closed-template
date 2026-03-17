import { MESSAGE_TYPES } from "./message-types.js";

export function sendMessage(type, payload = {}) {
  return chrome.runtime.sendMessage({ type, payload });
}

export function registerMessageHandlers() {
  chrome.runtime.onMessage.addListener((msg, _sender, _sendResponse) => {
    switch (msg.type) {
      case MESSAGE_TYPES.EXAMPLE_ACTION:
        console.log("Example action received");
        break;
      default:
        console.warn("Unknown message:", msg.type);
    }
  });
}
