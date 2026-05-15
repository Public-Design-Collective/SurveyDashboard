import {
  MapContainer,
  TileLayer,
  ZoomControl,
  useMapEvents,
} from "react-leaflet";
import { COORDENADAS_PAISES } from "../../utils/coordenadasPaises";
import {
  CENTRO_MAPA,
  ZOOM_INICIAL,
  ZOOM_MINIMO,
  ZOOM_MAXIMO,
  COLOR_PAIS_UNICO,
  COLOR_MULTIPAIS,
} from "../../utils/constantes";
import Burbuja from "./Burbuja";
import MarcadoresDetalle from "./MarcadoresDetalle";
import "./MapaDeBurbujas.css";

const OFFSET_MULTIPAIS = [0, 1.2];

function ClickFueraDeBurbujas({ onDeseleccionar }) {
  useMapEvents({
    click: () => onDeseleccionar(),
  });
  return null;
}

function calcularBanderasFallback(proyectoDetalle) {
  if (!proyectoDetalle) {
    return { participanteDesconocido: false, implementacionDesconocido: false };
  }
  const paisIndividuo = (proyectoDetalle.paisIndividuo || "").trim();
  const paisesImpl = (proyectoDetalle.paisImplementacion || "")
    .split(",")
    .map((p) => p.trim())
    .filter((p) => COORDENADAS_PAISES[p]);
  return {
    participanteDesconocido: !COORDENADAS_PAISES[paisIndividuo],
    implementacionDesconocido: paisesImpl.length === 0,
  };
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
  proyectoDetalle,
}) {
  const enModoDetalle = Boolean(proyectoDetalle);
  const { participanteDesconocido, implementacionDesconocido } =
    calcularBanderasFallback(proyectoDetalle);

  return (
    <>
      <MapContainer
        center={CENTRO_MAPA}
        zoom={ZOOM_INICIAL}
        minZoom={ZOOM_MINIMO}
        maxZoom={ZOOM_MAXIMO}
        className="mapa-leaflet"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
        />
        <ZoomControl position="bottomright" />

        {enModoDetalle ? (
          <MarcadoresDetalle proyecto={proyectoDetalle} />
        ) : (
          <>
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
                    conteoMaximo={conteoMaximoReferencia}
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
                    conteoMaximo={conteoMaximoReferencia}
                    color={COLOR_MULTIPAIS}
                    tipo="Multi-país"
                    estaSeleccionado={nombrePais === paisSeleccionado}
                    onSeleccionarPais={onSeleccionarPais}
                  />
                );
              })}
          </>
        )}
      </MapContainer>
      {enModoDetalle &&
        (participanteDesconocido || implementacionDesconocido) && (
          <div className="mapa-chips-fallback">
            {participanteDesconocido && (
              <div className="mapa-chip-fallback">
                País de participante desconocido
              </div>
            )}
            {implementacionDesconocido && (
              <div className="mapa-chip-fallback">
                País de implementación desconocido
              </div>
            )}
          </div>
        )}
    </>
  );
}

export default MapaDeBurbujas;
