document.addEventListener("DOMContentLoaded", function () {
    const timeInput = document.getElementById("time");
    const blockedSitesInput = document.getElementById("blocked-sites");
    const saveButton = document.getElementById("save-options");
  
    saveButton.addEventListener("click", function () {
      const time = parseInt(timeInput.value);
      const blockedSites = blockedSitesInput.value
        .split(',')
        .map(site => site.trim())
        .filter(site => site !== '');
      
  
      chrome.storage.sync.set({ time, blockedSites }, function () {
        alert("Options saved");
      });
    });
  
    chrome.storage.sync.get(["time", "blockedSites"], function (items) {
      timeInput.value = items.time || 30;
      blockedSitesInput.value = items.blockedSites.join(",") || "facebook.com, twitter.com, instagram.com";
    });
  });