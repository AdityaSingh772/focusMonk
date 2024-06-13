chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "openOptionsPage") {
      chrome.tabs.create({ url: "options.html" });
    } else if (request.action === "startTimer") {
      const time = request.time;
      const blockedSites = request.blockedSites;
  
      chrome.storage.sync.set({ time, blockedSites }, function () {
        alert("Timer started");
      });
  
      const startTime = new Date().getTime();
      const endTime = startTime + time * 60 * 1000;
  
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: blockedSites.map((site, index) => ({
          id: index + 1,
          priority: 1,
          action: { type: "block" },
          condition: { urlFilter: site, resourceTypes: ["main_frame"] }
        }))
      });
  
      setTimeout(function () {
        chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: blockedSites.map((_, index) => index + 1) });
      }, endTime - startTime);
    }
  });
  
  chrome.storage.sync.get(["time", "blockedSites"], function (items) {
    const time = items.time || 30;
    const blockedSites = items.blockedSites || ["facebook.com", "twitter.com", "instagram.com"];
  
    chrome.contextMenus.create({
      id: "focus-mode-menu",
      title: "Start Focus Mode",
      contexts: ["page"]
    });
  
    chrome.contextMenus.onClicked.addListener(function (info, tab) {
      if (info.menuItemId === "focus-mode-menu") {
        chrome.runtime.sendMessage({ action: "startTimer", time, blockedSites });
      }
    });
  });