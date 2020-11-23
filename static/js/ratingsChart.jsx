// Chart component to track goal-ratings trends over time
// TODO: get code review on data requesting/handling/processing/plotting
// TODO: integrate with profile eventually
// TODO: plot monthtly graph + render when 'This Month' button is clicked
// TODO: plot yearly graph + render when 'This Year' button is clicked
// TODO: fix weekly chart - only showing 3 days worth of data for now
const RatingsChart = (props) => {

  const [weekChartData, setWeekChartData] = React.useState({});

  console.log('Week chart data: ', weekChartData);

  const fetchWeekRatings = async () => {
    fetch(`/week-goal-ratings/${props.isLoggedIn}`)
    .then(response => response.json())
    .then(data => {
      const ratingsDatasets = [];
      const goalNames = [];
      for (const [i, goalEntryData] of Object.entries(data)) {
        goalNames.push(Object.keys(goalEntryData)[0]);
        ratingsDatasets.push({
          label: goalNames[i],
          data: Object.values(goalEntryData[Object.keys(goalEntryData)[0]]),
          fill: true,

          // TODO: fix this to generate different colors for each dataset dynamically
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
        });
      };
      const goalRatingsData = {
        // // TODO: fix this to be dynamic
        labels: Object.keys(data[0][goalNames[0]]),
        datasets: ratingsDatasets
      }
      setWeekChartData(goalRatingsData);
    });
  }

  // const fetchMonthRatings = async () => {

  // }

  React.useEffect(() => {
    fetchWeekRatings();
  }, []);

  
  if (!props.isLoggedIn) {
    // redirect user to login page
    history.push("/login");
  }
  return (
    <div className="chart-section">
      <div>
        <Line data={weekChartData}></Line>
      </div>

      <div className="chart-view-btns">
        {/* <Button variant="primary" onClick={}>
          This Week
        </Button>
        <Button variant="primary" onClick={}>
          This Month
        </Button>
        <Button variant="primary" onClick={}>
          This Year
        </Button> */}
      </div>
    </div>
  );
};