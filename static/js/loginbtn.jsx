const LogInBtn = (props) => {
  const history = useHistory();

  const redirectToLogIn = () => {
    history.push("/login");
  };

  return (
    <button className="btn btn-primary" onClick={redirectToLogIn}>
      Sign In
    </button>
  );
};
