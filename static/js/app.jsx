"use strict";


function App() {
    const [userState, setUserState] = React.useState(null)
    console.log(userState);

    React.useEffect(() => {
      const sess_id = localStorage.getItem("userState");
      if (sess_id) {
        setUserState(sess_id)
      };
    }, []);

    return (
      <Router>
        <div className="App">
          <h2 className="App-title">Glow Homepage</h2>
          <Link to="/">Home</Link>
          <Link to="/login">Log In</Link> 
          {/* TODO: how to dynamically change this link so it's Log In when user's 
          logged out, and Log Out when user's logged in*/}
          <Link to="/register">Sign Up</Link>
        </div>

        <div className="product-search-engine">
          <ProductSearch />
        </div>

        <div>
          <Switch>
            <Route path="/login">
              <Login ensureLogIn={setUserState} />
            </Route>
            <Route path="/register">
              <Register ensureLogIn={setUserState} />
            </Route>
            <Route path="/profile">
              <Profile isLoggedIn={userState} />
            </Route>
            <Route path="/productsearch">
              <SearchResults />
            </Route>
          </Switch>
        </div>
      </Router>
    );
}

