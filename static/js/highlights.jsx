const UserHighlights = (props) => {
  const [productHighlight, setProductHighlight] = React.useState({
    product_count: 0,
    product_data: { "loading name": "loading count..." },
  });
  const [daysHighlight, setDaysHighlight] = React.useState({
    routine_count: 0,
    routine_ratio: { "loading routine": "loading routine ratio..." },
  });
//   const [goalsHighlight, setGoalsHighlight] = React.useState({
//     goal_count: 0,
//     goal_data: ["loading goal data..."],
//   });
  const [ingHighlight, setIngHighlight] = React.useState({
    ing_count: 0
  });

  // console.log('productHighLight: ', productHighlight);
  // console.log('product data: ', productHighlight.product_data);
  // console.log('goalsHighlight: ',goalsHighlight);
  // console.log("ingHighlight: ", ingHighlight);

  const fetchUserHighlights = async () => {
    fetch(`/get-highlights/${props.isLoggedIn}`)
      .then((response) => response.json())
      .then((data) => {
        setProductHighlight(data.productHighlight);
        setDaysHighlight(data.daysHighlight);
        // setGoalsHighlight(data.goalsHighlight);
        setIngHighlight(data.ingHighlight);
      });
  };

  React.useEffect(() => {
    fetchUserHighlights();
  }, []);

  return (
    <div className="highlights-section">
      <div className="subheader">
        <h4>Highlights</h4>
      </div>
      <div className="product-highlight">
        {productHighlight.product_count} products in my routine
        {Object.keys(productHighlight.product_data).map((productName) => (
          <li>
            {productName}: {productHighlight.product_data[productName]}
          </li>
        ))}
      </div>

      <div className="ing-highlight">
          {ingHighlight.ing_count} ingredients in my routine
      </div>

      <div className="days-highlight">
        {daysHighlight.routine_count} days of skincare
        <RoutineRatioChart 
            routineRatioKeys={Object.keys(daysHighlight.routine_ratio)}
            routineRatioValues={Object.values(daysHighlight.routine_ratio)}
        />
      </div>

      <div className="goal-highlight">
        {props.userInfo.goals.length} skin health goals
        {/* {goalsHighlight.goal_data.map((goal) => (
          <li>{goal.name}</li>
        ))} */}
      </div>
    </div>
  );
};