/**
 * @param {string} key
 * @returns {Promise<any>} Stored value, or undefined if the key does not exist.
 */
export async function get(key) {
  const result = await chrome.storage.local.get(key);
  return result[key];
}

/**
 * @param {string} key
 * @param {any} value
 * @returns {Promise<void>}
 */
export async function set(key, value) {
  await chrome.storage.local.set({ [key]: value });
}
