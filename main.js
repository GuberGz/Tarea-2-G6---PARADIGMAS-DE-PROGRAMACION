function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Reportes Funcionales')
      .addItem('Colorear cursos', 'handleColorearCursos')
      .addItem('Dependientes', 'handleDependientes')
      .addSeparator() 
      .addItem('Limpiar Colores', 'clearColoring')
      .addToUi();
}

function handleColorearCursos() {
  try {
    const catalogo = readCatalogo();
    if (!catalogo || catalogo.length === 0) {
      SpreadsheetApp.getUi().alert('La hoja "catalogo" no contiene datos.');
      return; 
    }
    const catalogoConConteo = countRequisitos(catalogo);
    applyColor(catalogoConConteo);
    SpreadsheetApp.getUi().alert('Cursos coloreados exitosamente.');
  } catch (e) {
    SpreadsheetApp.getUi().alert('Error en Colorear cursos: ' + e.message);
  }
}

function handleDependientes() {
  try {
    const catalogo = readCatalogo();
    if (!catalogo || catalogo.length === 0) {
      SpreadsheetApp.getUi().alert('La hoja "catalogo" no contiene datos.');
      return; 
    }
    const dependenciasPorCurso = findDependientes(catalogo);
    writeDependientes(dependenciasPorCurso);
    SpreadsheetApp.getUi().alert('Columna "Dependientes" agregada exitosamente.');
  } catch (e) {
    SpreadsheetApp.getUi().alert('Error en Dependientes: ' + e.message);
  }
}