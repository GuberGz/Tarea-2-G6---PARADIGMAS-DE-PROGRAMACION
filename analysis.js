
function countRequisitos(catalogo) {
  if (!Array.isArray(catalogo)) {
      return [];
  }
    
  return catalogo.map(curso => ({
    ...curso, 
    cantidadRequisitos: (curso.requisitosparsed && Array.isArray(curso.requisitosparsed)) ? curso.requisitosparsed.length : 0
  }));
}

function findDependientes(catalogo) {
  if (!Array.isArray(catalogo)) {
      return {};
  }
    
  const dependientesMap = catalogo.reduce((acc, curso) => {
    acc[curso.codigo] = [];
    return acc;
  }, {});

  catalogo.forEach(cursoDependiente => {
    if (cursoDependiente.requisitosparsed && Array.isArray(cursoDependiente.requisitosparsed)) {
      cursoDependiente.requisitosparsed.forEach(requisitoStr => {
        const codigoRequisitoLimpio = requisitoStr.split('(')[0].split('o')[0].trim(); 
        
        if (dependientesMap.hasOwnProperty(codigoRequisitoLimpio)) {
          dependientesMap[codigoRequisitoLimpio].push(cursoDependiente.curso);
        }
      });
    }
  });

  const resultadoFormateado = {};
  for (const codigo in dependientesMap) {
    resultadoFormateado[codigo] = dependientesMap[codigo].join(', ');
  }
  
  return resultadoFormateado;
}
