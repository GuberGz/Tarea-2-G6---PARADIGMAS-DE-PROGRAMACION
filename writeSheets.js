function applyColor(catalogoConConteo) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('catalogo');
  
  if (!sheet) {
    throw new Error("La hoja 'catalogo' no se encontró.");
  }
  
  sheet.getRange(1, 1, 2, sheet.getLastColumn()).setBackground('white'); 
  
  if (!Array.isArray(catalogoConConteo) || catalogoConConteo.length === 0) {
    return;
  }
  
  const lastCol = sheet.getLastColumn();
  
  catalogoConConteo.forEach(curso => {
    
    if (curso.rowIndex <= 2) {
      return; 
    }
    
    let color;
    const numReq = curso.cantidadRequisitos;

    if (numReq === 0) {
      color = 'green'; 
    } else if (numReq === 1) {
      color = 'yellow';
    } else {
      color = 'red';
    }
    
    const rowRange = sheet.getRange(curso.rowIndex, 1, 1, lastCol);
    rowRange.setBackground(color);
  });
}

function writeDependientes(dependenciasPorCurso) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('catalogo');
  
  if (!sheet) {
    throw new Error("La hoja 'catalogo' no se encontró.");
  }
  
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();

  if (lastRow <= 1) return;

  const NUEVA_COL_HEADER = 'Dependientes';
  let nuevaColIndex = lastCol + 1;

  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const existingColIndex = headers.findIndex(h => h === NUEVA_COL_HEADER);

  if (existingColIndex !== -1) {
    nuevaColIndex = existingColIndex + 1;
  } else {
    sheet.insertColumnAfter(lastCol);
    sheet.getRange(1, nuevaColIndex).setValue(NUEVA_COL_HEADER); 
  }

  const codigos = sheet.getRange(2, 1, lastRow - 1, 1).getValues().map(row => row[0]);
  
  const valoresAInsertar = codigos.map(codigo => {
    const dependientesString = dependenciasPorCurso[codigo] || ''; 
    return [dependientesString];
  });
  
  if (valoresAInsertar.length > 0) {
    sheet.getRange(2, nuevaColIndex, valoresAInsertar.length, 1).setValues(valoresAInsertar);
  }
}

function clearColoring() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('catalogo');
  
  if (!sheet) {
    SpreadsheetApp.getUi().alert("La hoja 'catalogo' no se encontró.");
    return;
  }

  const rangeToClear = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn());
  rangeToClear.setBackground('white');
  
  SpreadsheetApp.getUi().alert('Colores de fondo eliminados exitosamente.');
}