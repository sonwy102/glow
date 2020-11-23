// Dashboard component
// // TODO: make it accessible to logged in user only
// TODO: render next to (to the right of) profile
// // TODO: make get request to server to fetch data trends
// // TODO: render progress chart with chart.js
// // TODO: configure URL appropriately

const Dashboard = (props) => {
  const [productHighlight, setProductHighlight] = React.useState({});
  const [daysHighlight, setDaysHighlight] = React.useState({});
  const [goalsHighlight, setGoalsHighlight] = React.useState([]);

  console.log(productHighlight);


  const fetchUserHighlights = async () => {
    fetch(`/get-highlights/${props.isLoggedIn}`)
    .then((response) => response.json())
    .then((data) => {
      setProductHighlight(data.productHighlight);
      setDaysHighlight(data.daysHighlight);
    });
  }
  
  React.useEffect(() => {
    fetchUserHighlights();
    setGoalsHighlight(props.userInfo.goals)
  }, []);
  
  if (!props.isLoggedIn) {
    // redirect user to login page
    history.push("/login");
  }
  return (
    <div className="dashboard-page">
      <div className="header">My Dashboard</div>
      <div className="highlights-section">
        <div className="product-highlight">
          {productHighlight.product_count} products in my routine
        </div>
        <div className="days-highlight">
          {daysHighlight.routine_count} days of skincare
        </div>
        <div className="goal-highlight">
          {goalsHighlight.length} skin health goals
        </div>
      </div>
      <div className="chart-section">
        <RatingsChart isLoggedIn={props.isLoggedIn} />
      </div>
    </div>
  );
}