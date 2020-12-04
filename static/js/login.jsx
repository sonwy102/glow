const Login = (props) => {
  //consideration1: include 'status' key in state that's more explicit and indicative
  //of what's happening (successful, loading, etc.)
  // //issue 1: props.ensureLogin not working? userState is not updating for some reason

  const [loginState, setLoginState] = React.useState({
    email: "",
    password: "",
    msg: "",
  });
  const history = useHistory();

  console.log('loginState:', loginState)

  const redirectToDashboard = (sess_id) => {
    history.push(`/dashboard?user=${sess_id}`);
  };

  const handleInputChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setLoginState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetchUserLogin();
  };

  const fetchUserLogin = async () => {
    fetch("/handle-login.json", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ email: loginState.email, password: loginState.password })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.status_code);
      if (data.status_code == 200) {
        
        localStorage.setItem("userState", data.session_id);
        props.ensureLogIn(data.session_id);
        redirectToDashboard(data.session_id);
      } else {
        setLoginState((prevState) => ({ ...prevState, msg: data.msg }))
      }});
    };

  const redirectToRegister = (evt) => {
    evt.preventDefault();
    history.push("/register");
  };

  return (
    <div className="login-page">
      <div className="alert-msg">{loginState.msg}</div>
      <form onSubmit={handleSubmit} className="form-signin">
        <h2 className="form-signin-heading">Log In</h2>

        <div className="form-group">
          <label htmlFor="email-field" className="sr-only">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            className="form-control input-lg"
            placeholder="Email Address"
            required
            autoFocus
            onChange={handleInputChange}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="password-field" className="sr-only">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control input-lg"
            placeholder="Password"
            required
            onChange={handleInputChange}
          ></input>
        </div>

        <Button variant="primary" type="submit">
          Log In
        </Button>
      </form>
      <div className="signup-link">
        <span>Don't have an account?</span>
        <Button variant="outline-primary" onClick={redirectToRegister}>
          Sign Up
        </Button>
      </div>
    </div>
  );
};
