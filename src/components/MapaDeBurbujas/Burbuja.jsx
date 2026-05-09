import { CircleMarker, Tooltip } from 'react-leaflet';
import {
  RADIO_MAXIMO_BURBUJA,
  RADIO_MINIMO_BURBUJA,
} from '../../utils/constantes';

function calcularRadio(conteo, conteoMaximo) {
  if (conteoMaximo === 0) return RADIO_MINIMO_BURBUJA;
  return Math.max(
    RADIO_MINIMO_BURBUJA,
    Math.sqrt(conteo / conteoMaximo) * RADIO_MAXIMO_BURBUJA,
  );
}

function Burbuja({
  nombrePais,
  coordenadas,
  conteo,
  conteoMaximo,
  color,
  tipo,
  estaSeleccionado,
  onSeleccionarPais,
}) {
  const radio = calcularRadio(conteo, conteoMaximo);

  return (
    <CircleMarker
      center={coordenadas}
      radius={radio}
      bubblingMouseEvents={false}
      pathOptions={{
        fillColor: color,
        fillOpacity: 0.7,
        color: estaSeleccionado ? '#1e293b' : color,
        weight: estaSeleccionado ? 2.5 : 1,
        opacity: 0.9,
      }}
      eventHandlers={{
        click: () => onSeleccionarPais(nombrePais),
      }}
    >
      <Tooltip direction="top" offset={[0, -radio]}>
        <strong>{nombrePais}</strong>: {conteo}{' '}
        {conteo === 1 ? 'proyecto' : 'proyectos'} ({tipo})
      </Tooltip>
    </CircleMarker>
  );
}

export default Burbuja;
