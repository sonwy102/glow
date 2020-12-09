// Routine Component for user to add a journal entry of their skincare routine

// // TODO: build a form with date, am/pm, products used, goals check-in
// // TODO: make a get request to db to pre-populate forms with latest values
// // TODO: make a post request to db when the user submits form 
    // // TODO: make a flask server to handle post request
// // TODO: make component accessible only when user's logged in
// // TODO: set up appropriate routing in app.jsx and server.py and index.html
// TODO: switch form to React-Bootstrap Form

const Routine = (props) => {

  const history = useHistory();

  // get today's date
  const today = new Date();
  const today_date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  
  // get latest products and latest goal ratings to pre-populate form when page loads
  const [latestProducts, setLatestProducts] = React.useState([]);
  const [latestGoalRatings, setLatestGoalRatings] = React.useState([]);
  const [routineState, setRoutineState] = React.useState({
    journalTime: "AM",
    journalDate: today_date,
    products: [],
    goals: latestGoalRatings,
    notes: null,
    photo: null
  });

  console.log('routine state: ', routineState);

  const fetchProductData = async () => {
    fetch(`/routine-products.json/${props.isLoggedIn}`)
      .then((response) => response.json())
      .then((data) => {
        const productData = [];
        for (const product of data) {
          productData.push(product);
        }
        setLatestProducts(productData);
      });
  }

  const fetchGoalRatingData = async () => {
    fetch(`/goal-ratings.json/${props.isLoggedIn}`)
      .then((response) => response.json())
      .then((data) => {
        const goalRatingData = [];
        for (const rating of data) {
          goalRatingData.push(rating);
        }
        setLatestGoalRatings(goalRatingData);
        setRoutineState((prevState) => ({ ...prevState, goals: goalRatingData }));
      });
  };

  React.useEffect(() => {
    fetchProductData();
    fetchGoalRatingData();
  }, []);

  const productOptions = [];
  for (let p of latestProducts) {
    productOptions.push({ value: p.productID, label: p.productName });
  }
  console.log("options list: ", productOptions);
  // // TODO: fix select2 issue!! how to best organize routineState here?
  
  const handleInputChange = (evt) => {
    evt.preventDefault();
    const name = evt.target.name;
    const value = evt.target.value;
    console.log({ [name]: value });
    setRoutineState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleTimeBtnChange = (val) => {
    setRoutineState((prevState) => ({ ...prevState, journalTime: val }));
  };

  const handleProductChange = (evt) => {
    setRoutineState((prevState) => ({ ...prevState, products: evt}))
  };

  const handleGoalChange = (evt) => {
    evt.preventDefault();
    let newGoalState = latestGoalRatings;
    for (let i in newGoalState) {
      if (parseInt(evt.target.name) === newGoalState[i].id) {
        newGoalState[i].rating = parseInt(evt.target.value);
      }
    }
    setRoutineState((prevState) => ({...prevState, goals: newGoalState}));
  };

  const postRoutine = async () => {
    fetch(`/add-routine.json/${props.isLoggedIn}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(routineState)
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.status_code === 200) {
        history.push(`/dashboard?user=${props.isLoggedIn}`);
      }
    })
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    postRoutine();
  };

  if (!props.isLoggedIn) {
    
    history.push('/login') 
  }
  return (
    <div className="routine body">
      <Container className="routine page">
        <Row>
          <div className="header center-text-align">Your Routine Today</div>
        </Row>

        <Row className="routine formbox">
          <Col lg={12} className="routine-form">
            <Row className="journal-time-date-group section">
              <Col lg={3} className="journal-time-group">
                <div className="label">TIME</div>
                <ToggleButtonGroup
                  type="radio"
                  defaultValue="AM"
                  name="journalTime"
                  onChange={handleTimeBtnChange}
                >
                  <ToggleButton variant="flat" value="AM">
                    AM
                  </ToggleButton>
                  <ToggleButton variant="flat" value="PM">
                    PM
                  </ToggleButton>
                </ToggleButtonGroup>
              </Col>

              <Col lg={3} className="journal-date-group">
                <div className="label">DATE</div>
                <input
                  type="date"
                  className="btn btn-flat journal-date-field left-text-align"
                  name="journalDate"
                  required
                  defaultValue={today_date}
                  onChange={handleInputChange}
                ></input>
              </Col>
            </Row>

            <Row className="products-group section">
              <Col className="products-group">
                <div className="subheader-lg">Products you used today </div>
                <Select
                  className="js-basic-multiple"
                  name="products"
                  isMulti
                  options={productOptions}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: "hsl(0, 0%, 90%)",
                      primary: "#d7c0b6",
                    },
                  })}
                  onChange={handleProductChange}
                />
                {/* // TODO: what about new products that aren't in previous routine? 
                // TODO: look up debounce */}
              </Col>
            </Row>

            <Row className="goals-group section">
              <Col className="goals-group">
                <div className="subheader-lg">Check in with your goals.</div>
                <div className="label">
                  HOW ARE YOU FEELING ABOUT YOUR GOALS?
                </div>

                {/* // // TODO: dynamically display user's goals with ajax request to db 
              // // TODO: pre-populate range value with latest value 
              // TODO: add tickmarks and labels on range later
              // TODO: add "update goals button" later  
            */}

                {latestGoalRatings.map((result) => (
                  <div className="goals-group subsection">
                    <div className="goal-rating-field">{result.name}</div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="1"
                      className="form-control-range custom-range"
                      name={result.id}
                      defaultValue={result.rating}
                      onInput={handleGoalChange}
                    ></input>
                    <div className="label tickmarks">
                      <p>0</p>
                      <p>2</p>
                      <p>4</p>
                      <p>6</p>
                      <p>8</p>
                      <p>10</p>
                    </div>
                  </div>
                ))}
              </Col>
            </Row>

            <Row className="notes-group section no-top-padding">
              <Col className="notes-group">
                <div className="subheader-lg">Notes</div>
                <div className="label">REFLECT ON TODAY'S JOURNEY.</div>
                <textarea
                  className="form-control"
                  name="notes"
                  id="notes-text-area"
                  rows="3"
                  onChange={handleInputChange}
                ></textarea>

                <label htmlFor="photoFileInput"></label>
                <input
                  type="file"
                  className="form-control-file"
                  name="photo"
                  id="photo-input"
                  onChange={handleInputChange}
                ></input>
              </Col>
            </Row>

            <Row className="button-group section">
              <Col className="button-group">
                <Button
                  variant="flat-important"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
