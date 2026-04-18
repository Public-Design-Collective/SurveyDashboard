import { useState, useMemo } from "react";
import { useDatosSurvey } from "./hooks/useDatosSurvey";
import {
  contarProyectosPorPais,
  obtenerProyectosPorPais,
  calcularMetricasGlobales,
  calcularMetricasPais,
} from "./utils/procesarDatos";
import MapaDeBurbujas from "./components/MapaDeBurbujas/MapaDeBurbujas";
import PanelLateral from "./components/PanelLateral/PanelLateral";
import SelectorMultipais from "./components/SelectorMultipais/SelectorMultipais";

function App() {
  const { datos, cargando, error } = useDatosSurvey();
  const [incluirMultipais, setIncluirMultipais] = useState(true);
  const [paisSeleccionado, setPaisSeleccionado] = useState(null);
  const conteosPorPais = useMemo(
    () => contarProyectosPorPais(datos, incluirMultipais),
    [datos, incluirMultipais],
  );

  const proyectosDelPais = useMemo(
    () =>
      paisSeleccionado
        ? obtenerProyectosPorPais(datos, paisSeleccionado, incluirMultipais)
        : [],
    [datos, paisSeleccionado, incluirMultipais],
  );

  const conteoMaximoReferencia = useMemo(() => {
    const conteosCompletos = contarProyectosPorPais(datos, true);
    return Math.max(...Object.values(conteosCompletos), 0);
  }, [datos]);

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
          incluirMultipais={incluirMultipais}
          onCambiar={setIncluirMultipais}
        />
        <MapaDeBurbujas
          conteosPorPais={conteosPorPais}
          conteoMaximoReferencia={conteoMaximoReferencia}
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
        onVolver={manejarDeseleccionPais}
      />
    </div>
  );
}

export default App;
