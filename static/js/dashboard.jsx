// Dashboard component
// // TODO: make it accessible to logged in user only
// // TODO: render next to (to the right of) profile
// // TODO: make get request to server to fetch data trends
// // TODO: render progress chart with chart.js
// // TODO: configure URL appropriately

const Dashboard = (props) => {
  
  const [ingTree, setIngTree] = React.useState({'data': 'loading...', 'children': 'loading...'});
  console.log('ingTree: ', ingTree)


  const fetchIngTree = async () => {
    fetch("/ingredient-analysis.json")
      .then((response) => response.json())
      .then((data) => {
        setIngTree(data);
      });
  };
  
  React.useEffect(() => {
    fetchIngTree();
  }, []);
  
  if (!props.isLoggedIn) {
    // redirect user to login page
    history.push("/login");
  }
  return (
    <Container fluid className="dashboard-page">
      <Row>
        <Col lg={3} className="user-profile">
          <Profile
            isLoggedIn={props.isLoggedIn}
            userInfo={props.userInfo}
            setUserInfo={props.setUserInfo}
          ></Profile>
        </Col>

        <Col lg={6} className="dashboard">
          <h1>My Dashboard</h1>
          <UserHighlights
            isLoggedIn={props.isLoggedIn}
            userInfo={props.userInfo}
          ></UserHighlights>
          <h4>Your Skin Health at a Glance</h4>
          <RatingsChart isLoggedIn={props.isLoggedIn} />
        

          {/* <div className="ing-chart">
            <IngredientChart data={ingTree} />
          </div>

          <div className="chart-section">
            <div className="subheader">
              <h4>Your Skin Health at a Glance</h4>
            </div>
          </div> */}
        </Col>
        <Col lg={3} className="product-analysis">
          {/* <IngredientChart data={ingTree} /> */}
          <p>test element</p>
        </Col>
      </Row>
    </Container>
  );
}