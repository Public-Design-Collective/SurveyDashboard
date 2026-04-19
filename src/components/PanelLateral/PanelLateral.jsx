import TarjetaProyecto from '../TarjetaProyecto/TarjetaProyecto';
import GraficoDonut from '../GraficoDonut/GraficoDonut';
import GraficoBarras from '../GraficoBarras/GraficoBarras';
import './PanelLateral.css';

const COLOR_PAIS_UNICO = '#ABC174';
const COLOR_MULTIPAIS = '#C88FF2';

function PanelLateral({
  paisSeleccionado,
  proyectos,
  metricasGlobales,
  metricasPais,
  datosGraficos,
  incluirPaisUnico,
  incluirMultipais,
  onVolver,
}) {
  const datosPU = incluirPaisUnico;
  const datosMP = incluirMultipais;

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
              {proyectos.length}{' '}
              {proyectos.length === 1 ? 'proyecto' : 'proyectos'}
            </p>
          )}
        </div>
      </div>

      {paisSeleccionado ? (
        <>
          <div className="panel-lateral-metricas">
            {datosPU && (
              <div className="metrica-tarjeta">
                <span className="metrica-valor" style={{ color: COLOR_PAIS_UNICO }}>
                  {metricasPais.proyectosPaisUnico}
                </span>
                <span className="metrica-etiqueta">Proyectos país-único</span>
              </div>
            )}
            {datosMP && (
              <div className="metrica-tarjeta">
                <span className="metrica-valor" style={{ color: COLOR_MULTIPAIS }}>
                  {metricasPais.proyectosMultipais}
                </span>
                <span className="metrica-etiqueta">Proyectos multi-país</span>
              </div>
            )}
          </div>

          <h3 className="panel-lateral-seccion-titulo">Distribución por rol</h3>
          <GraficoDonut
            datosPaisUnico={datosPU ? datosGraficos.conteoRolPaisUnico : null}
            datosMultipais={datosMP ? datosGraficos.conteoRolMultipais : null}
          />

          <h3 className="panel-lateral-seccion-titulo">Proyectos por tipo de institución</h3>
          <GraficoBarras
            datosPaisUnico={datosPU ? datosGraficos.conteoTipoInstitucionPaisUnico : null}
            datosMultipais={datosMP ? datosGraficos.conteoTipoInstitucionMultipais : null}
          />

          <h3 className="panel-lateral-seccion-titulo">Proyectos</h3>
          <ul className="panel-lateral-lista">
            {proyectos.map((proyecto) => (
              <li key={proyecto.proyectoID}>
                <TarjetaProyecto proyecto={proyecto} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <div className="panel-lateral-metricas">
            {datosPU && (
              <div className="metrica-tarjeta">
                <span className="metrica-valor" style={{ color: COLOR_PAIS_UNICO }}>
                  {metricasGlobales.proyectosPaisUnico}
                </span>
                <span className="metrica-etiqueta">Proyectos país-único</span>
              </div>
            )}
            {datosMP && (
              <div className="metrica-tarjeta">
                <span className="metrica-valor" style={{ color: COLOR_MULTIPAIS }}>
                  {metricasGlobales.proyectosMultipais}
                </span>
                <span className="metrica-etiqueta">Proyectos multi-país</span>
              </div>
            )}
            {datosPU && (
              <div className="metrica-tarjeta">
                <span className="metrica-valor" style={{ color: COLOR_PAIS_UNICO }}>
                  {metricasGlobales.paisesConPaisUnico}
                </span>
                <span className="metrica-etiqueta">Países con proyectos país-único</span>
              </div>
            )}
            {datosMP && (
              <div className="metrica-tarjeta">
                <span className="metrica-valor" style={{ color: COLOR_MULTIPAIS }}>
                  {metricasGlobales.paisesConMultipais}
                </span>
                <span className="metrica-etiqueta">Países con proyectos multi-país</span>
              </div>
            )}
          </div>

          <h3 className="panel-lateral-seccion-titulo">Distribución por rol</h3>
          <GraficoDonut
            datosPaisUnico={datosPU ? datosGraficos.conteoRolPaisUnico : null}
            datosMultipais={datosMP ? datosGraficos.conteoRolMultipais : null}
          />

          <h3 className="panel-lateral-seccion-titulo">Proyectos por tipo de institución</h3>
          <GraficoBarras
            datosPaisUnico={datosPU ? datosGraficos.conteoTipoInstitucionPaisUnico : null}
            datosMultipais={datosMP ? datosGraficos.conteoTipoInstitucionMultipais : null}
          />
        </>
      )}
    </aside>
  );
}

export default PanelLateral;
