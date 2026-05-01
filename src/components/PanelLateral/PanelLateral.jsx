import { useMemo, useState } from 'react';
import TarjetaProyecto from '../TarjetaProyecto/TarjetaProyecto';
import GraficoDonut from '../GraficoDonut/GraficoDonut';
import GraficoBarras from '../GraficoBarras/GraficoBarras';
import {
  IconoProyecto,
  IconoInstitucion,
  IconoParticipante,
  IconoPais,
} from '../Iconos/Iconos';
import {
  COLOR_PAIS_UNICO,
  COLOR_MULTIPAIS,
  COLOR_NEUTRAL,
} from '../../utils/constantes';
import './PanelLateral.css';

const TABS = [
  { id: 'metricas', label: 'Métricas' },
  { id: 'participantes', label: 'Participantes' },
  { id: 'instituciones', label: 'Instituciones' },
  { id: 'lista', label: 'Lista de proyectos' },
];

function TarjetaMetrica({ categoria, descriptor, valor, color, icono: Icono, compacta = false }) {
  return (
    <div className={`metrica-tarjeta${compacta ? ' compacta' : ''}`}>
      <div className="metrica-categoria" style={{ color }}>
        {categoria}
      </div>
      <div className="metrica-valor-fila">
        <span className="metrica-valor" style={{ color }}>
          {valor}
        </span>
        {Icono && <Icono color={color} size={compacta ? 20 : 28} />}
      </div>
      {descriptor && <div className="metrica-descriptor">{descriptor}</div>}
    </div>
  );
}

function CardsParticipantes({ metricas, ambito, compacta = false }) {
  return (
    <div className="grupo-participantes">
      <TarjetaMetrica
        compacta={compacta}
        categoria="Participantes"
        descriptor={<>que <strong>reportaron proyectos</strong> en {ambito}</>}
        valor={metricas.participantesQueReportaronProyectos}
        color={COLOR_NEUTRAL}
        icono={IconoParticipante}
      />
      <TarjetaMetrica
        compacta={compacta}
        categoria="Participantes"
        descriptor={<>que <strong>nacieron</strong> en {ambito}</>}
        valor={metricas.participantesQueNacieron}
        color={COLOR_NEUTRAL}
        icono={IconoParticipante}
      />
      <TarjetaMetrica
        compacta={compacta}
        categoria="Participantes"
        descriptor={<>que <strong>residen</strong> en {ambito}</>}
        valor={metricas.participantesQueResiden}
        color={COLOR_NEUTRAL}
        icono={IconoParticipante}
      />
    </div>
  );
}

function CardsProyectos({ metricas, datosPU, datosMP, compacta = false }) {
  return (
    <div className="grupo-clasificadas">
      {datosPU && (
        <TarjetaMetrica
          compacta={compacta}
          categoria="Proyectos"
          descriptor="país-único"
          valor={metricas.proyectosPaisUnico}
          color={COLOR_PAIS_UNICO}
          icono={IconoProyecto}
        />
      )}
      {datosMP && (
        <TarjetaMetrica
          compacta={compacta}
          categoria="Proyectos"
          descriptor="multi-país"
          valor={metricas.proyectosMultipais}
          color={COLOR_MULTIPAIS}
          icono={IconoProyecto}
        />
      )}
    </div>
  );
}

function CardsPaises({ metricas, datosPU, datosMP, compacta = false }) {
  return (
    <div className="grupo-clasificadas">
      {datosPU && (
        <TarjetaMetrica
          compacta={compacta}
          categoria="Países"
          descriptor="con proyectos país-único"
          valor={metricas.paisesConPaisUnico}
          color={COLOR_PAIS_UNICO}
          icono={IconoPais}
        />
      )}
      {datosMP && (
        <TarjetaMetrica
          compacta={compacta}
          categoria="Países"
          descriptor="con proyectos multi-país"
          valor={metricas.paisesConMultipais}
          color={COLOR_MULTIPAIS}
          icono={IconoPais}
        />
      )}
    </div>
  );
}

function CardsInstituciones({ metricas, datosPU, datosMP, compacta = false }) {
  return (
    <div className="grupo-clasificadas">
      {datosPU && (
        <TarjetaMetrica
          compacta={compacta}
          categoria="Instituciones"
          descriptor="país-único"
          valor={metricas.institucionesPaisUnico}
          color={COLOR_PAIS_UNICO}
          icono={IconoInstitucion}
        />
      )}
      {datosMP && (
        <TarjetaMetrica
          compacta={compacta}
          categoria="Instituciones"
          descriptor="multi-país"
          valor={metricas.institucionesMultipais}
          color={COLOR_MULTIPAIS}
          icono={IconoInstitucion}
        />
      )}
    </div>
  );
}

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
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('asc');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const datosPU = incluirPaisUnico;
  const datosMP = incluirMultipais;
  const ambito = paisSeleccionado ?? 'América Latina';
  const metricas = paisSeleccionado ? metricasPais : metricasGlobales;
  const esVistaGlobal = !paisSeleccionado;

  const tiposInstitucion = useMemo(() => {
    const s = new Set();
    for (const p of proyectos) {
      if (p.tipoInstitucion) s.add(p.tipoInstitucion);
    }
    return [...s].sort((a, b) => a.localeCompare(b));
  }, [proyectos]);

  const proyectosFiltrados = useMemo(() => {
    let lista = proyectos;
    const q = busqueda.trim().toLowerCase();
    if (q) {
      lista = lista.filter((p) => (p.nombre || '').toLowerCase().includes(q));
    }
    if (filtroTipo !== 'todos') {
      lista = lista.filter((p) => p.tipoInstitucion === filtroTipo);
    }
    return [...lista].sort((a, b) => {
      const an = (a.nombre || '').toLowerCase();
      const bn = (b.nombre || '').toLowerCase();
      return orden === 'asc' ? an.localeCompare(bn) : bn.localeCompare(an);
    });
  }, [proyectos, busqueda, filtroTipo, orden]);

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

        {tabActiva === 'lista' && (
          <>
            <div className="lista-controles">
              <input
                type="search"
                className="lista-busqueda"
                placeholder="Buscar proyecto..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <div className="lista-controles-fila">
                <label className="lista-control-grupo">
                  <span className="lista-control-etiqueta">Ordenar por</span>
                  <select
                    className="lista-control-select"
                    value={orden}
                    onChange={(e) => setOrden(e.target.value)}
                  >
                    <option value="asc">Nombre (A → Z)</option>
                    <option value="desc">Nombre (Z → A)</option>
                  </select>
                </label>
                <label className="lista-control-grupo">
                  <span className="lista-control-etiqueta">Tipo de institución</span>
                  <select
                    className="lista-control-select"
                    value={filtroTipo}
                    onChange={(e) => setFiltroTipo(e.target.value)}
                  >
                    <option value="todos">Todos</option>
                    {tiposInstitucion.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            <ul className="panel-lateral-lista">
              {proyectosFiltrados.map((proyecto, i) => (
                <li key={`${proyecto.proyectoID}-${i}`}>
                  <TarjetaProyecto proyecto={proyecto} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </aside>
  );
}

export default PanelLateral;
