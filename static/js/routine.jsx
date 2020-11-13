// Routine Component for user to add a journal entry of their skincare routine

// // TODO: build a form with date, am/pm, products used, goals check-in
// // TODO: make a get request to db to pre-populate forms with latest values
// TODO: make a post request to db when the user submits form 
    // TODO: make a flask server to handle post request
    // TODO: create routine, routineProducts, userGoalEntry records in db
// TODO: make component accessible only when user's logged in
// TODO: set up appropriate routing in app.jsx and server.py and index.html

const Routine = (props) => {

  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  
  $(document).ready(function () {
    $(".js-basic-multiple").select2();
  });

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

  return (
    <div className="routine-page">
      <form className="routine-form">
        <h2>Your Routine Today</h2>

        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="radio-AM-PM"
              id="radio-AM"
              value="AM"
              checked
            />
            <label className="form-check-label" htmlFor="radioAM">
              AM
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="radio-AM-PM"
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
            name="journal-date"
            required
            defaultValue={date}
            // onChange={handleInputChange}
          ></input>
        </div>

        <div className="form-group">
          <h3>Products you used today </h3>

          <select
            className="js-basic-multiple"
            name="products-used"
            multiple="multiple"
          >
            {latestProducts.map((result) => (
              <option value={result.product}>{result.product}</option>
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
            id="notes-text-area"
            rows="3"
          ></textarea>

          <label htmlFor="photoFileInput">Photos</label>
          <input
            type="file"
            className="form-control-file"
            id="photo-input"
          ></input>
        </div>

        <button className="btn btn-lg btn-primary btn-block" type="submit">
            Save
        </button>
      </form>
    </div>
  );
}
