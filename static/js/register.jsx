const Register = (props) => {

  //Issue 2: How to split up signup form into 2 separate pages?
  
  const history = useHistory();
  const [registerState, setRegisterState] = React.useState({
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    birthday: "",
    statusMsg: null
  });

  const handleInputChange = (evt) => {
    evt.preventDefault();
    const name = evt.target.name;
    const value = evt.target.value;
    setRegisterState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    console.log(registerState)
    if (registerState.password !== registerState.passwordConfirm) {
      console.log("Passwords do not match."); //how to show this on the page?
      history.push("/register");
    } else {
      const formData = {
        email: registerState.email,
        password: registerState.password,
        passwordConfirm: registerState.passwordConfirm,
        firstName: registerState.firstName,
        lastName: registerState.lastName,
        birthday: registerState.birthday
      };

      $.post("/handle-register.json", formData, (res) => {
        if (res.status_code === 200) {
          setRegisterState((prevState) => ({ ...prevState, statusMsg: res.msg }));
          localStorage.setItem("userState", res.session_id);
          history.push("/profile");
          props.ensureLogIn(res.session_id);
        } else {
          console.log(res);
          setRegisterState((prevState) => ({ ...prevState, statusMsg: res.msg}));
          history.push("/register");
        }
      });
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
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}