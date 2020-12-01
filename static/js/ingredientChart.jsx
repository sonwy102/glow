const IngredientChart = (props) => {

  const d3Container = React.useRef(null);
  

  React.useEffect(() => {
    if (props.data && d3Container.current) {
      const svg = d3.select(d3Container.current)
        .attr("width", 600)
        .attr("height", 400)
        .style('border', '1px solid black')    
    }
  }, []);

  React.useEffect(() => {
    draw();
  }, [props.data])

  const draw = () => {
    const svg = d3.select(d3Container.current);

    const root = d3
      .hierarchy(props.data)
      .copy()
      .count()
      .sort((a, b) => b.value - a.value);
    
    partition(root);

    const nodes = svg.selectAll("rect").data(root.leaves());

    nodes
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return d.x0;
      })
      .attr("y", function (d) {
        return d.y0;
      })
      .attr("width", function (d) {
        return d.x1 - d.x0;
      })
      .attr("height", function (d) {
        return d.y1 - d.y0;
      })
      .style("stroke", "black");
      

    nodes.exit().remove();
  };

  return (
    <div>Test
      <svg ref={d3Container}>

      </svg>
    </div>
  );
};
