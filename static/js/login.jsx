
const Login = (props) => {

    //Issue 1: how to save logged in data to session (or React-equivalent of session)?
    //Issue 2: how to show error messages in UI (i.e. flash msg)
    //Issue 3: should user validation logic happen in server.py or here (front-end)??
    
    const [loginState, setLoginState] = React.useState({email: '', password: '', msg:''})
    const history = useHistory();

    const handleInputChange = (evt) => {
      const name = evt.target.name;
      const value = evt.target.value;
      setLoginState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();

        const formData = {email: loginState.email, 
                          password: loginState.password}

        $.get('/handle-login.json', formData, (res) => {
            if (res == 'OK') {
                console.log(res);
                history.push("/") //eventually want to redirect to dashboard page
            }
            else {
              setLoginState((prevState) => ({ ...prevState, msg: res}));
            }
        })
    }

    const redirectToRegister = (evt) => {
      evt.preventDefault();
      history.push("/register");
    }

    return (
      <div className="login-page">
        <div className="alert-msg">
          {loginState.msg}
        </div>
        <form onSubmit={handleSubmit} className="form-signin">

          <h2 className="form-signin-heading">Log In</h2>

          <div className="form-group">
            <label htmlFor="email-field" className="sr-only">Email Address</label>
            <input type="email"
                  name="email"
                  className="form-control input-lg"
                  placeholder="Email Address"
                  required
                  autoFocus
                  onChange={handleInputChange}></input>
          </div>

          <div className="form-group">
            <label htmlFor="password-field" className="sr-only">Password</label>
            <input type="password"
                  name="password"
                  className="form-control input-lg"
                  placeholder="Password"
                  required
                  onChange={handleInputChange}></input>
          </div>

          <button className="btn btn-lg btn-primary btn-block" type="Sign In">Log In
          </button>
        </form>
        <div className="signup-link">
          <span>Don't have an account?</span>
          <span className="btn signup-btn" onClick={redirectToRegister}>Sign Up</span>
        </div>
      </div>
    )
}