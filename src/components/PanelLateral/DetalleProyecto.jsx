import { colorPorClasificacion } from '../../utils/constantes';
import { CAMPOS_DETALLE } from '../../utils/camposDetalle';
import RenderCampo from './RenderCampo';

function DetalleProyecto({ proyecto, onCerrar }) {
  const colorClasif = colorPorClasificacion(proyecto.clasificacion);

  return (
    <>
      <button className="panel-lateral-boton-volver" onClick={onCerrar}>
        ← Volver a la lista
      </button>
      <div className="panel-lateral-encabezado">
        <h2 className="panel-lateral-titulo" style={{ color: colorClasif }}>
          {proyecto.nombre}
        </h2>
      </div>
      <div className="detalle-campos">
        {CAMPOS_DETALLE.map((campo) => {
          const valor = proyecto[campo.col];
          if (!valor || !String(valor).trim()) return null;
          return (
            <div key={campo.col} className="detalle-campo">
              <h3 className="panel-lateral-seccion-titulo">{campo.label}</h3>
              <RenderCampo valor={valor} tipo={campo.tipo} color={colorClasif} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default DetalleProyecto;
