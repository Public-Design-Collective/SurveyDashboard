import './SelectorMultipais.css';

function SelectorMultipais({ incluirMultipais, onCambiar }) {
  return (
    <div className="selector-multipais">
      <label className="selector-multipais-label">
        <input
          type="checkbox"
          checked={incluirMultipais}
          onChange={(evento) => onCambiar(evento.target.checked)}
          className="selector-multipais-checkbox"
        />
        <span>Incluir proyectos multi-país</span>
      </label>
    </div>
  );
}

export default SelectorMultipais;
