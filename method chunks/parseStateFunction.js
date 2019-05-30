(function parseState() {
  const table = document.querySelector('iframe').contentWindow.document.querySelector('iframe').contentWindow.document.querySelector('.checklisttable tbody'); 
  let data = [];
  let state = {};
  for (let i = 0; row = table.rows[i]; i++) {
      let rowData = row.querySelector('.statename');
      if (rowData) {
        state = {
          nameId: rowData.innerText.slice(0, -1).split(" ").join(""),
          name: rowData.innerText.slice(0, -1),
          description: row.querySelector('.statebriefdescription').innerText,
          checklists: [] 
        }
        for (let j = i+1; nextRow = table.rows[j]; j++) {
          if (nextRow.querySelector('.checknameplaincell')) {
            state.checklists.push(nextRow.querySelector('.checknameplaincell').innerText)
          } else if (nextRow.querySelector('.checkdescell')) {
            state.checklists.push(nextRow.querySelector('.checkdescell').innerText)
          } else if (nextRow.querySelector('.checknameplaincellfull')) {
            state.checklists.push(nextRow.querySelector('.checknameplaincellfull').innerText)
          } else {
            break;
          }
        }
        data.push(state);
      }
  }
  return JSON.stringify(data, null, '   ');
})();