function readCatalogo() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('catalogo');
  if (!sheet) {
    throw new Error("La hoja 'catalogo' no se encontró.");
  }

  const values = sheet.getDataRange().getValues();
  
  if (!values || values.length <= 2) { 
    return [];
  }
  
  const headers = values[1]; 
  const data = values.slice(2);

  const parseRequisitos = (reqString) => {
    if (!reqString || typeof reqString !== 'string') return [];
    return reqString.split(',').map(r => r.trim()).filter(r => r.length > 0);
  };
  
  const catalogo = data.map((row, index) => {
    const course = {};
    headers.forEach((header, i) => {
      const key = header.toString().toLowerCase().replace(/[^a-z0-9]/g, ''); 
      course[key] = row[i];
    });
    
    course.requisitosparsed = parseRequisitos(course.requisitos);
    
    course.rowIndex = index + 3; 

    return course;
  });

  return catalogo;
}