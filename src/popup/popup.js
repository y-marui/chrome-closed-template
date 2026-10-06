import { initTheme } from "../shared/theme.js";
const actionBtn = document.getElementById("actionBtn");
if (actionBtn) {
  actionBtn.addEventListener("click", () => {
    console.log("Popup button clicked");
  });
}

initTheme();
