import {
  dividirPorComas,
  autoSplit,
  filtrarPaisesValidos,
  esURL,
  capitalizar,
} from '../../utils/renderValor';
import Pildoras from './Pildoras';

function RenderCampo({ valor, tipo, color }) {
  if (!valor || !String(valor).trim()) return null;
  const v = String(valor).trim();

  if (tipo === 'pildora-simple') {
    return <Pildoras items={[v]} color={color} />;
  }
  if (tipo === 'pildoras') {
    return <Pildoras items={dividirPorComas(v)} color={color} />;
  }
  if (tipo === 'pildoras-paises') {
    const items = filtrarPaisesValidos(dividirPorComas(v));
    return items.length ? <Pildoras items={items} color={color} /> : null;
  }
  if (tipo === 'numero') {
    return <p className="detalle-texto">{v}</p>;
  }
  if (tipo === 'parrafo') {
    return <p className="detalle-parrafo">{capitalizar(v)}</p>;
  }
  if (tipo === 'enlace') {
    return esURL(v) ? (
      <a className="detalle-enlace" href={v} target="_blank" rel="noreferrer">
        {v}
      </a>
    ) : (
      <p className="detalle-parrafo">{capitalizar(v)}</p>
    );
  }
  if (tipo === 'etapa') {
    const idx = v.indexOf(':');
    const pill = idx >= 0 ? v.slice(0, idx).trim() : v;
    const desc = idx >= 0 ? v.slice(idx + 1).trim() : '';
    return (
      <>
        <Pildoras items={[pill]} color={color} />
        {desc && (
          <p className="detalle-parrafo detalle-italic">{capitalizar(desc)}</p>
        )}
      </>
    );
  }
  if (tipo === 'auto') {
    const { pildoras, parrafos } = autoSplit(v);
    return (
      <>
        {pildoras.length > 0 && <Pildoras items={pildoras} color={color} />}
        {parrafos.map((p, i) => (
          <p key={i} className="detalle-parrafo">
            {capitalizar(p)}
          </p>
        ))}
      </>
    );
  }
  return null;
}

export default RenderCampo;
