function updateTableSelector() {
  const tableSelector = document.getElementById('table-selector');
  tableSelector.innerHTML = '';
  chrome.storage.local.get('tables', (data) => {
    const tables = data.tables || [];
    tables.forEach((table, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = table.name;
      tableSelector.add(option);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateTableSelector();
  const createTableButton = document.getElementById('create-table');
  createTableButton.addEventListener('click', () => {
    const newTableName = document.getElementById('new-table-name').value;
    if (newTableName) {
      chrome.storage.local.get('tables', (data) => {
        const tables = data.tables || [];
        tables.push({ name: newTableName, words: [] });
        chrome.storage.local.set({ tables: tables }, () => {
          updateTableSelector();
          document.getElementById('new-table-name').value = '';
        });
      });
    }
  });
});
document.addEventListener('keypress', (event) => {
  if (event.key === 'r' || event.key === 'R') {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      const tableSelector = document.getElementById('table-selector');
      const selectedTableIndex = tableSelector.value;
      const selectedTableName = tableSelector.options[tableSelector.selectedIndex].textContent;

      chrome.runtime.sendMessage({
        action: 'saveText',
        text: selectedText,
        tableIndex: selectedTableIndex,
      }, (response) => {
        if (response.success) {
          alert(`Saved to "${selectedTableName}"`);
        } else {
          alert('Error: Failed to save word');
        }
      });
    }
  }
});

