import { useState } from 'react';
import GraficoDonut from '../GraficoDonut/GraficoDonut';
import GraficoBarras from '../GraficoBarras/GraficoBarras';
import CardsParticipantes from './CardsParticipantes';
import CardsProyectos from './CardsProyectos';
import CardsPaises from './CardsPaises';
import CardsInstituciones from './CardsInstituciones';
import ListaProyectos from './ListaProyectos';
import './PanelLateral.css';

const TABS = [
  { id: 'metricas', label: 'Métricas' },
  { id: 'participantes', label: 'Participantes' },
  { id: 'instituciones', label: 'Instituciones' },
  { id: 'lista', label: 'Lista de proyectos' },
];

function PanelLateral({
  paisSeleccionado,
  proyectos,
  metricasGlobales,
  metricasPais,
  datosGraficos,
  datosExperiencia,
  incluirPaisUnico,
  incluirMultipais,
  onVolver,
}) {
  const [tabActiva, setTabActiva] = useState('metricas');
  const datosPU = incluirPaisUnico;
  const datosMP = incluirMultipais;
  const ambito = paisSeleccionado ?? 'América Latina';
  const metricas = paisSeleccionado ? metricasPais : metricasGlobales;
  const esVistaGlobal = !paisSeleccionado;

  const donutRol = (
    <GraficoDonut
      datosPaisUnico={datosPU ? datosGraficos.conteoRolPaisUnico : null}
      datosMultipais={datosMP ? datosGraficos.conteoRolMultipais : null}
    />
  );

  return (
    <aside className="panel-lateral">
      <button
        className="panel-lateral-boton-volver"
        onClick={onVolver}
        style={{ visibility: paisSeleccionado ? 'visible' : 'hidden' }}
        tabIndex={paisSeleccionado ? 0 : -1}
        aria-hidden={!paisSeleccionado}
      >
        ← Volver
      </button>
      <div className="panel-lateral-encabezado">
        <div>
          <h2 className="panel-lateral-titulo">{ambito}</h2>
          {paisSeleccionado && (
            <p className="panel-lateral-conteo">
              {proyectos.length}{' '}
              {proyectos.length === 1 ? 'proyecto' : 'proyectos'}
            </p>
          )}
        </div>
      </div>

      <nav className="panel-lateral-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`panel-lateral-tab${tabActiva === t.id ? ' activa' : ''}`}
            onClick={() => setTabActiva(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className="panel-lateral-tab-contenido">
        {tabActiva === 'metricas' && metricas && (
          <div className="panel-lateral-metricas">
            <CardsParticipantes metricas={metricas} ambito={ambito} />
            <CardsProyectos metricas={metricas} datosPU={datosPU} datosMP={datosMP} />
            <CardsInstituciones metricas={metricas} datosPU={datosPU} datosMP={datosMP} />
            {esVistaGlobal && (
              <CardsPaises metricas={metricas} datosPU={datosPU} datosMP={datosMP} />
            )}
          </div>
        )}

        {tabActiva === 'participantes' && metricas && (
          <>
            <CardsParticipantes metricas={metricas} ambito={ambito} compacta />

            <h3 className="panel-lateral-seccion-titulo">Distribución por rol</h3>
            {donutRol}

            <h3 className="panel-lateral-seccion-titulo">Experiencia laboral</h3>
            <GraficoDonut
              datosPaisUnico={datosPU ? datosExperiencia.conteoExpLaboralPaisUnico : null}
              datosMultipais={datosMP ? datosExperiencia.conteoExpLaboralMultipais : null}
            />

            <h3 className="panel-lateral-seccion-titulo">Experiencia en sector público</h3>
            <GraficoDonut
              datosPaisUnico={datosPU ? datosExperiencia.conteoExpSectorPublicoPaisUnico : null}
              datosMultipais={datosMP ? datosExperiencia.conteoExpSectorPublicoMultipais : null}
            />
          </>
        )}

        {tabActiva === 'instituciones' && metricas && (
          <>
            <CardsInstituciones metricas={metricas} datosPU={datosPU} datosMP={datosMP} compacta />
            <h3 className="panel-lateral-seccion-titulo">Proyectos por tipo de institución</h3>
            <GraficoBarras
              datosPaisUnico={datosPU ? datosGraficos.conteoTipoInstitucionPaisUnico : null}
              datosMultipais={datosMP ? datosGraficos.conteoTipoInstitucionMultipais : null}
            />
          </>
        )}

        {tabActiva === 'lista' && <ListaProyectos proyectos={proyectos} />}
      </div>
    </aside>
  );
}

export default PanelLateral;
