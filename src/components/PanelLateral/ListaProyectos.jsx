import { useMemo, useState } from 'react';
import TarjetaProyecto from '../TarjetaProyecto/TarjetaProyecto';

function ListaProyectos({ proyectos }) {
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('asc');
  const [filtroTipo, setFiltroTipo] = useState('todos');

  const tiposInstitucion = useMemo(() => {
    const s = new Set();
    for (const p of proyectos) {
      if (p.tipoInstitucion) s.add(p.tipoInstitucion);
    }
    return [...s].sort((a, b) => a.localeCompare(b));
  }, [proyectos]);

  const proyectosFiltrados = useMemo(() => {
    let lista = proyectos;
    const q = busqueda.trim().toLowerCase();
    if (q) {
      lista = lista.filter((p) => (p.nombre || '').toLowerCase().includes(q));
    }
    if (filtroTipo !== 'todos') {
      lista = lista.filter((p) => p.tipoInstitucion === filtroTipo);
    }
    return [...lista].sort((a, b) => {
      const an = (a.nombre || '').toLowerCase();
      const bn = (b.nombre || '').toLowerCase();
      return orden === 'asc' ? an.localeCompare(bn) : bn.localeCompare(an);
    });
  }, [proyectos, busqueda, filtroTipo, orden]);

  return (
    <>
      <div className="lista-controles">
        <input
          type="search"
          className="lista-busqueda"
          placeholder="Buscar proyecto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <div className="lista-controles-fila">
          <label className="lista-control-grupo">
            <span className="lista-control-etiqueta">Ordenar por</span>
            <select
              className="lista-control-select"
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
            >
              <option value="asc">Nombre (A → Z)</option>
              <option value="desc">Nombre (Z → A)</option>
            </select>
          </label>
          <label className="lista-control-grupo">
            <span className="lista-control-etiqueta">Tipo de institución</span>
            <select
              className="lista-control-select"
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
            >
              <option value="todos">Todos</option>
              {tiposInstitucion.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <ul className="panel-lateral-lista">
        {proyectosFiltrados.map((proyecto, i) => (
          <li key={`${proyecto.proyectoID}-${i}`}>
            <TarjetaProyecto proyecto={proyecto} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListaProyectos;
