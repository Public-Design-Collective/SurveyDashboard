import { PAISES_VALIDOS } from './constantes';

function extraerPaises(texoPaisImplementacion) {
  if (!texoPaisImplementacion) return [];

  return texoPaisImplementacion
    .split(',')
    .map((pais) => pais.trim())
    .filter((pais) => PAISES_VALIDOS.has(pais));
}

function extraerInstituciones(fila) {
  return [fila.nombreInstitucion_1, fila.nombreInstitucion_2, fila.nombreInstitucion_3]
    .map((v) => (typeof v === 'string' ? v.trim() : ''))
    .filter(Boolean);
}

function filtrarPorClasificacion(filas, incluirMultipais) {
  if (incluirMultipais) return filas;
  return filas.filter((fila) => fila.clasificacion === 'País-único');
}

export function contarProyectosPorPais(filas, incluirMultipais) {
  const filasActivas = filtrarPorClasificacion(filas, incluirMultipais);
  const conteos = {};

  for (const fila of filasActivas) {
    const paises = extraerPaises(fila.paisImplementacion);
    for (const pais of paises) {
      conteos[pais] = (conteos[pais] || 0) + 1;
    }
  }

  return conteos;
}

export function calcularMetricasGlobales(filas, filasParticipantes = []) {
  let proyectosPaisUnico = 0;
  let proyectosMultipais = 0;
  const paisesPaisUnico = new Set();
  const paisesMultipais = new Set();
  const institucionesPaisUnico = new Set();
  const institucionesMultipais = new Set();
  const participantesQueReportaronProyectos = new Set();

  for (const fila of filas) {
    const paises = extraerPaises(fila.paisImplementacion);
    const instituciones = extraerInstituciones(fila);
    if (fila.clasificacion === 'País-único') {
      proyectosPaisUnico++;
      for (const pais of paises) paisesPaisUnico.add(pais);
      for (const inst of instituciones) institucionesPaisUnico.add(inst);
    } else {
      proyectosMultipais++;
      for (const pais of paises) paisesMultipais.add(pais);
      for (const inst of instituciones) institucionesMultipais.add(inst);
    }
    if (fila.participanteID) participantesQueReportaronProyectos.add(fila.participanteID);
  }

  const participantesQueNacieron = new Set();
  const participantesQueResiden = new Set();
  for (const fila of filasParticipantes) {
    if (!fila.participanteID) continue;
    const nacimiento = (fila.paisNacimiento || '').trim();
    const residencia = (fila.paisResidencia || '').trim();
    if (PAISES_VALIDOS.has(nacimiento)) participantesQueNacieron.add(fila.participanteID);
    if (PAISES_VALIDOS.has(residencia)) participantesQueResiden.add(fila.participanteID);
  }

  return {
    proyectosPaisUnico,
    proyectosMultipais,
    paisesConPaisUnico: paisesPaisUnico.size,
    paisesConMultipais: paisesMultipais.size,
    institucionesPaisUnico: institucionesPaisUnico.size,
    institucionesMultipais: institucionesMultipais.size,
    participantesQueReportaronProyectos: participantesQueReportaronProyectos.size,
    participantesQueNacieron: participantesQueNacieron.size,
    participantesQueResiden: participantesQueResiden.size,
  };
}

export function calcularMetricasPais(filas, nombrePais, filasParticipantes = []) {
  let proyectosPaisUnico = 0;
  let proyectosMultipais = 0;
  const institucionesPaisUnico = new Set();
  const institucionesMultipais = new Set();
  const participantesQueReportaronProyectos = new Set();

  for (const fila of filas) {
    const paises = extraerPaises(fila.paisImplementacion);
    if (!paises.includes(nombrePais)) continue;

    const instituciones = extraerInstituciones(fila);
    if (fila.clasificacion === 'País-único') {
      proyectosPaisUnico++;
      for (const inst of instituciones) institucionesPaisUnico.add(inst);
    } else {
      proyectosMultipais++;
      for (const inst of instituciones) institucionesMultipais.add(inst);
    }
    if (fila.participanteID) participantesQueReportaronProyectos.add(fila.participanteID);
  }

  const participantesQueNacieron = new Set();
  const participantesQueResiden = new Set();
  for (const fila of filasParticipantes) {
    if (!fila.participanteID) continue;
    const nacimiento = (fila.paisNacimiento || '').trim();
    const residencia = (fila.paisResidencia || '').trim();
    if (nacimiento === nombrePais) participantesQueNacieron.add(fila.participanteID);
    if (residencia === nombrePais) participantesQueResiden.add(fila.participanteID);
  }

  return {
    proyectosPaisUnico,
    proyectosMultipais,
    institucionesPaisUnico: institucionesPaisUnico.size,
    institucionesMultipais: institucionesMultipais.size,
    participantesQueReportaronProyectos: participantesQueReportaronProyectos.size,
    participantesQueNacieron: participantesQueNacieron.size,
    participantesQueResiden: participantesQueResiden.size,
  };
}

export function calcularDatosExperiencia(filas, filasParticipantes, nombrePais) {
  const proyectosEnAlcance = nombrePais
    ? filas.filter((f) => extraerPaises(f.paisImplementacion).includes(nombrePais))
    : filas;

  const clasificacionesPorParticipante = new Map();
  for (const fila of proyectosEnAlcance) {
    if (!fila.participanteID) continue;
    let set = clasificacionesPorParticipante.get(fila.participanteID);
    if (!set) {
      set = new Set();
      clasificacionesPorParticipante.set(fila.participanteID, set);
    }
    set.add(fila.clasificacion);
  }

  const conteoExpLaboralPaisUnico = {};
  const conteoExpLaboralMultipais = {};
  const conteoExpSectorPublicoPaisUnico = {};
  const conteoExpSectorPublicoMultipais = {};

  for (const fila of filasParticipantes) {
    if (!fila.participanteID) continue;
    const clasificaciones = clasificacionesPorParticipante.get(fila.participanteID);
    if (!clasificaciones) continue;

    for (const clasif of clasificaciones) {
      const esPaisUnico = clasif === 'País-único';
      if (fila.expLaboral) {
        const destino = esPaisUnico ? conteoExpLaboralPaisUnico : conteoExpLaboralMultipais;
        destino[fila.expLaboral] = (destino[fila.expLaboral] || 0) + 1;
      }
      if (fila.expSectorPublico) {
        const destino = esPaisUnico ? conteoExpSectorPublicoPaisUnico : conteoExpSectorPublicoMultipais;
        destino[fila.expSectorPublico] = (destino[fila.expSectorPublico] || 0) + 1;
      }
    }
  }

  return {
    conteoExpLaboralPaisUnico,
    conteoExpLaboralMultipais,
    conteoExpSectorPublicoPaisUnico,
    conteoExpSectorPublicoMultipais,
  };
}

export function contarProyectosPorPaisDesglosado(filas) {
  const paisUnico = {};
  const multipais = {};

  for (const fila of filas) {
    const paises = extraerPaises(fila.paisImplementacion);
    const destino = fila.clasificacion === 'País-único' ? paisUnico : multipais;
    for (const pais of paises) {
      destino[pais] = (destino[pais] || 0) + 1;
    }
  }

  return { paisUnico, multipais };
}

export function calcularDatosGraficosDesglosados(filas, nombrePais) {
  let filasActivas = filas;

  if (nombrePais) {
    filasActivas = filas.filter((fila) => {
      const paises = extraerPaises(fila.paisImplementacion);
      return paises.includes(nombrePais);
    });
  }

  const conteoRolPaisUnico = {};
  const conteoRolMultipais = {};
  const conteoTipoInstitucionPaisUnico = {};
  const conteoTipoInstitucionMultipais = {};

  for (const fila of filasActivas) {
    const esPaisUnico = fila.clasificacion === 'País-único';

    if (fila.rol) {
      const destino = esPaisUnico ? conteoRolPaisUnico : conteoRolMultipais;
      destino[fila.rol] = (destino[fila.rol] || 0) + 1;
    }
    if (fila.tipoInstitucion) {
      const destino = esPaisUnico ? conteoTipoInstitucionPaisUnico : conteoTipoInstitucionMultipais;
      destino[fila.tipoInstitucion] = (destino[fila.tipoInstitucion] || 0) + 1;
    }
  }

  return {
    conteoRolPaisUnico,
    conteoRolMultipais,
    conteoTipoInstitucionPaisUnico,
    conteoTipoInstitucionMultipais,
  };
}

export function obtenerProyectosPorPais(filas, nombrePais, incluirPaisUnico, incluirMultipais) {
  return filas.filter((fila) => {
    const paises = extraerPaises(fila.paisImplementacion);
    if (!paises.includes(nombrePais)) return false;

    const esPaisUnico = fila.clasificacion === 'País-único';
    if (esPaisUnico && !incluirPaisUnico) return false;
    if (!esPaisUnico && !incluirMultipais) return false;
    return true;
  });
}
