import { useState } from 'react';
import { COLOR_PAIS_UNICO, COLOR_MULTIPAIS } from '../../utils/constantes';
import { IconoConversacion } from '../Iconos/Iconos';
import { escogerNombre } from '../../utils/nombres';
import './TarjetaProyecto.css';

function TarjetaProyecto({ proyecto }) {
  const esPaisUnico = proyecto.clasificacion === 'País-único';
  const colorClasif = esPaisUnico ? COLOR_PAIS_UNICO : COLOR_MULTIPAIS;
  const priorizado = (proyecto.priorizado || '').trim();

  const [nombrePersona] = useState(() =>
    priorizado
      ? escogerNombre({
          genero: proyecto._participante?.genero,
          paisNacimiento: proyecto._participante?.paisNacimiento,
        })
      : null,
  );

  return (
    <div className="tarjeta-proyecto" style={{ borderLeftColor: colorClasif }}>
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
        <button type="button" className="tarjeta-proyecto-pildora">
          <IconoConversacion size={14} />
          <span>Conoce la experiencia de {nombrePersona}</span>
        </button>
      )}
    </div>
  );
}

export default TarjetaProyecto;
