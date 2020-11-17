// Routine Component for user to add a journal entry of their skincare routine

// // TODO: build a form with date, am/pm, products used, goals check-in
// // TODO: make a get request to db to pre-populate forms with latest values
// // TODO: make a post request to db when the user submits form 
    // // TODO: make a flask server to handle post request
// // TODO: make component accessible only when user's logged in
// // TODO: set up appropriate routing in app.jsx and server.py and index.html

const Routine = (props) => {

  const history = useHistory();

  // get today's date
  const today = new Date();
  const today_date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  
  // get latest products and latest goal ratings to pre-populate form when page loads
  const [latestProducts, setLatestProducts] = React.useState([]);
  const [latestGoalRatings, setLatestGoalRatings] = React.useState([]);

  // ?? Is it right to use useLayoutEffect here?
  React.useLayoutEffect(() => {
    $.get("/routine-products.json", { uid: props.isLoggedIn }, (res) => {
      setLatestProducts(res);
    });
    $.get("/goal-ratings.json", { uid: props.isLoggedIn }, (res) => {
      setLatestGoalRatings(res);
    });
  }, []);

  // handle form input change and submit
  const goalsList = [];
  for (let g of latestGoalRatings) {
    goalsList.push({id: g.id, rating: g.rating});
  }
  console.log('goalsList:', goalsList);

  const productOptions = [];
  for (let p of latestProducts) {
    productOptions.push({ value: p.productID, label: p.productName });
  }
  console.log("options list: ", productOptions);
  // // TODO: fix select2 issue!! how to best organize routineState here?
  const [routineState, setRoutineState] = React.useState({
    journalTime: "",
    journalDate: today_date,
    products: [],
    goals: goalsList,
    notes: null,
    photo: null
  });

  console.log('latestproducts: ',latestProducts);
  console.log('latestGoals:', latestGoalRatings)

  const handleInputChange = (evt) => {
    evt.preventDefault();
    const name = evt.target.name;
    const value = evt.target.value;
    console.log({ [name]: value });
    setRoutineState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleProductChange = (evt) => {
    setRoutineState((prevState) => ({ ...prevState, products: evt}))
  };

  const handleGoalChange = (evt) => {
    evt.preventDefault();
    console.log("HANDLING GOAL CHANGE")
    let newGoalState = latestGoalRatings;
    for (let i in newGoalState) {
      console.log('i: ', i);
      console.log('evt target name:', evt.target.name, typeof(evt.target.name))
      console.log(
        "enwGoalState[i].id:",
        newGoalState[i].id,
        typeof newGoalState[i].id
      );
      if (parseInt(evt.target.name) === newGoalState[i].id) {
        newGoalState[i].rating = parseInt(evt.target.value);
        console.log('goal rating updated.', newGoalState[i].rating)
      }
    }
    console.log('newGoalState: ', newGoalState);
    setRoutineState((prevState) => ({...prevState, goals: newGoalState}));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const formData = {
      uid: props.isLoggedIn,
      journalTime: routineState.journalTime,
      journalDate: routineState.journalDate,
      products: routineState.products,
      goals: routineState.goals,
      notes: routineState.notes,
      photo: routineState.photo
    }

    console.log('formData: ', formData);

    $.post('/add-routine.json', JSON.stringify(formData), (res) => {
      if (res.status_code === 200) {
        console.log(res);
        history.push(`/profile?user=${props.isLoggedIn}`); 
      }
    });
  }
  
  console.log("routineState: ", routineState);

  if (!props.isLoggedIn) {
    
    console.log('redirecting to login page.', props.isLoggedIn)
    history.push('/login') 
  }
  return (
    <div className="routine-page" onSubmit={handleSubmit}>
      <form className="routine-form">
        <h2>Your Routine Today</h2>

        <div className="form-group" required onChange={handleInputChange}>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="journalTime"
              id="radio-AM"
              value="AM"
            />
            <label className="form-check-label" htmlFor="radioAM">
              AM
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="journalTime"
              id="radio-PM"
              value="PM"
            />
            <label className="form-check-label" htmlFor="radioPM">
              PM
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="journal-date-field">Date:</label>
          <input
            type="date"
            name="journalDate"
            required
            defaultValue={today_date}
            onChange={handleInputChange}
          ></input>
        </div>

        <div className="form-group">
          <h3>Products you used today </h3>

          <Select
            className="js-basic-multiple"
            name="products"
            isMulti
            options = {productOptions}
            onChange={handleProductChange}
          />
          {/* // TODO: what about new products that aren't in previous routine? */}
        
        </div>

        <div className="form-group">
          <h3>Check in with your goals.</h3>
          <p>How are you feeling about your goals?</p>

          {/* // // TODO: dynamically display user's goals with ajax request to db 
            // // TODO: pre-populate range value with latest value 
            // TODO: add tickmarks and labels on range later
            // TODO: add "update goals button" later  
          */}


          {latestGoalRatings.map((result) => (
            <React.Fragment>
              <label htmlFor="formControlRange">{result.name}</label>
              <input
                type="range"
                className="form-control-range"
                name={result.id}
                id="formControlRange"
                max="10"
                defaultValue={result.rating}
                onInput={handleGoalChange}
              ></input>
            </React.Fragment>
          ))}
        </div>

        <div className="form-group">
          <h3>Notes</h3>

          <label htmlFor="notesTextArea"></label>
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
        </div>

        <Button variant="primary" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
}
