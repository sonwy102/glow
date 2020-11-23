// Chart component to track goal-ratings trends over time
// TODO: get code review on data requesting/handling/processing/plotting
// TODO: integrate with profile eventually
// TODO: plot monthtly graph + render when 'This Month' button is clicked
// TODO: plot yearly graph + render when 'This Year' button is clicked
// TODO: fix weekly chart - only showing 3 days worth of data for now
const RatingsChart = (props) => {

  const [chartData, setChartData] = React.useState({});

  console.log('chartData: ', chartData);

  const fetchWeekRatings = async () => {
    fetch(`/week-goal-ratings/${props.isLoggedIn}`)
    .then(response => response.json())
    .then(data => {
      const ratingsDatasets = [];
      for (const [goalName, goalRatings] of Object.entries(data)) {
        ratingsDatasets.push({
          label: goalName,
          data: Object.values(goalRatings),
          fill: true,

          // TODO: fix this to generate different colors for each dataset dynamically
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
        });
      };
      const goalRatingsData = {

        // TODO: fix this to be dynamic
        labels: Object.keys(data['Irritation']),
        datasets: ratingsDatasets
      }
      setChartData(goalRatingsData);
    });
  }

  React.useEffect(() => {
    fetchWeekRatings();
  }, []);

  
  if (!props.isLoggedIn) {
    // redirect user to login page
    history.push("/login");
  }
  return (
    <div className="chart-test-page">
      {/* <canvas id="test-chart"></canvas>
      <div id="bar-chart">{newChartInstance}</div> */}
      <Line data={chartData}></Line>
    </div>
  );
};