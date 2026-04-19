import './SelectorMultipais.css';

function SelectorMultipais({
  incluirPaisUnico,
  incluirMultipais,
  onCambiarPaisUnico,
  onCambiarMultipais,
}) {
  return (
    <div className="selector-multipais">
      <label className="selector-multipais-label">
        <input
          type="checkbox"
          checked={incluirPaisUnico}
          onChange={(e) => onCambiarPaisUnico(e.target.checked)}
          className="selector-multipais-checkbox selector-checkbox-pu"
        />
        <span>Proyectos país-único</span>
      </label>
      <label className="selector-multipais-label">
        <input
          type="checkbox"
          checked={incluirMultipais}
          onChange={(e) => onCambiarMultipais(e.target.checked)}
          className="selector-multipais-checkbox selector-checkbox-mp"
        />
        <span>Proyectos multi-país</span>
      </label>
    </div>
  );
}

export default SelectorMultipais;
