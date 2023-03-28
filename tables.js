function createTableButton(table, index) {
  const button = document.createElement('button');
  button.classList.add('table-button');
  button.textContent = table.name;
  button.addEventListener('click', () => {
    displayTable(index);
  });
  return button;
}

function displayTable(index) {
  chrome.storage.local.get('tables', (data) => {
    const tables = data.tables || [];
    if (index >= 0 && index < tables.length) {
      const table = tables[index];
      const wordTable = document.getElementById('word-table');
      wordTable.style.display = 'table';
      // Clear previous table content
      while (wordTable.rows.length > 1) {
        wordTable.deleteRow(-1);
      }
      // Add new table content
      table.words.forEach((word) => {
        const row = wordTable.insertRow(-1);
        const cell = row.insertCell(0);
        cell.textContent = word;
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const tableButtons = document.getElementById('table-buttons');
  chrome.storage.local.get('tables', (data) => {
    const tables = data.tables || [];
    tables.forEach((table, index) => {
      const button = createTableButton(table, index);
      tableButtons.appendChild(button);
    });
  });
});

