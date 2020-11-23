// Chart component to track goal-ratings trends over time
const RatingsChart = (props) => {

  const [chartData, setChartData] = React.useState({});

  console.log('chartData: ', chartData);

  const fetchWeekRatings = async () => {
    fetch(`/week-goal-ratings/${props.isLoggedIn}`)
    .then(response => response.json())
    .then(data => {
      const ratingsDatasets = [];
      for (const [key, value] of Object.entries(data)) {
        ratingsDatasets.push({
          label: key,
          data: Object.values(value),
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
        });
      };
      const goalRatingsData = {
        labels: Object.keys(data[3]),
        datasets: ratingsDatasets
      }
      setChartData(goalRatingsData);
    });
  }

  React.useEffect(() => {
    fetchWeekRatings();
  }, []);

  

  return (
    <div className="chart-test-page">
      {/* <canvas id="test-chart"></canvas>
      <div id="bar-chart">{newChartInstance}</div> */}
      <Line data={chartData}></Line>
    </div>
  );
};