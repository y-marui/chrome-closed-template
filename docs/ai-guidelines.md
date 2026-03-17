AI rules

- Only `shared/storage.js` and `shared/messaging.js` may call Chrome APIs. All other shared modules must remain Chrome API free.
- Background lifecycle events (`chrome.runtime.onInstalled`, etc.) may be called directly in `src/background/service-worker.js`. All other Chrome API usage must go through the shared wrappers.
