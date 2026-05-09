const COLOR_TITULO_GRUPO = '#94a3b8';

function TituloGrupo({ icono: Icono, children }) {
  return (
    <h3 className="panel-lateral-seccion-titulo">
      {Icono && <Icono color={COLOR_TITULO_GRUPO} size={16} />}
      {children}
    </h3>
  );
}

export default TituloGrupo;
