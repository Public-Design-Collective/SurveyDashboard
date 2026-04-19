import { useRef, useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import './GraficoBarras.css';

const COLOR_PAIS_UNICO = '#ABC174';
const COLOR_MULTIPAIS = '#C88FF2';
const MARGEN = { top: 4, right: 32, bottom: 4, left: 220 };
const ANCHO = 440;

function GraficoBarras({ datosPaisUnico, datosMultipais }) {
  const svgRef = useRef();
  const tooltipRef = useRef();

  const grouped =
    datosMultipais != null && Object.keys(datosMultipais).length > 0;

  const allLabels = useMemo(() => {
    const labels = new Set([
      ...Object.keys(datosPaisUnico),
      ...(datosMultipais ? Object.keys(datosMultipais) : []),
    ]);
    return [...labels].sort((a, b) => {
      const totalA =
        (datosPaisUnico[a] || 0) + (datosMultipais?.[a] || 0);
      const totalB =
        (datosPaisUnico[b] || 0) + (datosMultipais?.[b] || 0);
      return totalB - totalA;
    });
  }, [datosPaisUnico, datosMultipais]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    if (allLabels.length === 0) return;

    const tooltip = d3.select(tooltipRef.current);

    const barsPerGroup = grouped ? 2 : 1;
    const barHeight = 18;
    const barGap = 2;
    const groupGap = 10;
    const groupHeight = barsPerGroup * barHeight + (barsPerGroup - 1) * barGap;
    const alto =
      MARGEN.top +
      allLabels.length * (groupHeight + groupGap) -
      groupGap +
      MARGEN.bottom;

    svg.attr('width', ANCHO).attr('height', alto);

    const maxVal = Math.max(
      d3.max(allLabels, (l) => datosPaisUnico[l] || 0) || 0,
      grouped
        ? d3.max(allLabels, (l) => datosMultipais[l] || 0) || 0
        : 0,
    );

    const x = d3
      .scaleLinear()
      .domain([0, maxVal])
      .range([MARGEN.left, ANCHO - MARGEN.right]);

    function addTooltipEvents(sel, label, value, tipo) {
      sel
        .on('mouseover', () => {
          const text = grouped
            ? `<strong>${label}</strong><br>${value} (${tipo})`
            : `<strong>${label}</strong><br>${value}`;
          tooltip.style('display', 'block').html(text);
        })
        .on('mousemove', (event) => {
          tooltip
            .style('left', `${event.clientX + 12}px`)
            .style('top', `${event.clientY - 12}px`);
        })
        .on('mouseout', () => {
          tooltip.style('display', 'none');
        });
    }

    allLabels.forEach((label, i) => {
      const groupY = MARGEN.top + i * (groupHeight + groupGap);

      svg
        .append('text')
        .attr('x', MARGEN.left - 8)
        .attr('y', groupY + groupHeight / 2)
        .attr('text-anchor', 'end')
        .attr('dominant-baseline', 'central')
        .attr('font-size', '0.7rem')
        .attr('fill', '#475569')
        .text(label);

      const puVal = datosPaisUnico[label] || 0;
      const puBar = svg
        .append('rect')
        .attr('x', MARGEN.left)
        .attr('y', groupY)
        .attr('width', Math.max(0, x(puVal) - MARGEN.left))
        .attr('height', barHeight)
        .attr('fill', COLOR_PAIS_UNICO)
        .attr('rx', 3);
      addTooltipEvents(puBar, label, puVal, 'País-único');

      svg
        .append('text')
        .attr('x', x(puVal) + 4)
        .attr('y', groupY + barHeight / 2)
        .attr('dominant-baseline', 'central')
        .attr('font-size', '0.7rem')
        .attr('fill', '#1e293b')
        .attr('font-weight', '600')
        .text(puVal);

      if (grouped) {
        const mpVal = datosMultipais[label] || 0;
        const mpY = groupY + barHeight + barGap;
        const mpBar = svg
          .append('rect')
          .attr('x', MARGEN.left)
          .attr('y', mpY)
          .attr('width', Math.max(0, x(mpVal) - MARGEN.left))
          .attr('height', barHeight)
          .attr('fill', COLOR_MULTIPAIS)
          .attr('rx', 3);
        addTooltipEvents(mpBar, label, mpVal, 'Multi-país');

        svg
          .append('text')
          .attr('x', x(mpVal) + 4)
          .attr('y', mpY + barHeight / 2)
          .attr('dominant-baseline', 'central')
          .attr('font-size', '0.7rem')
          .attr('fill', '#1e293b')
          .attr('font-weight', '600')
          .text(mpVal);
      }
    });
  }, [allLabels, datosPaisUnico, datosMultipais, grouped]);

  if (allLabels.length === 0) return null;

  return (
    <div className="grafico-barras">
      <div ref={tooltipRef} className="grafico-tooltip" />
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default GraficoBarras;
