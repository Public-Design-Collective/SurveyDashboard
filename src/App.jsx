import { useState, useMemo } from "react";
import { useDatosSurvey } from "./hooks/useDatosSurvey";
import {
  contarProyectosPorPaisDesglosado,
  obtenerProyectosPorPais,
  calcularMetricasGlobales,
  calcularMetricasPais,
  calcularDatosGraficosDesglosados,
} from "./utils/procesarDatos";
import MapaDeBurbujas from "./components/MapaDeBurbujas/MapaDeBurbujas";
import PanelLateral from "./components/PanelLateral/PanelLateral";
import SelectorMultipais from "./components/SelectorMultipais/SelectorMultipais";

function App() {
  const { datos, cargando, error } = useDatosSurvey();
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

  const proyectosDelPais = useMemo(
    () =>
      paisSeleccionado
        ? obtenerProyectosPorPais(
            datos,
            paisSeleccionado,
            incluirPaisUnico,
            incluirMultipais,
          )
        : [],
    [datos, paisSeleccionado, incluirPaisUnico, incluirMultipais],
  );

  const metricasGlobales = useMemo(
    () => calcularMetricasGlobales(datos),
    [datos],
  );

  const metricasPais = useMemo(
    () =>
      paisSeleccionado
        ? calcularMetricasPais(datos, paisSeleccionado)
        : null,
    [datos, paisSeleccionado],
  );

  const datosGraficos = useMemo(
    () => calcularDatosGraficosDesglosados(datos, paisSeleccionado),
    [datos, paisSeleccionado],
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
        proyectos={proyectosDelPais}
        metricasGlobales={metricasGlobales}
        metricasPais={metricasPais}
        datosGraficos={datosGraficos}
        incluirPaisUnico={incluirPaisUnico}
        incluirMultipais={incluirMultipais}
        onVolver={manejarDeseleccionPais}
      />
    </div>
  );
}

export default App;
