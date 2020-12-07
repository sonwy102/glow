const Register = (props) => {
  // // TODO: split up signup form into 2 separate pages
  // // TODO: how to show an alert of success msg after user redirecting to login 

  const history = useHistory();
  const [registerState, setRegisterState] = React.useState({
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    birthday: "",
    statusMsg: null,
  });


  const redirectToLogin = () => {
    history.push('/login')
  }

  const handleInputChange = (evt) => {
    evt.preventDefault();
    const name = evt.target.name;
    const value = evt.target.value;
    setRegisterState((prevState) => ({ ...prevState, [name]: value }));
  };

  const postNewUserLogin = async () => {
    fetch("/handle-register.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerState),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.status_code === 200) {
        setRegisterState((prevState) => ({...prevState, statusMsg: data.msg}));
        redirectToLogin();
      } else {
        setRegisterState((prevState) => ({...prevState, statusMsg: data.msg}));
        history.push('/register');
      }
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(registerState);
    if (registerState.password !== registerState.passwordConfirm) {
      console.log("Passwords do not match."); //how to show this on the page?
      history.push("/register");
    } else {
      postNewUserLogin();
    }
  };

  return (
    <Container className="register page">
      {registerState.statusMsg ? (
        <Row>
          <Col>
            <Alert variant="danger">{registerState.statusMsg}</Alert>
          </Col>
        </Row>
      ) : null}

      <Row className="justify-center">
        <Col lg={6} className="formbox extra-margin section">
          <form onSubmit={handleSubmit} className="form-register">
            <div className="subheader-lg subsection">Sign Up</div>

            <div className="register subsection">
              <div className="form-group">
                <div className="label">EMAIL</div>
                <input
                  type="email"
                  name="email"
                  className="form-control input-lg"
                  required
                  autoFocus
                  onChange={handleInputChange}
                ></input>
              </div>

              <div className="form-group">
                <div className="label">PASSWORD</div>
                <input
                  type="password"
                  name="password"
                  className="form-control input-lg"
                  required
                  onChange={handleInputChange}
                ></input>
              </div>

              <div className="form-group">
                <div className="label">CONFIRM PASSWORD</div>
                <input
                  type="password"
                  name="passwordConfirm"
                  className="form-control input-lg"
                  required
                  onChange={handleInputChange}
                ></input>
              </div>

              <div className="form-group">
                <div className="label">FIRST NAME</div>
                <input
                  type="first-name"
                  name="firstName"
                  className="form-control input-lg"
                  required
                  onChange={handleInputChange}
                ></input>
              </div>

              <div className="form-group">
                <div className="label">LAST NAME</div>
                <input
                  type="last-name"
                  name="lastName"
                  className="form-control input-lg"
                  required
                  onChange={handleInputChange}
                ></input>
              </div>
              <div className="form-group">
                <div className="label">BIRTHDAY</div>
                <input
                  type="date"
                  name="birthday"
                  min="1940-01-01"
                  required
                  onChange={handleInputChange}
                ></input>
              </div>

              <div className="subsection-vertical">
                <Button variant="flat-important" type="submit">
                  Sign Up
                </Button>

                <div className="signup">
                  <span>Already have an account?</span>
                  <Button variant="link" onClick={redirectToLogin}>
                    Sign In
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
}