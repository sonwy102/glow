// Routine Component for user to add a journal entry of their skincare routine

// // TODO: build a form with date, am/pm, products used, goals check-in
// // TODO: make a get request to db to pre-populate forms with latest values
// TODO: make a post request to db when the user submits form 
    // TODO: make a flask server to handle post request
    // TODO: create routine, routineProducts, userGoalEntry records in db
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

  React.useEffect(() => {
    $.get("/routine-products.json", { uid: props.isLoggedIn }, (res) => {
      setLatestProducts(res);
      console.log(latestProducts);
    });
    $.get("/goal-ratings.json", { uid: props.isLoggedIn }, (res) => {
      setLatestGoalRatings(res);
      console.log(latestGoalRatings);
    });
  }, []);

  // handle form input change and submit
  // TODO: fix select2 issue!! how to best organize routineState here?
  const [routineState, setRoutineState] = React.useState({
    journalTime: "",
    journalDate: today_date,
    products: [],
    notes: null,
    photo: null,
  });

  // const [selectedProducts, setSelectedProducts] = React.useState([]);
  // jQuery for select2 library
  // TODO: use React-select instead!
  $(document).ready(function () {
    const multiSelect = $(".js-basic-multiple").select2();
    multiSelect.on("change.select2", (evt) => {
      // setSelectedProducts((prevState) => (prevState.push(evt.params.data)));
      // console.log(selectedProducts);
      console.log(evt.params.data)
    });
  });

  console.log(routineState);

  const handleInputChange = (evt) => {
    evt.preventDefault();
    const name = evt.target.name;
    const value = evt.target.value;
    console.log({ [name]: value });
    setRoutineState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const formData = {
      uid: props.isLoggedIn,
      journalTime: routineState.journalTime,
      journalDate: routineState.journalDate,
      products: routineState.products,
      notes: routineState.notes,
      photo: routineState.photo
    }

    $.post('/add-routine.json', formData, (res) => {
      if (res.status_code === 200) {
        console.log(res);
        history.push(`/profile?user=${props.isLoggedIn}`); 
      }
    });
  }
  
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

          <select
            className="js-basic-multiple"
            name="products"
            multiple="multiple"
          >
            {latestProducts.map((result) => (
              <option value={result.productID}>{result.productName}</option>
            ))}
          </select>

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
                name="goals"
                id="formControlRange"
                max="10"
                defaultValue={result.rating}
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

        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
