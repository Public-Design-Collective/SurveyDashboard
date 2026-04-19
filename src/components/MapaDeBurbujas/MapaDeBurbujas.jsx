import { MapContainer, TileLayer, CircleMarker, Tooltip, useMapEvents } from 'react-leaflet';
import { COORDENADAS_PAISES } from '../../utils/coordenadasPaises';
import {
  CENTRO_MAPA,
  ZOOM_INICIAL,
  ZOOM_MINIMO,
  ZOOM_MAXIMO,
  RADIO_MAXIMO_BURBUJA,
  RADIO_MINIMO_BURBUJA,
  COLOR_PAIS_UNICO,
  COLOR_MULTIPAIS,
} from '../../utils/constantes';
import './MapaDeBurbujas.css';

const OFFSET_MULTIPAIS = [0, 1.2];

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

function Burbuja({ nombrePais, coordenadas, conteo, radio, color, tipo, estaSeleccionado, onSeleccionarPais }) {
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

function MapaDeBurbujas({
  conteosPaisUnico,
  conteosMultipais,
  conteoMaximoReferencia,
  incluirPaisUnico,
  incluirMultipais,
  paisSeleccionado,
  onSeleccionarPais,
  onDeseleccionarPais,
}) {
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

      {incluirPaisUnico &&
        Object.entries(conteosPaisUnico).map(([nombrePais, conteo]) => {
          const coordenadas = COORDENADAS_PAISES[nombrePais];
          if (!coordenadas) return null;

          return (
            <Burbuja
              key={`pu-${nombrePais}`}
              nombrePais={nombrePais}
              coordenadas={coordenadas}
              conteo={conteo}
              radio={calcularRadio(conteo, conteoMaximoReferencia)}
              color={COLOR_PAIS_UNICO}
              tipo="País-único"
              estaSeleccionado={nombrePais === paisSeleccionado}
              onSeleccionarPais={onSeleccionarPais}
            />
          );
        })}

      {incluirMultipais &&
        Object.entries(conteosMultipais).map(([nombrePais, conteo]) => {
          const coordenadas = COORDENADAS_PAISES[nombrePais];
          if (!coordenadas) return null;

          const coordenadasOffset = [
            coordenadas[0] + OFFSET_MULTIPAIS[0],
            coordenadas[1] + OFFSET_MULTIPAIS[1],
          ];

          return (
            <Burbuja
              key={`mp-${nombrePais}`}
              nombrePais={nombrePais}
              coordenadas={coordenadasOffset}
              conteo={conteo}
              radio={calcularRadio(conteo, conteoMaximoReferencia)}
              color={COLOR_MULTIPAIS}
              tipo="Multi-país"
              estaSeleccionado={nombrePais === paisSeleccionado}
              onSeleccionarPais={onSeleccionarPais}
            />
          );
        })}
    </MapContainer>
  );
}

export default MapaDeBurbujas;
