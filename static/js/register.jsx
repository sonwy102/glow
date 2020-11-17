const Register = (props) => {
  // TODO: split up signup form into 2 separate pages
  // TODO: how to show an alert of success msg after user redirecting to login 

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

  // TODO: this is redundant to redirectToProfile in login.jsx. how to prevent?
  // const redirectToProfile = (sess_id) => {
  //   history.push(`/profile?user=${sess_id}`);
  // };

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
    <div className="register-page">
      <div className="alert-msg">{registerState.statusMsg}</div>
      <form onSubmit={handleSubmit} className="form-register">
        <h2 className="form-register-heading">Sign Up</h2>

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

        <div className="form-group">
          <label htmlFor="password-confirm-field" className="sr-only">
            Confirm Password
          </label>
          <input
            type="password"
            name="passwordConfirm"
            className="form-control input-lg"
            placeholder="Confirm Password"
            required
            onChange={handleInputChange}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="first-name-field" className="sr-only">
            First Name
          </label>
          <input
            type="first-name"
            name="firstName"
            className="form-control input-lg"
            placeholder="First Name"
            required
            onChange={handleInputChange}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="last-name-field" className="sr-only">
            Last Name
          </label>
          <input
            type="last-name"
            name="lastName"
            className="form-control input-lg"
            placeholder="Last Name"
            required
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="birthday-field">Your Birthday:</label>
          <input
            type="date"
            name="birthday"
            min="1940-01-01"
            required
            onChange={handleInputChange}
          ></input>
        </div>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
}