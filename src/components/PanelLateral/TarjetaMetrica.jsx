function TarjetaMetrica({ tipo, detalle, valor, color, compacta = false }) {
  return (
    <div className={`metrica-tarjeta${compacta ? ' compacta' : ''}`}>
      <span className="metrica-valor" style={{ color }}>
        {valor}
      </span>
      <div className="metrica-descriptor" style={{ color }}>
        <div className="metrica-descriptor-tipo">{tipo}</div>
        <div className="metrica-descriptor-detalle">{detalle}</div>
      </div>
    </div>
  );
}

export default TarjetaMetrica;
