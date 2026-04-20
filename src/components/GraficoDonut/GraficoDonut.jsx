import { useRef, useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import './GraficoDonut.css';

const COLOR_PAIS_UNICO = '#ABC174';
const COLOR_MULTIPAIS = '#C88FF2';

function generarTonos(colorBase, n) {
  if (n <= 0) return [];
  if (n === 1) return [colorBase];
  return d3.quantize(
    (t) =>
      d3.interpolate(
        d3.color(colorBase).darker(0.6),
        d3.color(colorBase).brighter(0.4),
      )(t),
    n,
  );
}

function dibujarDonut(svgEl, entries, colorScale, size) {
  const svg = d3.select(svgEl);
  svg.selectAll('*').remove();

  const filtered = entries.filter(([, v]) => v > 0);
  if (filtered.length === 0) return;

  const radio = size / 2;
  const radioInterno = radio * 0.55;

  svg.attr('width', size).attr('height', size);
  const g = svg.append('g').attr('transform', `translate(${radio},${radio})`);

  const pie = d3.pie().value((d) => d[1]).sort(null);
  const arc = d3.arc().innerRadius(radioInterno).outerRadius(radio);

  g.selectAll('path')
    .data(pie(filtered))
    .join('path')
    .attr('d', arc)
    .attr('fill', (d) => colorScale(d.data[0]))
    .attr('stroke', '#fff')
    .attr('stroke-width', 1.5);
}

function GraficoDonut({ datosPaisUnico, datosMultipais }) {
  const svgPrimaryRef = useRef();
  const svgSecondaryRef = useRef();
  const tooltipRef = useRef();

  const hasPU = datosPaisUnico != null && Object.keys(datosPaisUnico).length > 0;
  const hasMP = datosMultipais != null && Object.keys(datosMultipais).length > 0;
  const dualMode = hasPU && hasMP;

  const allLabels = useMemo(() => {
    const labels = new Set([
      ...(hasPU ? Object.keys(datosPaisUnico) : []),
      ...(hasMP ? Object.keys(datosMultipais) : []),
    ]);
    return [...labels].sort((a, b) => {
      const totalA =
        (datosPaisUnico?.[a] || 0) + (datosMultipais?.[a] || 0);
      const totalB =
        (datosPaisUnico?.[b] || 0) + (datosMultipais?.[b] || 0);
      return totalB - totalA;
    });
  }, [datosPaisUnico, datosMultipais, hasPU, hasMP]);

  const totalPU = useMemo(
    () => (hasPU ? Object.values(datosPaisUnico).reduce((s, v) => s + v, 0) : 0),
    [datosPaisUnico, hasPU],
  );

  const totalMP = useMemo(
    () => (hasMP ? Object.values(datosMultipais).reduce((s, v) => s + v, 0) : 0),
    [datosMultipais, hasMP],
  );

  const colorPU = useMemo(
    () =>
      d3
        .scaleOrdinal()
        .domain(allLabels)
        .range(generarTonos(COLOR_PAIS_UNICO, allLabels.length)),
    [allLabels],
  );

  const colorMP = useMemo(
    () =>
      d3
        .scaleOrdinal()
        .domain(allLabels)
        .range(generarTonos(COLOR_MULTIPAIS, allLabels.length)),
    [allLabels],
  );

  const size = dualMode ? 140 : 180;

  // Single mode: draw one donut with its own tooltip
  useEffect(() => {
    if (dualMode || (!hasPU && !hasMP)) return;

    const data = hasPU ? datosPaisUnico : datosMultipais;
    const colorScale = hasPU ? colorPU : colorMP;
    const total = hasPU ? totalPU : totalMP;

    dibujarDonut(svgPrimaryRef.current, allLabels.map((l) => [l, data[l] || 0]), colorScale, size);

    const tooltip = d3.select(tooltipRef.current);
    d3.select(svgPrimaryRef.current)
      .selectAll('path')
      .on('mouseover', (event, d) => {
        const label = d.data[0];
        const count = d.data[1];
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
        tooltip
          .style('display', 'block')
          .html(`<strong>${label}</strong><br>${count} (${pct}%)`);
      })
      .on('mousemove', (event) => {
        tooltip
          .style('left', `${event.clientX + 12}px`)
          .style('top', `${event.clientY - 12}px`);
      })
      .on('mouseout', () => {
        tooltip.style('display', 'none');
      });
  }, [dualMode, allLabels, datosPaisUnico, datosMultipais, colorPU, colorMP, size, totalPU, totalMP, hasPU, hasMP]);

  // Dual mode: draw both donuts with coordinated tooltips
  useEffect(() => {
    if (!dualMode) return;

    const entriesPU = allLabels.map((l) => [l, datosPaisUnico[l] || 0]);
    const entriesMP = allLabels.map((l) => [l, datosMultipais[l] || 0]);

    dibujarDonut(svgPrimaryRef.current, entriesPU, colorPU, size);
    dibujarDonut(svgSecondaryRef.current, entriesMP, colorMP, size);

    const svgPU = d3.select(svgPrimaryRef.current);
    const svgMP = d3.select(svgSecondaryRef.current);
    const tooltip = d3.select(tooltipRef.current);

    function onHover(label, event) {
      svgPU.selectAll('path').attr('opacity', (d) => (d.data[0] === label ? 1 : 0.25));
      svgMP.selectAll('path').attr('opacity', (d) => (d.data[0] === label ? 1 : 0.25));

      const puCount = datosPaisUnico[label] || 0;
      const mpCount = datosMultipais[label] || 0;
      const puPct = totalPU > 0 ? Math.round((puCount / totalPU) * 100) : 0;
      const mpPct = totalMP > 0 ? Math.round((mpCount / totalMP) * 100) : 0;
      tooltip
        .style('display', 'block')
        .html(
          `<strong>${label}</strong><br>País-único: ${puCount} (${puPct}%)<br>Multi-país: ${mpCount} (${mpPct}%)`,
        );
    }

    function onMove(event) {
      tooltip
        .style('left', `${event.clientX + 12}px`)
        .style('top', `${event.clientY - 12}px`);
    }

    function onOut() {
      svgPU.selectAll('path').attr('opacity', 1);
      svgMP.selectAll('path').attr('opacity', 1);
      tooltip.style('display', 'none');
    }

    svgPU
      .selectAll('path')
      .on('mouseover', (event, d) => onHover(d.data[0], event))
      .on('mousemove', onMove)
      .on('mouseout', onOut);

    svgMP
      .selectAll('path')
      .on('mouseover', (event, d) => onHover(d.data[0], event))
      .on('mousemove', onMove)
      .on('mouseout', onOut);
  }, [dualMode, allLabels, datosPaisUnico, datosMultipais, colorPU, colorMP, size, totalPU, totalMP]);

  if (allLabels.length === 0) return null;

  const primaryLabel = hasPU ? 'País-único' : 'Multi-país';

  return (
    <div className="grafico-donut">
      <div ref={tooltipRef} className="grafico-tooltip" />
      <div
        className={`grafico-donut-graficos ${dualMode ? 'grafico-donut-dual' : ''}`}
      >
        <div className="grafico-donut-columna">
          {dualMode && <span className="grafico-donut-subtitulo">{primaryLabel}</span>}
          <svg ref={svgPrimaryRef}></svg>
        </div>
        {dualMode && (
          <div className="grafico-donut-columna">
            <span className="grafico-donut-subtitulo">Multi-país</span>
            <svg ref={svgSecondaryRef}></svg>
          </div>
        )}
      </div>
      <div className="grafico-donut-leyenda">
        {allLabels.map((label) => {
          const puColor = hasPU ? colorPU(label) : null;
          const mpColor = hasMP ? colorMP(label) : null;

          return (
            <div key={label} className="grafico-donut-leyenda-item">
              {puColor && (
                <span
                  className="grafico-donut-leyenda-color"
                  style={{ backgroundColor: puColor }}
                />
              )}
              {dualMode && mpColor && (
                <span
                  className="grafico-donut-leyenda-color"
                  style={{ backgroundColor: mpColor }}
                />
              )}
              {!hasPU && mpColor && (
                <span
                  className="grafico-donut-leyenda-color"
                  style={{ backgroundColor: mpColor }}
                />
              )}
              <span className="grafico-donut-leyenda-texto">{label}</span>
              {hasPU && (
                <span className="grafico-donut-leyenda-valor">
                  {totalPU > 0
                    ? Math.round(((datosPaisUnico[label] || 0) / totalPU) * 100)
                    : 0}%
                </span>
              )}
              {dualMode && (
                <span className="grafico-donut-leyenda-valor">
                  {totalMP > 0
                    ? Math.round(((datosMultipais[label] || 0) / totalMP) * 100)
                    : 0}%
                </span>
              )}
              {!hasPU && hasMP && (
                <span className="grafico-donut-leyenda-valor">
                  {totalMP > 0
                    ? Math.round(((datosMultipais[label] || 0) / totalMP) * 100)
                    : 0}%
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GraficoDonut;
