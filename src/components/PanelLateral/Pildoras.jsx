function Pildoras({ items, color }) {
  if (!items || items.length === 0) return null;
  const estilo = color ? { color, borderColor: color } : undefined;
  return (
    <div className="detalle-pildoras">
      {items.map((item, i) => (
        <span key={i} className="detalle-pildora" style={estilo}>
          {item}
        </span>
      ))}
    </div>
  );
}

export default Pildoras;
