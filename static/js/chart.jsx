const Chart = () => {
  
  const chartConfig = {
    type: 'bar',
    data: {
      labels: ['a', 'b', 'c'],
      datasets: [
        {data: [2,4,6]}
      ]
    }
  }
  const chartContainer = useRef(null);
  const [chartInstance, setchartInstance] = useState(null);

  // useEffect(() => {
  //   if (chartContainer && chartContainer.current) {
  //     const newChartInstance = new Chart()
  //   }
  // })

  const newChartInstance = new Chart(chartContainer.current, chartConfig)
  return (
    <canvas ref={chartContainer}></canvas>

  )
}