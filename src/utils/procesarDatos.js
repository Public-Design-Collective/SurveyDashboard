import { PAISES_VALIDOS } from './constantes';

function extraerPaises(texoPaisImplementacion) {
  if (!texoPaisImplementacion) return [];

  return texoPaisImplementacion
    .split(',')
    .map((pais) => pais.trim())
    .filter((pais) => PAISES_VALIDOS.has(pais));
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

export function calcularMetricasGlobales(filas) {
  let proyectosPaisUnico = 0;
  let proyectosMultipais = 0;
  const paisesPaisUnico = new Set();
  const paisesMultipais = new Set();

  for (const fila of filas) {
    const paises = extraerPaises(fila.paisImplementacion);
    if (fila.clasificacion === 'País-único') {
      proyectosPaisUnico++;
      for (const pais of paises) paisesPaisUnico.add(pais);
    } else {
      proyectosMultipais++;
      for (const pais of paises) paisesMultipais.add(pais);
    }
  }

  return {
    proyectosPaisUnico,
    proyectosMultipais,
    paisesConPaisUnico: paisesPaisUnico.size,
    paisesConMultipais: paisesMultipais.size,
  };
}

export function calcularMetricasPais(filas, nombrePais) {
  let proyectosPaisUnico = 0;
  let proyectosMultipais = 0;

  for (const fila of filas) {
    const paises = extraerPaises(fila.paisImplementacion);
    if (!paises.includes(nombrePais)) continue;

    if (fila.clasificacion === 'País-único') {
      proyectosPaisUnico++;
    } else {
      proyectosMultipais++;
    }
  }

  return { proyectosPaisUnico, proyectosMultipais };
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
