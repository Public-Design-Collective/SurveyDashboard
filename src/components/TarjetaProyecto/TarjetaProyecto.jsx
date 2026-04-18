import "./TarjetaProyecto.css";

function TarjetaProyecto({ proyecto }) {
  return (
    <div className="tarjeta-proyecto">
      <p className="tarjeta-proyecto-id">{proyecto.nombre}</p>
      <p className="tarjeta-proyecto-detalle">
        <span className="tarjeta-proyecto-etiqueta">Rol:</span> {proyecto.rol}
      </p>
      <p className="tarjeta-proyecto-detalle">
        <span className="tarjeta-proyecto-etiqueta">Institución:</span>{" "}
        {proyecto.tipoInstitucion}
      </p>
      <p className="tarjeta-proyecto-detalle">
        <span className="tarjeta-proyecto-etiqueta">País institución:</span>{" "}
        {proyecto.paisInstitucion}
      </p>
      <p className="tarjeta-proyecto-detalle">
        <span className="tarjeta-proyecto-etiqueta">Clasificación:</span>{" "}
        {proyecto.clasificacion}
      </p>
    </div>
  );
}

export default TarjetaProyecto;
