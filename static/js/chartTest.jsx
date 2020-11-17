const ChartTest = () => {
  
  // const chartConfig = {
  //   type: 'bar',
  //   data: {
  //     labels: ['a', 'b', 'c'],
  //     datasets: [
  //       {data: [2,4,6]}
  //     ]
  //   }
  // }
  // const chartContainer = useRef(null);
  // const [chartInstance, setChartInstance] = React.useState(null);

  // useEffect(() => {
  //   if (chartContainer && chartContainer.current) {
  //     const newChartInstance = new Chart()
  //   }
  // })

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#742774",
      },
    ],
  };

  return (
    <div className="chart-test-page">
      {/* <canvas id="test-chart"></canvas>
      <div id="bar-chart">{newChartInstance}</div> */}
      <Line data={data}></Line>
    </div>
  );
};