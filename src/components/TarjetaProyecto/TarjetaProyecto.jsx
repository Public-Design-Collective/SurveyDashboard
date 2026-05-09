import { useState } from 'react';
import { colorPorClasificacion } from '../../utils/constantes';
import { IconoConversacion } from '../Iconos/Iconos';
import { escogerNombre } from '../../utils/nombres';
import './TarjetaProyecto.css';

function TarjetaProyecto({ proyecto, onClick }) {
  const colorClasif = colorPorClasificacion(proyecto.clasificacion);
  const priorizado = (proyecto.priorizado || '').trim();
  const esClickeable = Boolean(priorizado && onClick);

  const [nombrePersona] = useState(() =>
    priorizado
      ? escogerNombre({
          genero: proyecto._participante?.genero,
          paisNacimiento: proyecto._participante?.paisNacimiento,
        })
      : null,
  );

  const contenido = (
    <>
      <p className="tarjeta-proyecto-id" style={{ color: colorClasif }}>
        {proyecto.nombre}
      </p>
      <p className="tarjeta-proyecto-detalle">
        <span className="tarjeta-proyecto-etiqueta">Institución:</span>{' '}
        {proyecto.tipoInstitucion}
      </p>
      <p className="tarjeta-proyecto-detalle">
        <span className="tarjeta-proyecto-etiqueta">País institución:</span>{' '}
        {proyecto.paisImplementacion}
      </p>
      {nombrePersona && (
        <span className="tarjeta-proyecto-pildora">
          <IconoConversacion size={14} />
          <span>Conoce la experiencia de {nombrePersona}</span>
        </span>
      )}
    </>
  );

  if (esClickeable) {
    return (
      <button
        type="button"
        className="tarjeta-proyecto tarjeta-proyecto-clickable"
        style={{ borderLeftColor: colorClasif }}
        onClick={onClick}
      >
        {contenido}
      </button>
    );
  }

  return (
    <div className="tarjeta-proyecto" style={{ borderLeftColor: colorClasif }}>
      {contenido}
    </div>
  );
}

export default TarjetaProyecto;
