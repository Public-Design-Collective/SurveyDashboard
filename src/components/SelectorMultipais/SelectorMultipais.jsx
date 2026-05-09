import './SelectorMultipais.css';

function SelectorMultipais({
  incluirPaisUnico,
  incluirMultipais,
  onCambiarPaisUnico,
  onCambiarMultipais,
}) {
  return (
    <div className="selector-multipais">
      <label className="selector-multipais-toggle">
        <input
          type="checkbox"
          checked={incluirPaisUnico}
          onChange={(e) => onCambiarPaisUnico(e.target.checked)}
        />
        <span className="toggle-slider toggle-pu" aria-hidden="true" />
        <span className="toggle-etiqueta">Proyectos país-único</span>
      </label>
      <label className="selector-multipais-toggle">
        <input
          type="checkbox"
          checked={incluirMultipais}
          onChange={(e) => onCambiarMultipais(e.target.checked)}
        />
        <span className="toggle-slider toggle-mp" aria-hidden="true" />
        <span className="toggle-etiqueta">Proyectos multi-país</span>
      </label>
    </div>
  );
}

export default SelectorMultipais;
