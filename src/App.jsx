import { useState, useMemo } from "react";
import { useDatosSurvey } from "./hooks/useDatosSurvey";
import {
  contarProyectosPorPaisDesglosado,
  obtenerProyectosPorPais,
  calcularMetricasGlobales,
  calcularMetricasPais,
  calcularDatosGraficosDesglosados,
  calcularDatosExperiencia,
} from "./utils/procesarDatos";
import MapaDeBurbujas from "./components/MapaDeBurbujas/MapaDeBurbujas";
import PanelLateral from "./components/PanelLateral/PanelLateral";
import SelectorMultipais from "./components/SelectorMultipais/SelectorMultipais";

function App() {
  const { datos, datosParticipantes, cargando, error } = useDatosSurvey();
  const [incluirPaisUnico, setIncluirPaisUnico] = useState(true);
  const [incluirMultipais, setIncluirMultipais] = useState(true);
  const [paisSeleccionado, setPaisSeleccionado] = useState(null);

  const conteosDesglosados = useMemo(
    () => contarProyectosPorPaisDesglosado(datos),
    [datos],
  );

  const conteoMaximoReferencia = useMemo(() => {
    const { paisUnico, multipais } = conteosDesglosados;
    return Math.max(
      ...Object.values(paisUnico),
      ...Object.values(multipais),
      0,
    );
  }, [conteosDesglosados]);

  const participantesPorID = useMemo(() => {
    const m = new Map();
    for (const p of datosParticipantes) {
      if (p.participanteID) m.set(p.participanteID, p);
    }
    return m;
  }, [datosParticipantes]);

  const proyectosVisibles = useMemo(() => {
    let lista;
    if (paisSeleccionado) {
      lista = obtenerProyectosPorPais(
        datos,
        paisSeleccionado,
        incluirPaisUnico,
        incluirMultipais,
      );
    } else {
      lista = datos.filter((fila) => {
        const esPaisUnico = fila.clasificacion === "País-único";
        if (esPaisUnico && !incluirPaisUnico) return false;
        if (!esPaisUnico && !incluirMultipais) return false;
        return true;
      });
    }
    return lista.map((fila) => ({
      ...fila,
      _participante: participantesPorID.get(fila.participanteID),
    }));
  }, [datos, paisSeleccionado, incluirPaisUnico, incluirMultipais, participantesPorID]);

  const metricasGlobales = useMemo(
    () => calcularMetricasGlobales(datos, datosParticipantes),
    [datos, datosParticipantes],
  );

  const metricasPais = useMemo(
    () =>
      paisSeleccionado
        ? calcularMetricasPais(datos, paisSeleccionado, datosParticipantes)
        : null,
    [datos, paisSeleccionado, datosParticipantes],
  );

  const datosGraficos = useMemo(
    () => calcularDatosGraficosDesglosados(datos, paisSeleccionado),
    [datos, paisSeleccionado],
  );

  const datosExperiencia = useMemo(
    () => calcularDatosExperiencia(datos, datosParticipantes, paisSeleccionado),
    [datos, datosParticipantes, paisSeleccionado],
  );

  const manejarDeseleccionPais = () => {
    setPaisSeleccionado(null);
  };

  if (cargando) {
    return (
      <div className="pantalla-carga">
        <p>Cargando datos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pantalla-error">
        <p>Error al cargar los datos. Por favor, recargue la página.</p>
      </div>
    );
  }

  return (
    <div className="contenedor-app">
      <div className="contenedor-mapa-principal">
        <SelectorMultipais
          incluirPaisUnico={incluirPaisUnico}
          incluirMultipais={incluirMultipais}
          onCambiarPaisUnico={setIncluirPaisUnico}
          onCambiarMultipais={setIncluirMultipais}
        />
        <MapaDeBurbujas
          conteosPaisUnico={conteosDesglosados.paisUnico}
          conteosMultipais={conteosDesglosados.multipais}
          conteoMaximoReferencia={conteoMaximoReferencia}
          incluirPaisUnico={incluirPaisUnico}
          incluirMultipais={incluirMultipais}
          paisSeleccionado={paisSeleccionado}
          onSeleccionarPais={setPaisSeleccionado}
          onDeseleccionarPais={manejarDeseleccionPais}
        />
      </div>
      <PanelLateral
        paisSeleccionado={paisSeleccionado}
        proyectos={proyectosVisibles}
        metricasGlobales={metricasGlobales}
        metricasPais={metricasPais}
        datosGraficos={datosGraficos}
        datosExperiencia={datosExperiencia}
        incluirPaisUnico={incluirPaisUnico}
        incluirMultipais={incluirMultipais}
        onVolver={manejarDeseleccionPais}
      />
    </div>
  );
}

export default App;
