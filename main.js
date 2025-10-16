function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Reportes Funcionales')
    .addItem('Colorear cursos', 'handleColorearCursos')
    .addItem('Dependientes', 'handleDependientes')
    .addSeparator()
    .addItem('Limpiar Colores', 'clearColoring')
    .addToUi();
}

function handleColorearCursos() {
  try {
    const catalogo = readCatalogo();
    if (catalogo.length === 0) {
      return;
    }
    const catalogoConConteo = countRequisitos(catalogo);
    applyColor(catalogoConConteo);
    SpreadsheetApp.getUi().alert('Cursos coloreados exitosamente.');
  } catch (e) {
    SpreadsheetApp.getUi().alert('Error al colorear cursos: ' + e.message);
  }
}

function handleDependientes() {
  try {
    const catalogo = readCatalogo();
    if (catalogo.length === 0) {
      return;
    }
    const dependenciasPorCurso = findDependientes(catalogo);
    writeDependientes(dependenciasPorCurso);
    SpreadsheetApp.getUi().alert('Columna "Dependientes" actualizada.');
  } catch (e) {
    SpreadsheetApp.getUi().alert('Error al generar dependientes: ' + e.message);
  }
}