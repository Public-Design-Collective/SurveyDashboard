import { MapContainer, TileLayer, CircleMarker, Tooltip, useMapEvents } from 'react-leaflet';
import { COORDENADAS_PAISES } from '../../utils/coordenadasPaises';
import {
  CENTRO_MAPA,
  ZOOM_INICIAL,
  ZOOM_MINIMO,
  ZOOM_MAXIMO,
  RADIO_MAXIMO_BURBUJA,
  RADIO_MINIMO_BURBUJA,
  COLOR_BURBUJA,
  COLOR_BURBUJA_SELECCIONADA,
} from '../../utils/constantes';
import './MapaDeBurbujas.css';

function calcularRadio(conteo, conteoMaximo) {
  if (conteoMaximo === 0) return RADIO_MINIMO_BURBUJA;
  return Math.max(
    RADIO_MINIMO_BURBUJA,
    Math.sqrt(conteo / conteoMaximo) * RADIO_MAXIMO_BURBUJA
  );
}

function ClickFueraDeBurbujas({ onDeseleccionar }) {
  useMapEvents({
    click: () => onDeseleccionar(),
  });
  return null;
}

function MapaDeBurbujas({ conteosPorPais, conteoMaximoReferencia, paisSeleccionado, onSeleccionarPais, onDeseleccionarPais }) {
  const paises = Object.entries(conteosPorPais);

  return (
    <MapContainer
      center={CENTRO_MAPA}
      zoom={ZOOM_INICIAL}
      minZoom={ZOOM_MINIMO}
      maxZoom={ZOOM_MAXIMO}
      className="mapa-leaflet"
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <ClickFueraDeBurbujas onDeseleccionar={onDeseleccionarPais} />
      {paises.map(([nombrePais, conteo]) => {
        const coordenadas = COORDENADAS_PAISES[nombrePais];
        if (!coordenadas) return null;

        const estaSeleccionado = nombrePais === paisSeleccionado;
        const radio = calcularRadio(conteo, conteoMaximoReferencia);

        return (
          <CircleMarker
            key={nombrePais}
            center={coordenadas}
            radius={radio}
            bubblingMouseEvents={false}
            pathOptions={{
              fillColor: estaSeleccionado ? COLOR_BURBUJA_SELECCIONADA : COLOR_BURBUJA,
              fillOpacity: 0.6,
              color: estaSeleccionado ? COLOR_BURBUJA_SELECCIONADA : COLOR_BURBUJA,
              weight: 1,
              opacity: 0.8,
            }}
            eventHandlers={{
              click: () => onSeleccionarPais(nombrePais),
            }}
          >
            <Tooltip direction="top" offset={[0, -radio]}>
              <strong>{nombrePais}</strong>: {conteo}{' '}
              {conteo === 1 ? 'proyecto' : 'proyectos'}
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}

export default MapaDeBurbujas;
