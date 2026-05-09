import { PAISES_VALIDOS } from './constantes';

const LIMITE_PILDORA = 60;

export function dividirPorComas(valor) {
  if (!valor) return [];
  return valor
    .split(',')
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}

function tieneOracionInterna(texto) {
  const sinFinal = texto.trim().replace(/[.!?]+$/, '');
  return /[.!?]/.test(sinFinal);
}

export function autoSplit(valor) {
  const partes = dividirPorComas(valor);
  const pildoras = [];
  const parrafos = [];
  for (const parte of partes) {
    if (parte.length <= LIMITE_PILDORA && !tieneOracionInterna(parte)) {
      pildoras.push(parte);
    } else {
      parrafos.push(parte);
    }
  }
  return { pildoras, parrafos };
}

export function filtrarPaisesValidos(items) {
  return items.filter((p) => PAISES_VALIDOS.has(p));
}

export function esURL(valor) {
  return /^https?:\/\//i.test(valor.trim());
}

export function capitalizar(texto) {
  if (!texto) return texto;
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
