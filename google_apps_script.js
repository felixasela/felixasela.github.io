// 1. Ve a https://script.google.com/
// 2. Crea un Nuevo Proyecto o Actualiza el existente
// 3. Pega este código
// 4. Implementar -> Nueva implementación -> Aplicación web -> Quién puede acceder: "Cualquier persona" -> Copiar URL

function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const allSheets = ss.getSheets();
  const response = {
    title: ss.getName(),
    sheets: {}
  };

  allSheets.forEach(sheet => {
    const sheetName = sheet.getName();
    const data = sheet.getDataRange().getDisplayValues(); 
    
    // Intentar detectar encabezados en Fila 1 o Fila 2
    let headerRowIdx = 0;
    if (data.length > 1 && data[1].join("").length > data[0].join("").length) {
      headerRowIdx = 1; 
    }

    const headers = data[headerRowIdx].map(h => h.toString().trim());
    const rows = [];

    const startIdx = headerRowIdx + 1;
    for (let i = startIdx; i < data.length; i++) {
      const row = data[i];
      const obj = {};
      let hasData = false;
      for (let j = 0; j < headers.length; j++) {
        if (headers[j]) {
          obj[headers[j]] = row[j];
          if (row[j] && row[j].toString().trim().length > 0) hasData = true;
        }
      }
      if (hasData) rows.push(obj);
    }

    if (rows.length > 0 || data.length > 0) {
      response.sheets[sheetName] = {
        headers: headers,
        rows: rows
      };
    }
  });

  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
    return ContentService.createTextOutput(JSON.stringify({status: "read-only"}))
      .setMimeType(ContentService.MimeType.JSON);
}
