function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.position = 'fixed';
  notification.style.zIndex = '10000';
  notification.style.top = '20px';
  notification.style.right = '20px';
  notification.style.backgroundColor = 'white';
  notification.style.border = '1px solid black';
  notification.style.padding = '10px';
  notification.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    document.body.removeChild(notification);
  }, 2000);
}

document.addEventListener('keypress', (event) => {
  if (event.key === 'r' || event.key === 'R') {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      chrome.runtime.sendMessage(
        {
          action: 'saveText',
          text: selectedText,
        },
        }
      );
    }
  }
});

