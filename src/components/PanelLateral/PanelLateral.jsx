import TarjetaProyecto from '../TarjetaProyecto/TarjetaProyecto';
import './PanelLateral.css';

function PanelLateral({ paisSeleccionado, proyectos, metricasGlobales, metricasPais, onVolver }) {
  return (
    <aside className="panel-lateral">
      {paisSeleccionado && (
        <button className="panel-lateral-boton-volver" onClick={onVolver}>
          ← Volver
        </button>
      )}
      <div className="panel-lateral-encabezado">
        <div>
          <h2 className="panel-lateral-titulo">
            {paisSeleccionado ?? 'Resumen general'}
          </h2>
          {paisSeleccionado && (
            <p className="panel-lateral-conteo">
              {proyectos.length} {proyectos.length === 1 ? 'proyecto' : 'proyectos'}
            </p>
          )}
        </div>
      </div>

      {paisSeleccionado ? (
        <>
          <div className="panel-lateral-metricas">
            <div className="metrica-tarjeta">
              <span className="metrica-valor">{metricasPais.proyectosPaisUnico}</span>
              <span className="metrica-etiqueta">Proyectos país-único</span>
            </div>
            <div className="metrica-tarjeta">
              <span className="metrica-valor">{metricasPais.proyectosMultipais}</span>
              <span className="metrica-etiqueta">Proyectos multi-país</span>
            </div>
          </div>
          <ul className="panel-lateral-lista">
            {proyectos.map((proyecto) => (
              <li key={proyecto.proyectoID}>
                <TarjetaProyecto proyecto={proyecto} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="panel-lateral-metricas">
          <div className="metrica-tarjeta">
            <span className="metrica-valor">{metricasGlobales.proyectosPaisUnico}</span>
            <span className="metrica-etiqueta">Proyectos país-único</span>
          </div>
          <div className="metrica-tarjeta">
            <span className="metrica-valor">{metricasGlobales.proyectosMultipais}</span>
            <span className="metrica-etiqueta">Proyectos multi-país</span>
          </div>
          <div className="metrica-tarjeta">
            <span className="metrica-valor">{metricasGlobales.paisesConPaisUnico}</span>
            <span className="metrica-etiqueta">Países con proyectos país-único</span>
          </div>
          <div className="metrica-tarjeta">
            <span className="metrica-valor">{metricasGlobales.paisesConMultipais}</span>
            <span className="metrica-etiqueta">Países con proyectos multi-país</span>
          </div>
        </div>
      )}
    </aside>
  );
}

export default PanelLateral;
