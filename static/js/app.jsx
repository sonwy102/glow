"use strict";


function App() {
    const [userState, setUserState] = React.useState(null)
    return (
      <Router>
        <div className="App">
          <h2 className="App-title">Glow Homepage</h2>
          <Link to="/login">Log In</Link>
          <Link to="/register">Sign Up</Link>
        </div>
        <div className="product-search-engine">
          <Home />
        </div>
        <div>
          <Switch>
            <Route path="/login">
              <Login ensureLogIn={setUserState} />
            </Route>
            <Route path="/register">
              <Register ensureLogIn={setUserState} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
}

