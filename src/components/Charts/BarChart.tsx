import * as d3 from 'd3';
import { ScaleBand, ScaleLinear, ScaleOrdinal, Selection } from 'd3';
import { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import '../../App.css';
import { Context, Legislator } from '../../context/context';

export interface Category {
  name: string;
  labelFormat: 'currency' | 'percentage' | 'number';
}

interface BarChartProps {
  legislators: Legislator[];
  category: Category;
  labelFormat: 'currency' | 'percentage' | 'number';
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Chart = styled.svg`
  width: 100%;
`;

function createLabels(
  chart: Selection<SVGGElement, unknown, null, undefined>,
  x: ScaleBand<string>,
  y: ScaleLinear<number, number>,
  data: Legislator[],
  selectedCategory: Category
) {
  chart
    .selectAll('.label')
    .data(data)
    .enter()
    .append('text')
    .attr('class', 'label')
    .attr('text-anchor', 'middle')
    .attr('x', (d) => (x(d.姓名) ?? 0) + x.bandwidth() / 2)
    .attr('y', (d) => y(d[selectedCategory.name] as number) - 5)
    .text((d) => {
      switch (selectedCategory.labelFormat) {
        case 'currency':
          return d[selectedCategory.name].toLocaleString('zh-Hant', {
            style: 'currency',
            currency: 'NTD',
            maximumFractionDigits: 0,
          });
        case 'percentage':
          return `${d[selectedCategory.name]}%`;
        default:
          return d[selectedCategory.name].toLocaleString();
      }
    })
    .attr('fill', '#676B6B');
}

function createBars(
  chart: Selection<SVGGElement, unknown, null, undefined>,
  x: ScaleBand<string>,
  y: ScaleLinear<number, number>,
  color: ScaleOrdinal<string, unknown, never>,
  height: number,
  legislators: Legislator[],
  category: Category
) {
  chart
    .selectAll('.bar')
    .data(legislators)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => x(d.姓名) ?? 0)
    .attr('width', x.bandwidth() / 2)
    .attr('transform', `translate(${x.bandwidth() / 4})`)
    .attr('y', height)
    .attr('height', 0)
    .transition()
    .duration(800)
    .attr('y', (d) => y(d[category.name] as number))
    .attr('height', (d) => height - y(d[category.name] as number))
    .attr('fill', (d) => color(d.姓名) as string)
    .end()
    .then(() => {
      createLabels(chart, x, y, legislators, category);
    });
}

export default function BarChart({ legislators, category }: BarChartProps) {
  const { initialLegislators } = useContext(Context);
  const chartRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const margin = { top: 30, right: 70, bottom: 90, left: 90 };
    let width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);

    if (chartRef.current && legislators.length > 0) {
      const svg = d3
        .select(chartRef.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

      svg.selectAll('g').remove();

      if (wrapperRef.current) {
        const currentWidth = wrapperRef.current.offsetWidth;
        width = currentWidth - margin.left - margin.right;

        x.range([0, width]);

        svg
          .attr('preserveAspectRatio', 'xMinYMin meet')
          .attr(
            'viewBox',
            `0 0 ${width + margin.left + margin.right} ${
              height + margin.top + margin.bottom
            }`
          )
          .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);
      }

      const chart = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      x.domain(legislators.map((d) => d.姓名 as string));
      y.domain([
        0,
        d3.max(initialLegislators.current, (d) => d[category.name] as number) ||
          0,
      ]);

      chart
        .append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .attr('transform', 'rotate(-45)');

      chart.append('g').call(d3.axisLeft(y));

      const color = d3
        .scaleOrdinal()
        .domain(legislators.map((d) => d.姓名 as string))
        .range(d3.schemeCategory10);

      createBars(chart, x, y, color, height, legislators, category);
    }
  }, [legislators, category.name]);

  return (
    <Wrapper ref={wrapperRef}>
      <Chart ref={chartRef} />
    </Wrapper>
  );
}
