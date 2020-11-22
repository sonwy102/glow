// Dashboard component
// TODO: make it accessible to logged in user only
// TODO: render next to (to the right of) profile
// TODO: make get request to server to fetch data trends
// TODO: render progress chart with chart.js
// TODO: configure URL appropriately

const Dashboard = (props) => {
  const [productHighlight, setProductHighlight] = React.useState({});
  const [daysHighlight, setDaysHighlight] = React.useState({});
  const [goalsHighlight, setGoalsHighlight] = React.useState({});

  const fetchUserHighlights = async () => {
    fetch(`/get-highlights/${props.isLoggedIn}`)
    .then((response) => response.json())
    .then((data) => {
      setProductHighlight(data.productHighlight);
      setDaysHighlight(data.daysHighlight);
      setGoalsHighlight(data.goalsHighlight);
    });
  }
  
  React.useEffect(() => {
    fetchUserHighlights();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="header">My Dashboard</div>
      <div className="highlights-section">
        <div className="product-highlight">
          {productHighlight.product_count} products in my routine
        </div>
        <div className="days-highlight">
          {daysHighlight.product_count} days of skincare
        </div>
        <div className="goal-highlight">
          {goalsHighlight.product_count} skin health goals
        </div>
      </div>
      <div className="chart-section"></div>
    </div>
  );
}