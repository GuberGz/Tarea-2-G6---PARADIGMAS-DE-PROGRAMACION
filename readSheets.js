function readCatalogo() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('catalogo');
  if (!sheet) {
    SpreadsheetApp.getUi().alert("Error: No se pudo encontrar la hoja 'catalogo'.");
    return [];
  }

  const values = sheet.getDataRange().getValues();
  if (values.length < 3) {
    SpreadsheetApp.getUi().alert("Aviso: La hoja 'catalogo' no contiene datos suficientes.");
    return [];
  }

  const headers = values[1];
  const catalogo = [];

  const parseRequisitos = (reqString) => {
    if (!reqString) return [];
    return reqString.split(',').map(r => r.trim()).filter(r => r.length > 0);
  };

  for (let i = 2; i < values.length; i++) {
    const row = values[i];
    const codigoCurso = row[0];

    if (codigoCurso && codigoCurso.toString().trim().length > 0) {
      const curso = {};
      headers.forEach((header, j) => {
        const key = header.toString().toLowerCase().replace(/\s+/g, '');
        curso[key] = row[j];
      });

      curso.requisitosparsed = parseRequisitos(curso.requisitos);
      curso.fila = i + 1; // Asigna el número de fila real
      catalogo.push(curso);
    }
  }

  return catalogo;
}