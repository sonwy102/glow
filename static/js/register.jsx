const Register = () => {
  //Issue 1: passwords do not match even when they are identical -> check state
  //Issue 2: How to split up signup form into 2 separate pages?
  //Issue 3: How to show error message in UI
  
  const history = useHistory();
  const [registerState, setRegisterState] = React.useState({
    email: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    birthday: "",
  });

  const handleInputChange = (evt) => {
    evt.preventDefault();
    const name = evt.target.name;
    const value = evt.target.value;
    setRegisterState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (registerState.password != registerState.passwordConfirm) {
      console.log("Passwords do not match."); //how to show this on the page?
      history.push("/register");
    } else {
      const formData = {
        email: registerState.email,
        password: registerState.password,
        passwordConfirm: registerState.passwordConfirm,
        firstName: registerState.firstName,
        lastName: registerState.lastName,
        birthday: registerState.birthday,
      };

      $.post("/handle-register.json", formData, (res) => {
        if (res == "OK") {
          console.log(res);
          history.push("/"); //eventually want to redirect to profile page
        } else {
          console.log(res);
          history.push("/register");
        }
      });
    }
  };

  return (
    <div className="register-page">
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
            name="password-confirm"
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
            name="first-name"
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
            name="last-name"
            className="form-control input-lg"
            placeholder="Last Name"
            required
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="birthday-field" className="sr-only">
            Birthday
          </label>
          <select id="month" name="month">
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <select id="day" name="day">
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
          </select>
          <select id="year" name="year">
            <option value="1980">1980</option>
            <option value="1981">1981</option>
            <option value="1982">1982</option>
            <option value="1983">1983</option>
            <option value="1984">1984</option>
            <option value="1985">1985</option>
            <option value="1986">1986</option>
            <option value="1987">1987</option>
            <option value="1988">1988</option>
            <option value="1989">1989</option>
            <option value="1990">1990</option>
            <option value="1991">1991</option>
            <option value="1992">1992</option>
            <option value="1993">1993</option>
            <option value="1994">1994</option>
            <option value="1995">1995</option>
            <option value="1996">1996</option>
            <option value="1997">1997</option>
            <option value="1998">1998</option>
            <option value="1999">1999</option>
            <option value="2000">2000</option>
            <option value="2001">2001</option>
            <option value="2002">2002</option>
            <option value="2003">2003</option>
            <option value="2004">2004</option>
            <option value="2005">2005</option>
            <option value="2006">2006</option>
            <option value="2007">2007</option>
          </select>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}