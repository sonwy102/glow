"use strict";


function App() {
    
    return (
  
    <Router>
      <div className="App">
        <h2 className="App-title">Glow Homepage</h2>
        <Link to="/login">Log In</Link>
        <Link to="/register">Sign Up</Link>
      </div>
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

