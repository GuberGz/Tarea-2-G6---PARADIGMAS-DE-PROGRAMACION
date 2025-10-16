function readCatalogo() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('catalogo');
  if (!sheet) {
    SpreadsheetApp.getUi().alert("Error: No se pudo encontrar la hoja 'catalogo'.");
    return []; // Devuelve una lista vacía para prevenir errores
  }

  const values = sheet.getDataRange().getValues();
  if (values.length < 3) {
    SpreadsheetApp.getUi().alert("Aviso: La hoja 'catalogo' no contiene datos suficientes.");
    return []; // Devuelve una lista vacía si no hay filas de datos
  }

  const headers = values[1];
  const dataRows = values.slice(2);

  const parseRequisitos = (reqString) => {
    if (!reqString) return [];
    return reqString.split(',').map(r => r.trim());
  };

  const catalogo = dataRows.map((row, index) => {
    const curso = {};
    headers.forEach((header, i) => {
      const key = header.toString().toLowerCase().replace(/\s+/g, '');
      curso[key] = row[i];
    });

    curso.requisitosparsed = parseRequisitos(curso.requisitos);
    curso.rowIndex = index + 3;
    return curso;
  });

  return catalogo;
}