// Chart component to track goal-ratings trends over time
// // TODO: get code review on data requesting/handling/processing/plotting
// // TODO: integrate with profile eventually
// // TODO: plot monthly graph + render when 'This Month' button is clicked
// // TODO: plot yearly graph + render when 'This Year' button is clicked
// // TODO: fix weekly chart - only showing 3 days worth of data for now
const RatingsChart = (props) => {

  const [weekChartData, setWeekChartData] = React.useState({});
  const [monthChartData, setMonthChartData] = React.useState({});
  const [yearChartData, setYearChartData] = React.useState({});
  const [viewOption, setViewOption] = React.useState("week");

  console.log('Month chart data: ', monthChartData);

  const colors = ["#958079", "#d8c1b7"];
  const options = {
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            min: 0,
            max: 10,
            stepSize: 5,
          },   
        },
      ],
    },
  };
  
  const fetchWeekRatings = async () => {
    fetch(`/goal-ratings-trend/${props.isLoggedIn}/7`)
    .then(response => response.json())
    .then(data => {
      const ratingsDatasets = [];
      const goalNames = [];
      for (const [i, goalEntryData] of Object.entries(data)) {
        goalNames.push(Object.keys(goalEntryData)[0]);
        ratingsDatasets.push({
          label: goalNames[i],
          data: Object.values(goalEntryData[Object.keys(goalEntryData)[0]]),
          fill: false,
          borderColor: colors[i],
        });
      };
      const goalRatingsData = {
        labels: Object.keys(data[0][goalNames[0]]),
        datasets: ratingsDatasets
      }
      setWeekChartData(goalRatingsData);
    });
  }

  const fetchMonthRatings = async () => {
    fetch(`/goal-ratings-trend/${props.isLoggedIn}/16`)
    .then(response => response.json())
    .then(data => {
      const ratingsDatasets = [];
      const goalNames = [];
      for (const [i, goalEntryData] of Object.entries(data)) {
        goalNames.push(Object.keys(goalEntryData)[0]);
        ratingsDatasets.push({
          label: goalNames[i],
          data: Object.values(goalEntryData[Object.keys(goalEntryData)[0]]),
          fill: false,
          borderColor: colors[i],
        });
      };
      const goalRatingsData = {
        labels: Object.keys(data[0][goalNames[0]]),
        datasets: ratingsDatasets,
      };
      setMonthChartData(goalRatingsData);
    });
  }

  const fetchYearRatings = async () => {
    fetch(`/goal-ratings-trend/${props.isLoggedIn}/12`)
    .then(response => response.json())
    .then(data => {
      const ratingsDatasets = [];
      const goalNames = [];
      for (const [i, goalEntryData] of Object.entries(data)) {
        goalNames.push(Object.keys(goalEntryData)[0]);
        ratingsDatasets.push({
          label: goalNames[i],
          data: Object.values(goalEntryData[Object.keys(goalEntryData)[0]]),
          fill: false,
          borderColor: colors[i],
        });
      };
      const goalRatingsData = {
        labels: Object.keys(data[0][goalNames[0]]),
        datasets: ratingsDatasets
      }
      setYearChartData(goalRatingsData);
    });
  }

  React.useEffect(() => {
    fetchWeekRatings();
    fetchMonthRatings();
    fetchYearRatings();
  }, []);

  const handleViewBtnChange = (val) => {
    setViewOption(val);
  };
  
  if (!props.isLoggedIn) {
    // redirect user to login page
    history.push("/login");
  }
  return (
    <div className="chart-section">
      <div className="goal-ratings chart-body">
        {viewOption === "week" && (
          <Line data={weekChartData} options={options}></Line>
        )}
        {viewOption === "month" && (
          <Line data={monthChartData} options={options}></Line>
        )}
        {viewOption === "year" && (
          <Line data={yearChartData} options={options}></Line>
        )}
      </div>

      <div className="chart-view-btns">
        <ToggleButtonGroup
          defaultValue="week"
          name="view-options"
          onChange={handleViewBtnChange}
        >
          <ToggleButton variant="flat" value="week">
            This Week
          </ToggleButton>
          <ToggleButton variant="flat" value="month">
            This Month
          </ToggleButton>
          <ToggleButton variant="flat" value="year">
            This Year
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
};