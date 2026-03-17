import { registerMessageHandlers } from "../shared/messaging.js";

export function initBackground() {
  registerMessageHandlers();
  console.log("Background initialized");
}
