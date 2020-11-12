
const Login = (props) => {

    //consideration1: include 'status' key in state that's more explicit and indicative
    //of what's happening (successful, loading, etc.)
    //issue 1: props.ensureLogin not working? userState is not updating for some reason
    
    const [loginState, setLoginState] = React.useState({email: '', password: '', msg:''})
    const history = useHistory();

    const handleInputChange = (evt) => {
      const name = evt.target.name;
      const value = evt.target.value;
      setLoginState((prevState) => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        const formData = {email: loginState.email, 
                          password: loginState.password}

        $.post('/handle-login.json', formData, (res) => {
            if (res.status_code === 200) {
                console.log(res);
                localStorage.setItem('userState', res.session_id);
                history.push("/profile") //eventually want to redirect to dashboard page
                props.ensureLogIn(res.session_id);
                
                
            }
            else {
              setLoginState((prevState) => ({ ...prevState, msg: res.msg}));
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

          <button className="btn btn-lg btn-primary btn-block" type="submit">Log In
          </button>
        </form>
        <div className="signup-link">
          <span>Don't have an account?</span>
          <span className="btn signup-btn" onClick={redirectToRegister}>Sign Up</span>
        </div>
      </div>
    )
}