import { Marker, Tooltip } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { COORDENADAS_PAISES } from '../../utils/coordenadasPaises';
import { COLOR_NEUTRAL, colorPorClasificacion } from '../../utils/constantes';
import { IconoParticipante, IconoProyecto } from '../Iconos/Iconos';

const OFFSET_PARTICIPANTE = [4.5, 0];

function crearIconoMarcador(IconoComponent, color) {
  const html = renderToStaticMarkup(
    <div className="marcador-detalle" style={{ background: color }}>
      <IconoComponent color="#ffffff" size={22} />
    </div>,
  );
  return divIcon({
    html,
    className: '',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}

function MarcadoresDetalle({ proyecto }) {
  const colorProyecto = colorPorClasificacion(proyecto.clasificacion);

  const paisIndividuo = (proyecto.paisIndividuo || '').trim();
  const coordsParticipanteBase = COORDENADAS_PAISES[paisIndividuo] || null;

  const paisesImpl = (proyecto.paisImplementacion || '')
    .split(',')
    .map((p) => p.trim())
    .filter((p) => COORDENADAS_PAISES[p]);

  const seSolapan = coordsParticipanteBase && paisesImpl.includes(paisIndividuo);
  const coordsParticipante = coordsParticipanteBase
    ? seSolapan
      ? [
          coordsParticipanteBase[0] + OFFSET_PARTICIPANTE[0],
          coordsParticipanteBase[1] + OFFSET_PARTICIPANTE[1],
        ]
      : coordsParticipanteBase
    : null;

  return (
    <>
      {coordsParticipante && (
        <Marker
          position={coordsParticipante}
          icon={crearIconoMarcador(IconoParticipante, COLOR_NEUTRAL)}
        >
          <Tooltip direction="top" offset={[0, -20]}>
            <strong>{paisIndividuo}</strong>
            <br />
            País del participante
          </Tooltip>
        </Marker>
      )}
      {paisesImpl.map((pais) => (
        <Marker
          key={`impl-${pais}`}
          position={COORDENADAS_PAISES[pais]}
          icon={crearIconoMarcador(IconoProyecto, colorProyecto)}
        >
          <Tooltip direction="top" offset={[0, -20]}>
            <strong>{pais}</strong>
            <br />
            País de implementación
          </Tooltip>
        </Marker>
      ))}
    </>
  );
}

export default MarcadoresDetalle;
