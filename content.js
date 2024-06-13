document.addEventListener("DOMContentLoaded", function () {
    const htmlFile = document.getElementById("html-file");
    htmlFile.addEventListener("click", function () {
      chrome.runtime.sendMessage({ action: "openOptionsPage"});
    });
  });