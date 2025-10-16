function applyColor(catalogoConConteo) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('catalogo');
  const lastCol = sheet.getLastColumn();

  catalogoConConteo.forEach(curso => {
    let color;
    if (curso.cantidadRequisitos === 0) {
      color = '#d9ead3';
    } else if (curso.cantidadRequisitos === 1) {
      color = '#fff2cc';
    } else {
      color = '#f4cccc';
    }
    sheet.getRange(curso.fila, 1, 1, lastCol).setBackground(color);
  });
}

function writeDependientes(dependenciasPorCurso) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('catalogo');
  const headers = sheet.getRange(2, 1, 1, sheet.getLastColumn()).getValues()[0];
  let colIndex = headers.indexOf('Dependientes') + 1;

  if (colIndex === 0) {
    colIndex = sheet.getLastColumn() + 1;
    sheet.getRange(2, colIndex).setValue('Dependientes').setFontWeight('bold');
  }

  sheet.getRange(3, colIndex, sheet.getLastRow(), 1).clearContent();

  const codigos = sheet.getRange(3, 1, sheet.getLastRow() - 2, 1).getValues();
  const valoresAInsertar = codigos.map(row => {
    const codigo = row[0];
    return [dependenciasPorCurso[codigo] || ''];
  });

  sheet.getRange(3, colIndex, valoresAInsertar.length, 1).setValues(valoresAInsertar);
}

function clearColoring() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('catalogo');
  const range = sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns());
  range.setBackground('white');
  SpreadsheetApp.getUi().alert('Colores de fondo eliminados.');
}