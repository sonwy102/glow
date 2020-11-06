const Login = () => {
    return (
      <form class="form-signin">

        <h2 class="form-signin-heading">Log In</h2>

        <div class="form-group">
          <label for="email-field" class="sr-only">Email Address</label>
          <input type="email"
                name="email"
                class="form-control input-lg"
                placeholder="Email Address"
                required
                autofocus></input>
        </div>

        <div class="form-group">
          <label for="password-field" class="sr-only">Password</label>
          <input type="password"
                name="password"
                class="form-control input-lg"
                placeholder="Password"
                required></input>
        </div>

        <button class="btn btn-lg btn-primary btn-block" type="Sign In">Log In
        </button>
      </form>
    )
}