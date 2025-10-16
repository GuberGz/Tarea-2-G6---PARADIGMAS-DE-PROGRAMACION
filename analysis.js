function countRequisitos(catalogo) {
  return catalogo.map(curso => ({
    ...curso,
    cantidadRequisitos: curso.requisitosparsed.length
  }));
}

function findDependientes(catalogo) {
  const nameToCodeMap = {};
  const dependientesMap = {};

  catalogo.forEach(curso => {
    nameToCodeMap[curso.curso.trim()] = curso.codigo;
    dependientesMap[curso.codigo] = [];
  });

  catalogo.forEach(cursoDependiente => {
    cursoDependiente.requisitosparsed.forEach(requisitoNombre => {
      const nombreLimpio = requisitoNombre.split('(')[0].trim();
      const codigoRequisito = nameToCodeMap[nombreLimpio];

      if (codigoRequisito && dependientesMap[codigoRequisito]) {
        dependientesMap[codigoRequisito].push(cursoDependiente.curso);
      }
    });
  });

  for (const codigo in dependientesMap) {
    dependientesMap[codigo] = dependientesMap[codigo].join(', ');
  }

  return dependientesMap;
}