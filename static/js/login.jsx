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
    <Container className="login page">
      {loginState.msg ? (
        <Row>
          <Col>
            <Alert variant="danger">{loginState.msg}</Alert>
          </Col>
        </Row>
      ) : null}

      <Row className="justify-center">
        <Col lg={6} className="formbox extra-margin">
          <form onSubmit={handleSubmit} className="form-signin">
            <div className="subheader-lg subsection">Sign In</div>

            <div className="login subsection">
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

              <Button variant="flat-important" type="submit">
                Sign In
              </Button>

              <div className="signup">
                <span>Don't have an account?</span>
                <Button variant="link" onClick={redirectToRegister}>
                  Sign Up
                </Button>
              </div>
            </div>
          </form>
        </Col>
      </Row>

      {/* <Row>
          <Col className="signup-link">Sign Up</Button>
        </Col>
      </Row> */}
    </Container>
  );
};
