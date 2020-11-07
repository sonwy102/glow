"use strict";
const Route = window.ReactRouterDOM.Route
const Switch = window.ReactRouterDOM.Switch
const Link = window.ReactRouterDOM.Link
const Router = window.ReactRouterDOM.BrowserRouter;

function App() {
    
    return (
  
    <Router>
      <div className="App">
        <h2 className="App-title">Glow Homepage</h2>
        <Link to="/login">Log In</Link>
      </div>
      <div>
        <Switch>
          <Route path="/login">
              <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

