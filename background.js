
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'saveText') {
    chrome.storage.local.get('tables', (data) => {
      const tables = data.tables || [];
      if (request.tableIndex >= 0 && request.tableIndex < tables.length) {
        tables[request.tableIndex].words.push(request.text);
        chrome.storage.local.set({ tables: tables }, () => {
          sendResponse({ success: true });
        });
      } else {
        sendResponse({ success: false });
      }
    });
    return true; // Keep the message channel open for the asynchronous response
  }
});




// Add context menu item
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'openSavedWords',
    title: 'Open Saved Words',
    contexts: ['action'],
  });
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'openSavedWords') {
    chrome.tabs.create({ url: 'tables.html' });
  }
});

// Existing code for handling messages from content script
chrome.runtime.onMessage.addListener(/* ... */);

