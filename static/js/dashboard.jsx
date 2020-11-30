// Dashboard component
// // TODO: make it accessible to logged in user only
// // TODO: render next to (to the right of) profile
// // TODO: make get request to server to fetch data trends
// // TODO: render progress chart with chart.js
// // TODO: configure URL appropriately

const Dashboard = (props) => {
  const [productHighlight, setProductHighlight] = React.useState({
    product_count: 0,
    product_data: {'loading name': 'loading count...'},
  });
  const [daysHighlight, setDaysHighlight] = React.useState({
    routine_count: 0,
    routine_ratio: {'loading routine': 'loading routine ratio...'}
  });
  const [goalsHighlight, setGoalsHighlight] = React.useState({
    goal_count: 0,
    goal_data: ['loading goal data...']
  });
  const [ingHighlight, setIngHighlight] = React.useState({
    ing_count: 0,
    ing_data: { "loading name": "loading count..." }
  });

  console.log('productHighLight: ', productHighlight);
  console.log('product data: ', productHighlight.product_data);
  console.log('goalsHighlight: ',goalsHighlight);
  console.log("ingHighlight: ", ingHighlight);



  const fetchUserHighlights = async () => {
    fetch(`/get-highlights/${props.isLoggedIn}`)
    .then((response) => response.json())
    .then((data) => {
      setProductHighlight(data.productHighlight);
      setDaysHighlight(data.daysHighlight);
      setGoalsHighlight(data.goalsHighlight);
      setIngHighlight(data.ingHighlight);
    });
  }
  
  React.useEffect(() => {
    fetchUserHighlights();
  }, []);
  
  if (!props.isLoggedIn) {
    // redirect user to login page
    history.push("/login");
  }
  return (
    <div className="dashboard-page">
      <div className="user-profile-section">
        <Profile
          isLoggedIn={props.isLoggedIn}
          userInfo={props.userInfo}
          setUserInfo={props.setUserInfo}
        ></Profile>
      </div>
      <div className="header">
        <h2>My Dashboard</h2>
      </div>
      <div className="highlights-section">
        <div className="subheader">
          <h4>Highlights</h4>
        </div>
        <div className="product-highlight">
          {productHighlight.product_count} products in my routine
          {Object.keys(productHighlight.product_data).map((productName) => (
            <li>{productName}: {productHighlight.product_data[productName]}</li>
          ))}
        </div>
            
        <div className="ing-highlight">
          {ingHighlight.ing_count} ingredients in my routine
          {Object.keys(ingHighlight.ing_data).map((ingName) => (
            <li>{ingName}: {ingHighlight.ing_data[ingName]}</li>
          ))}
        </div>

        <div className="days-highlight">
          {daysHighlight.routine_count} days of skincare
          <RoutineRatioChart 
            routineRatioKeys={Object.keys(daysHighlight.routine_ratio)}
            routineRatioValues={Object.values(daysHighlight.routine_ratio)}
          />
        </div>

        <div className="goal-highlight">
          {goalsHighlight.goal_count} skin health goals
          {goalsHighlight.goal_data.map((goal) => 
            <li>{goal.name}</li>
          )}

        </div>
      </div>

      <div className="chart-section">
        <div className="subheader">
          <h4>Your Skin Health at a Glance</h4>
        </div>
        <RatingsChart isLoggedIn={props.isLoggedIn} />
      </div>
    </div>
  );
}