const Login = () => {

    const [loginValue, setLoginValue] = React.useState({email: '', password: ''})

    const handleLogin = (evt) => {
        evt.preventDefault();
        // const email = loginValue.email; -> not sure why this comes back undefined?
        // const pw = loginValue.password;

        // using jQuery for now instead
        const formData = {email: $('input[name="email"]').val(), 
                          password: $('input[name="password"]').val()}
    
        $.get('/handle-login.json', formData, (res) => {
            if (res == 'OK') {
                console.log(res);
                // not sure what to do from here
            }
        })

    }

    const handleInputChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        const userLogin = {[name]: value};
        console.log(userLogin)
        setLoginValue(userLogin);
    }
    
    return (
      <form onSubmit={handleLogin} className="form-signin">

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
    )
}