// Dashboard component
// // TODO: make it accessible to logged in user only
// // TODO: render next to (to the right of) profile
// // TODO: make get request to server to fetch data trends
// // TODO: render progress chart with chart.js
// // TODO: configure URL appropriately

const Dashboard = (props) => {

  const [profileView, setProfileView] = React.useState(false);
  
  const [ingTree, setIngTree] = React.useState({'data': 'loading...', 'children': 'loading...'});
  console.log('ingTree: ', ingTree)

  const [daysHighlight, setDaysHighlight] = React.useState({
    routine_count: 0,
    routine_ratio: { "loading routine": "loading routine ratio..." },
  });

  const [productHighlight, setProductHighlight] = React.useState({
    product_count: 0,
    product_data: { "loading name": "loading count..." },
  });

  const [ingHighlight, setIngHighlight] = React.useState({
    ing_count: 0,
  });

  console.log('product highlight: ', productHighlight);

  const fetchUserHighlights = async () => {
    fetch(`/get-highlights/${props.isLoggedIn}`)
      .then((response) => response.json())
      .then((data) => {
        setProductHighlight(data.productHighlight);
        setDaysHighlight(data.daysHighlight);
        setIngHighlight(data.ingHighlight);
      });
  };

  const fetchIngTree = async () => {
    fetch("/ingredient-analysis.json")
      .then((response) => response.json())
      .then((data) => {
        setIngTree(data);
      });
  };
  
  React.useEffect(() => {
    fetchUserHighlights();
    fetchIngTree();
  }, []);
  
  if (!props.isLoggedIn) {
    // redirect user to login page
    history.push("/");
  }
  return (
    <Container fluid className="dashboard page">
      <Row>
        <Col lg={3} className="user-profile page no-top-padding">
          {profileView ? (
            <EditProfile 
              isLoggedIn={props.isLoggedIn}
              userInfo={props.userInfo}
              setUserInfo={props.setUserInfo}
              profileView={setProfileView}
            ></EditProfile>
          ) : (
            <Profile
              isLoggedIn={props.isLoggedIn}
              userInfo={props.userInfo}
              setUserInfo={props.setUserInfo}
              profileView={setProfileView}
            ></Profile>
          )}            
        </Col>

        <Col lg={6} className="dashboard">
          <div className="header">My Skin at a Glance</div>

          <RoutineHighlights
            daysHighlight={daysHighlight}
            userInfo={props.userInfo}
          />

          <Container className="dashboard chart section">
            <Tabs defaultActiveKey="ratings-chart" id="chart-tabs">
              <Tab eventKey="ratings-chart" title="Goals">
                <RatingsChart isLoggedIn={props.isLoggedIn} />
              </Tab>
              <Tab eventKey="ing-chart" title="Ingredients">
                <IngredientChart data={ingTree} />
              </Tab>
            </Tabs>
          </Container>
        </Col>

        <Col lg={3} className="dashboard">
          <ProductHighlights
            productHighlight={productHighlight}
            ingHighlight={ingHighlight}
          ></ProductHighlights>
        </Col>
      </Row>
    </Container>
  );
}