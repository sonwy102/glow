const IngredientChart = (props) => {

  const d3Container = React.useRef(null);

  console.log('d3 container: ', d3Container.current)
  React.useEffect(() => {
    if (props.data && d3Container.current) {
      const svg = d3
        .select(d3Container.current)
          .attr('width', 1000)
          .attr('height', 1000)
          .style("style", "1px solid black")
    }
  }, []);

  React.useEffect(() => {
    draw();
  }, [props.data])

  const draw = () => {
    
    const svg = d3.select(d3Container.current);

    const radius = 500;

    const root = d3.partition().size([2 * Math.PI, radius])
      (d3.hierarchy(props.data)
        .copy()
        .sum(d=>d.value)
        .sort((a, b) => b.value - a.value));

    const color = d3.scaleOrdinal(
      d3.quantize(d3.interpolateRainbow, props.data.children.length + 1)
    );

    const format = d3.format(",d");

    const arc = d3
      .arc()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius / 2)
      .innerRadius((d) => d.y0)
      .outerRadius((d) => d.y1 - 1);

    svg
      .append("g")
      .attr("fill-opacity", 0.6)
      .selectAll("path")
      .data(root.descendants().filter((d) => d.depth))
      .join("path")
      .attr("fill", (d) => {
        while (d.depth > 1) d = d.parent;
        return color(d.data.name);
      })
      .attr("d", arc)
      .attr("transform", "translate (500, 500)")
      .append("title")
      .text(
        (d) =>
          `${d
            .ancestors()
            .map((d) => d.data.name)
            .reverse()
            .join("/")}\n${format(d.value)}`
      );
      
    svg
      .append("g")
      .attr("transform", ("translate (500, 500)"))
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .attr("font-family", "sans-serif")
      .selectAll("text")
      .data(
        root
          .descendants()
          .filter((d) => d.depth && ((d.y0 + d.y1) / 2) * (d.x1 - d.x0) > 10)
      )
      .join("text")
      .attr("transform", function (d) {
        const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
        const y = (d.y0 + d.y1) / 2;
        return `rotate(${
          x - 90
        }) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
      })
      .attr("dy", "0.35em")
      .text((d) => d.data.name);
  };

  return (
    <div>
      <svg ref={d3Container}>

      </svg>
    </div>
  );
};
