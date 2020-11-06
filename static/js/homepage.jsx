"use strict";

function Homepage() {
  return (
    <React.Fragment>
        <h2>Glow Homepage</h2>
        <a href="/login">Log In</a>
    </React.Fragment>
  );
}

ReactDOM.render(<Homepage />, document.querySelector("#app"));
