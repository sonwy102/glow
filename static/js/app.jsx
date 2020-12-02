"use strict";
// // ! Issue 1: <EditProfile> gets uncaught reference error even though I set up all the routing ??

function App() {
    
    const [userState, setUserState] = React.useState(() => {return localStorage.getItem('userState')})

    const [searchState, setSearchState] = React.useState({
      "search-category": "",
      "product-search": null,
    });

    const [userDetails, setUserDetails] = React.useState({
      name: "",
      email: "",
      photo: "",
      skinTypes: [],
      goals: [],
    });
    

    return (
      <Router>
        <div className="App">
          {/* <h2 className="App-title">Glow Homepage</h2>
          <Link to="/">Home</Link>
          {userState ? (
            <div className="header">
              <Link to={`/profile?user=${userState}`}>Profile</Link>
              <Link to={`/dashboard?user=${userState}`}>Dashboard</Link>
              <LogOutBtn ensureLogIn={setUserState}></LogOutBtn>
            </div>
          ) : (
            <div className="header">
              <Link to="/register">Sign Up</Link>
              <LogInBtn ensureLogIn={setUserState}></LogInBtn>
            </div>
          )} */}
          <NavBar isLoggedIn={userState} ensureLogIn={setUserState}/>
        </div>

        <div className="product-search-engine">
          <ProductSearch
            category={searchState["search-category"]}
            searchTerms={searchState["product-search"]}
            setSearchParams={setSearchState}
          />
        </div>

        <div>
          <Switch>
            <Route path="/ratingschart">
              <RatingsChart isLoggedIn={userState} />
            </Route>
            <Route path="/login">
              <Login ensureLogIn={setUserState} />
            </Route>
            <Route path="/register">
              <Register ensureLogIn={setUserState} />
            </Route>
            <Route path="/profile">
              <Profile
                isLoggedIn={userState}
                setUserInfo={setUserDetails}
                userInfo={userDetails}
              />
            </Route>
            <Route path="/details" component={ProductDetails}></Route>
            <Route path="/productsearch">
              <SearchResults
                category={searchState["search-category"]}
                searchTerms={searchState["product-search"]}
              />
            </Route>
            <Route path="/routine">
              <Routine isLoggedIn={userState} />
            </Route>

            <Route path="/editprofile">
              <EditProfile
                isLoggedIn={userState}
                userInfo={userDetails}
                setUserInfo={setUserDetails}
              />
            </Route>
            <Route path="/dashboard">
              <Dashboard
                isLoggedIn={userState}
                userInfo={userDetails}
                setUserInfo={setUserDetails}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
}

