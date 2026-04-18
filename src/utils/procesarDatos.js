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

export function obtenerProyectosPorPais(filas, nombrePais, incluirMultipais) {
  const filasActivas = filtrarPorClasificacion(filas, incluirMultipais);

  return filasActivas.filter((fila) => {
    const paises = extraerPaises(fila.paisImplementacion);
    return paises.includes(nombrePais);
  });
}
