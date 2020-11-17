"use strict";
// // ! Issue 1: <EditProfile> gets uncaught reference error even though I set up all the routing ??

function App() {
    const [userState, setUserState] = React.useState(() => {return localStorage.getItem('userState')})
    console.log(userState);
  
    // React.useEffect(() => {
    //   const sess_id = localStorage.getItem("userState");
    //   console.log('app just loaded. session id: ', sess_id)
    //   if (sess_id) {
    //     setUserState(sess_id)
    //   };
    // }, []);

    

    return (
      <Router>
        <div className="App">
          <h2 className="App-title">Glow Homepage</h2>
          <Link to="/">Home</Link>
          {userState ? (
            <div className="header">
              <Link to={`/profile?user=${userState}`}>Profile</Link>
              <LogOutBtn ensureLogIn={setUserState}></LogOutBtn>
            </div>
          ) : (
            <div className="header">
              <Link to="/register">Sign Up</Link>
              <LogInBtn ensureLogIn={setUserState}></LogInBtn>
            </div>
          )}
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
            <Route path="/routine">
              <Routine isLoggedIn={userState} />
            </Route>
            <Route path="/details">
              <ProductDetails />
            </Route>
            <Route path="/editprofile">
              <EditProfile isLoggedIn={userState} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
}

