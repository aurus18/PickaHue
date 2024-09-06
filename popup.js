const btn = document.querySelector("#colorBtn");
const resultElement = document.getElementById("result");
const resultClr = document.getElementById("resultColor");
const copyBtn = document.getElementById("copyBtn");

// Add a single event listener to the button
btn.addEventListener("click", async () => {

  
  // Get the active tab in the current window
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Check if the browser supports the EyeDropper API
  if (!window.EyeDropper) {
    resultElement.textContent =
      "Your browser does not support the EyeDropper API";
    return;
  }

  const eyeDropper = new EyeDropper();

  eyeDropper
    .open()
    .then((result) => {
      resultElement.textContent = result.sRGBHex;
      resultClr.style.backgroundColor = result.sRGBHex;

      //show the result elements
      resultElement.classList.remove("hidden");
      resultClr.classList.remove("hidden");
      copyBtn.classList.remove("hidden");

      // adding eventListener to the copy button
      copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(result.sRGBHex).then(() => { // Copying the srbghex code to the clipboard
          console.log("Hex code copied to clipboard");
        }, () => {
          console.log("Failed to copy hex code to clipboard");
        });
      });
    })
    .catch((e) => {
      resultElement.textContent = e;
    });
});